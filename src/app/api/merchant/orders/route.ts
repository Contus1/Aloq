import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/merchant/orders?venue_id=xxx&date=today
// Get orders for a merchant's venue
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const venueId = searchParams.get('venue_id');
    const date = searchParams.get('date'); // 'today' or 'YYYY-MM-DD'

    if (!venueId) {
      return NextResponse.json({ error: 'venue_id required' }, { status: 400 });
    }

    // TODO: Add auth check - verify user has access to this venue
    // For MVP, we skip auth and trust the venue_id parameter

    // Build date filter
    let dateFilter = {};
    if (date === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      dateFilter = {
        pickup_at: {
          gte: today.toISOString(),
          lt: tomorrow.toISOString(),
        },
      };
    }

    // Fetch orders
    let query = supabaseAdmin
      .from('orders')
      .select(
        `
        *,
        order_items (
          *,
          items (
            name,
            description
          )
        )
      `
      )
      .eq('venue_id', venueId)
      .in('status', ['paid', 'preparing', 'ready', 'picked_up']) // Exclude pending/cancelled
      .order('pickup_at', { ascending: true });

    // Apply date filter if provided
    if (date === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query = query.gte('pickup_at', today.toISOString());
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Fetch merchant orders error:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return NextResponse.json({ orders: orders || [] });
  } catch (error: any) {
    console.error('Merchant orders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
