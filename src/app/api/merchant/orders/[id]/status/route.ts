import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/merchant/orders/[id]/status
// Update order status (e.g., preparing → ready)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['preparing', 'ready', 'picked_up', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // TODO: Add auth check - verify user has access to this order's venue

    // Build update object
    const updates: { status: string; ready_at?: string; picked_up_at?: string } = { status };
    
    // Add timestamp fields based on status
    if (status === 'ready') {
      updates.ready_at = new Date().toISOString();
    } else if (status === 'picked_up') {
      updates.picked_up_at = new Date().toISOString();
    }

    // Update order
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update order status error:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }

    // TODO: Send notification to customer (e.g., "Your order is ready!")

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error('Update status error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
