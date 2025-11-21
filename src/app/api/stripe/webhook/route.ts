import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

// Disable body parsing - Stripe needs raw body for signature verification
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentCanceled(paymentIntent);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// Handle successful payment
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.order_id;

  if (!orderId) {
    console.error('No order_id in payment intent metadata');
    return;
  }

  console.log(`Payment succeeded for order ${orderId}`);

  // Update order status to 'paid'
  const { error } = await supabaseAdmin
    .from('orders')
    .update({
      status: 'paid',
      payment_status: paymentIntent.status,
      paid_at: new Date().toISOString(),
    })
    .eq('id', orderId);

  if (error) {
    console.error('Failed to update order status:', error);
    return;
  }

  // TODO: Send confirmation email to customer
  // TODO: Notify merchant (email, push notification, etc.)

  console.log(`Order ${orderId} marked as paid`);
}

// Handle failed payment
async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.order_id;

  if (!orderId) {
    console.error('No order_id in payment intent metadata');
    return;
  }

  console.log(`Payment failed for order ${orderId}`);

  // Update order with failed status
  await supabaseAdmin
    .from('orders')
    .update({
      payment_status: paymentIntent.status,
    })
    .eq('id', orderId);

  // Don't change order status to cancelled yet - user might retry
  // TODO: After X failed attempts, could auto-cancel
}

// Handle canceled payment
async function handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.order_id;

  if (!orderId) {
    console.error('No order_id in payment intent metadata');
    return;
  }

  console.log(`Payment canceled for order ${orderId}`);

  // Update order to cancelled
  await supabaseAdmin
    .from('orders')
    .update({
      status: 'cancelled',
      payment_status: paymentIntent.status,
    })
    .eq('id', orderId);
}
