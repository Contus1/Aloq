// Database types generated from Supabase schema
// This would normally be auto-generated via: npx supabase gen types typescript --local > src/types/database.ts
// For now, we'll define the essential types manually

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      venues: {
        Row: {
          id: string;
          name: string;
          type: 'cafe' | 'bakery' | 'lunch' | 'service' | 'other';
          description: string | null;
          address: string | null;
          city: string | null;
          zip_code: string | null;
          open_hours: string | null;
          pickup_slot_minutes: number;
          phone: string | null;
          email: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['venues']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['venues']['Insert']>;
      };
      items: {
        Row: {
          id: string;
          venue_id: string;
          name: string;
          description: string | null;
          price_cents: number;
          currency: string;
          category: string | null;
          tags: string[] | null;
          active: boolean;
          stock_available: boolean;
          image_url: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['items']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['items']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          venue_id: string;
          status:
            | 'pending'
            | 'requires_payment'
            | 'paid'
            | 'preparing'
            | 'ready'
            | 'picked_up'
            | 'cancelled';
          total_cents: number;
          currency: string;
          pickup_at: string;
          pickup_code: string;
          contact_name: string;
          contact_email: string;
          contact_phone: string | null;
          payment_intent_id: string | null;
          payment_status: string | null;
          customer_notes: string | null;
          merchant_notes: string | null;
          created_at: string;
          updated_at: string;
          paid_at: string | null;
          ready_at: string | null;
          picked_up_at: string | null;
        };
        Insert: Omit<
          Database['public']['Tables']['orders']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & {
          id?: string;
        };
        Update: {
          venue_id?: string;
          status?:
            | 'pending'
            | 'requires_payment'
            | 'paid'
            | 'preparing'
            | 'ready'
            | 'picked_up'
            | 'cancelled';
          total_cents?: number;
          currency?: string;
          pickup_at?: string;
          pickup_code?: string;
          contact_name?: string;
          contact_email?: string;
          contact_phone?: string | null;
          payment_intent_id?: string | null;
          payment_status?: string | null;
          customer_notes?: string | null;
          merchant_notes?: string | null;
          paid_at?: string | null;
          ready_at?: string | null;
          picked_up_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          item_id: string;
          item_name: string;
          item_description: string | null;
          unit_price_cents: number;
          quantity: number;
          selected_options: Json | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id' | 'created_at'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
      };
      merchant_staff: {
        Row: {
          id: string;
          user_id: string;
          venue_id: string;
          role: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['merchant_staff']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['merchant_staff']['Insert']>;
      };
      item_options: {
        Row: {
          id: string;
          item_id: string;
          group_name: string;
          option_name: string;
          price_delta_cents: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['item_options']['Row'], 'id' | 'created_at'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['item_options']['Insert']>;
      };
    };
    Views: {};
    Functions: {
      generate_pickup_code: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: {
      venue_type: 'cafe' | 'bakery' | 'lunch' | 'service' | 'other';
      order_status:
        | 'pending'
        | 'requires_payment'
        | 'paid'
        | 'preparing'
        | 'ready'
        | 'picked_up'
        | 'cancelled';
    };
  };
}

// Convenience types
export type Venue = Database['public']['Tables']['venues']['Row'];
export type Item = Database['public']['Tables']['items']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type MerchantStaff = Database['public']['Tables']['merchant_staff']['Row'];
export type ItemOption = Database['public']['Tables']['item_options']['Row'];

// Extended types with relations
export type VenueWithItems = Venue & {
  items: Item[];
};

export type OrderWithItems = Order & {
  order_items: (OrderItem & {
    items: Item;
  })[];
  venues: Venue;
};
