import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';

// POST /api/orders/prepare
// Prepare order: calculate total, create order in DB, create Stripe Payment Intent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { venue_id, items, pickup_offset_minutes, contact_name, contact_email, contact_phone } =
      body;

    // Validation
    if (!venue_id || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!contact_name || !contact_email) {
      return NextResponse.json(
        { error: 'Customer name and email are required' },
        { status: 400 }
      );
    }

    // Fetch items from database to get current prices
    const itemIds = items.map((item: any) => item.item_id);
    const { data: dbItems, error: itemsError } = await supabaseAdmin
      .from('items')
      .select('id, name, description, price_cents, venue_id')
      .in('id', itemIds);

    if (itemsError || !dbItems) {
      return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }

    // Calculate total
    let totalCents = 0;
    const orderItems = items.map((item: any) => {
      const dbItem = dbItems.find((i) => i.id === item.item_id);
      if (!dbItem) {
        throw new Error(`Item ${item.item_id} not found`);
      }
      if (dbItem.venue_id !== venue_id) {
        throw new Error('Items must belong to the same venue');
      }

      const quantity = item.quantity || 1;
      const itemTotal = dbItem.price_cents * quantity;
      totalCents += itemTotal;

      return {
        item_id: dbItem.id,
        item_name: dbItem.name,
        item_description: dbItem.description,
        unit_price_cents: dbItem.price_cents,
        quantity,
        notes: item.notes || null,
      };
    });

    // Calculate pickup time
    const offsetMinutes = pickup_offset_minutes || 20; // Default 20 min
    const pickupAt = new Date(Date.now() + offsetMinutes * 60 * 1000);

    // Generate pickup code
    const { data: codeData } = await supabaseAdmin.rpc('generate_pickup_code');
    const pickupCode = codeData || Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    // Create order in database
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        venue_id,
        status: 'requires_payment',
        total_cents: totalCents,
        currency: 'EUR',
        pickup_at: pickupAt.toISOString(),
        pickup_code: pickupCode,
        contact_name,
        contact_email,
        contact_phone: contact_phone || null,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Order creation error:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Create order items
    const orderItemsWithOrderId = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    const { error: itemsInsertError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItemsWithOrderId);

    if (itemsInsertError) {
      console.error('Order items error:', itemsInsertError);
      // Rollback order if items fail
      await supabaseAdmin.from('orders').delete().eq('id', order.id);
      return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'eur',
      metadata: {
        order_id: order.id,
        venue_id,
        pickup_code: pickupCode,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Update order with payment intent ID
    await supabaseAdmin
      .from('orders')
      .update({
        payment_intent_id: paymentIntent.id,
        payment_status: paymentIntent.status,
      })
      .eq('id', order.id);

    // Return order info + client secret for Stripe
    return NextResponse.json({
      order_id: order.id,
      client_secret: paymentIntent.client_secret,
      total_cents: totalCents,
      pickup_at: pickupAt.toISOString(),
      pickup_code: pickupCode,
    });
  } catch (error: any) {
    console.error('Order preparation error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// GET /api/orders?email=xxx
// Get orders for a customer by email (guest checkout)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Fetch orders for this email
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select(
        `
        *,
        venues (
          id,
          name,
          type
        ),
        order_items (
          *,
          items (
            name,
            description
          )
        )
      `
      )
      .eq('contact_email', email)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Fetch orders error:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return NextResponse.json({ orders: orders || [] });
  } catch (error: any) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
