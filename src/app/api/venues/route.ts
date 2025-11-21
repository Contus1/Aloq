import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/venues
// Get all active venues
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // Optional filter by type

    let query = supabase
      .from('venues')
      .select('*')
      .eq('active', true)
      .order('name', { ascending: true });

    if (type) {
      query = query.eq('type', type);
    }

    const { data: venues, error } = await query;

    if (error) {
      console.error('Fetch venues error:', error);
      return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 });
    }

    return NextResponse.json({ venues: venues || [] });
  } catch (error: any) {
    console.error('Venues API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
