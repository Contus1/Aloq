import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/search?q=cappuccino
// Simple search across venues and items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    const searchTerm = query.trim().toLowerCase();

    // Search venues by name
    const { data: venues, error: venuesError } = await supabase
      .from('venues')
      .select('id, name, type, description, address, city')
      .eq('active', true)
      .ilike('name', `%${searchTerm}%`);

    if (venuesError) {
      console.error('Venues search error:', venuesError);
    }

    // Search items by name
    const { data: items, error: itemsError } = await supabase
      .from('items')
      .select(
        `
        id,
        name,
        description,
        price_cents,
        category,
        venue_id,
        venues (
          id,
          name,
          type
        )
      `
      )
      .eq('active', true)
      .ilike('name', `%${searchTerm}%`);

    if (itemsError) {
      console.error('Items search error:', itemsError);
    }

    // Group items by venue
    const venueItemMap = new Map<string, any>();

    items?.forEach((item: any) => {
      const venueId = item.venue_id;
      if (!venueItemMap.has(venueId)) {
        venueItemMap.set(venueId, {
          venue: item.venues,
          items: [],
        });
      }
      venueItemMap.get(venueId).items.push({
        id: item.id,
        name: item.name,
        description: item.description,
        price_cents: item.price_cents,
        category: item.category,
      });
    });

    // Combine results
    const results = {
      venues: venues || [],
      items_by_venue: Array.from(venueItemMap.values()),
      total_venues: (venues?.length || 0),
      total_items: (items?.length || 0),
    };

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
