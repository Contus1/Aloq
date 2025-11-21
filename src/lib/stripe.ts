import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

// Initialize Stripe with secret key (server-side only!)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
  typescript: true,
});

// Helper to format amount in cents to currency string
export function formatCurrency(amountCents: number, currency: string = 'EUR'): string {
  const amount = amountCents / 100;
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Helper to calculate total from order items
export function calculateOrderTotal(
  items: Array<{ unit_price_cents: number; quantity: number }>
): number {
  return items.reduce((total, item) => {
    return total + item.unit_price_cents * item.quantity;
  }, 0);
}
