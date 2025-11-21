import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/venues/[id]
// Get a single venue with its items
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch venue
    const { data: venue, error: venueError } = await supabase
      .from('venues')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single();

    if (venueError || !venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
    }

    // Fetch items for this venue
    const { data: items, error: itemsError } = await supabase
      .from('items')
      .select('*')
      .eq('venue_id', id)
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (itemsError) {
      console.error('Fetch items error:', itemsError);
      return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }

    // Group items by category
    const itemsByCategory = (items || []).reduce((acc: any, item: any) => {
      const category = item.category || 'other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    return NextResponse.json({
      venue,
      items: items || [],
      items_by_category: itemsByCategory,
    });
  } catch (error: any) {
    console.error('Venue detail error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
