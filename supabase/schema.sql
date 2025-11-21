-- Aloq Database Schema for Supabase
-- Version: MVP / Tech Demo
-- Date: November 2025

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy search later

-- ============================================================================
-- VENUES (Stores/Cafes/Bakeries)
-- ============================================================================

CREATE TYPE venue_type AS ENUM ('cafe', 'bakery', 'lunch', 'service', 'other');

CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type venue_type NOT NULL DEFAULT 'cafe',
  description TEXT,
  address TEXT,
  city VARCHAR(100),
  zip_code VARCHAR(20),
  
  -- Simplified opening hours (for MVP)
  open_hours TEXT DEFAULT '08:00–18:00',
  
  -- Pickup configuration
  pickup_slot_minutes INTEGER DEFAULT 15, -- e.g., 10, 15, 20 min intervals
  
  -- Contact
  phone VARCHAR(50),
  email VARCHAR(255),
  
  -- Status
  active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for searching venues
CREATE INDEX idx_venues_name ON venues USING gin (name gin_trgm_ops);
CREATE INDEX idx_venues_active ON venues(active) WHERE active = true;

-- ============================================================================
-- ITEMS (Menu items/products)
-- ============================================================================

CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  
  -- Basic info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Pricing (in cents to avoid float issues)
  price_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  
  -- Categorization
  category VARCHAR(100), -- e.g., 'drinks', 'food', 'breakfast'
  tags TEXT[], -- e.g., ['vegan', 'gluten-free']
  
  -- Availability
  active BOOLEAN DEFAULT true,
  stock_available BOOLEAN DEFAULT true,
  
  -- Display
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_items_venue ON items(venue_id);
CREATE INDEX idx_items_active ON items(active) WHERE active = true;
CREATE INDEX idx_items_name ON items USING gin (name gin_trgm_ops);

-- ============================================================================
-- ITEM OPTIONS (e.g., milk type, size) - Optional for MVP
-- ============================================================================

CREATE TABLE item_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  
  group_name VARCHAR(100) NOT NULL, -- e.g., 'Milk', 'Size'
  option_name VARCHAR(100) NOT NULL, -- e.g., 'Oat Milk', 'Large'
  
  -- Price modification (can be 0, positive, or negative)
  price_delta_cents INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_item_options_item ON item_options(item_id);

-- ============================================================================
-- ORDERS
-- ============================================================================

CREATE TYPE order_status AS ENUM (
  'pending',           -- Order created, awaiting payment
  'requires_payment',  -- Stripe payment intent created
  'paid',              -- Payment successful
  'preparing',         -- Merchant started preparing
  'ready',             -- Ready for pickup
  'picked_up',         -- Customer picked up
  'cancelled'          -- Order cancelled
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE RESTRICT,
  
  -- Status
  status order_status NOT NULL DEFAULT 'pending',
  
  -- Pricing
  total_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  
  -- Pickup
  pickup_at TIMESTAMP WITH TIME ZONE NOT NULL,
  pickup_code VARCHAR(10) NOT NULL, -- 6-digit code for pickup
  
  -- Customer info (guest checkout for MVP)
  contact_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  
  -- Payment (Stripe)
  payment_intent_id VARCHAR(255),
  payment_status VARCHAR(50),
  
  -- Notes
  customer_notes TEXT,
  merchant_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  ready_at TIMESTAMP WITH TIME ZONE,
  picked_up_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_orders_venue ON orders(venue_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_pickup_at ON orders(pickup_at);
CREATE INDEX idx_orders_pickup_code ON orders(pickup_code);
CREATE INDEX idx_orders_email ON orders(contact_email);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Unique pickup codes per venue per day (avoid conflicts)
CREATE UNIQUE INDEX idx_orders_unique_code ON orders(venue_id, pickup_code, DATE(pickup_at));

-- ============================================================================
-- ORDER ITEMS (Line items in an order)
-- ============================================================================

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES items(id) ON DELETE RESTRICT,
  
  -- Snapshot of item at time of order
  item_name VARCHAR(255) NOT NULL,
  item_description TEXT,
  
  -- Pricing
  unit_price_cents INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  
  -- Options selected (JSON for flexibility)
  selected_options JSONB,
  
  -- Special instructions
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_item ON order_items(item_id);

-- ============================================================================
-- MERCHANT STAFF (Users who manage venues)
-- ============================================================================

CREATE TABLE merchant_staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Links to Supabase Auth
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  
  -- Role (for future: owner, manager, staff)
  role VARCHAR(50) DEFAULT 'staff',
  
  -- Status
  active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one user can only have one role per venue
  UNIQUE(user_id, venue_id)
);

CREATE INDEX idx_merchant_staff_user ON merchant_staff(user_id);
CREATE INDEX idx_merchant_staff_venue ON merchant_staff(venue_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_merchant_staff_updated_at BEFORE UPDATE ON merchant_staff
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate 6-digit pickup code
CREATE OR REPLACE FUNCTION generate_pickup_code()
RETURNS VARCHAR(6) AS $$
DECLARE
  code VARCHAR(6);
BEGIN
  -- Generate random 6-digit number
  code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Important for Supabase!
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_options ENABLE ROW LEVEL SECURITY;

-- Public read access for venues and items (for customer app)
CREATE POLICY "Public venues are viewable by everyone"
  ON venues FOR SELECT
  USING (active = true);

CREATE POLICY "Public items are viewable by everyone"
  ON items FOR SELECT
  USING (active = true);

CREATE POLICY "Public item options are viewable by everyone"
  ON item_options FOR SELECT
  USING (true);

-- Orders: Customers can view their own orders (by email for guest checkout)
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (
    contact_email = current_setting('request.jwt.claims', true)::json->>'email'
    OR
    -- Allow merchants to see orders for their venues
    EXISTS (
      SELECT 1 FROM merchant_staff
      WHERE merchant_staff.venue_id = orders.venue_id
      AND merchant_staff.user_id = auth.uid()
      AND merchant_staff.active = true
    )
  );

-- Order items follow the same policy as orders
CREATE POLICY "Users can view their order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (
        orders.contact_email = current_setting('request.jwt.claims', true)::json->>'email'
        OR
        EXISTS (
          SELECT 1 FROM merchant_staff
          WHERE merchant_staff.venue_id = orders.venue_id
          AND merchant_staff.user_id = auth.uid()
          AND merchant_staff.active = true
        )
      )
    )
  );

-- Merchants can update orders for their venues
CREATE POLICY "Merchants can update their venue orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM merchant_staff
      WHERE merchant_staff.venue_id = orders.venue_id
      AND merchant_staff.user_id = auth.uid()
      AND merchant_staff.active = true
    )
  );

-- Merchant staff can view their own records
CREATE POLICY "Staff can view their own records"
  ON merchant_staff FOR SELECT
  USING (user_id = auth.uid());

-- ============================================================================
-- COMMENTS (Documentation)
-- ============================================================================

COMMENT ON TABLE venues IS 'Physical locations (cafes, bakeries, restaurants)';
COMMENT ON TABLE items IS 'Menu items/products available at venues';
COMMENT ON TABLE orders IS 'Customer orders for pickup';
COMMENT ON TABLE order_items IS 'Line items within orders';
COMMENT ON TABLE merchant_staff IS 'Users authorized to manage venues';
COMMENT ON COLUMN orders.pickup_code IS '6-digit code shown to customer for pickup verification';
COMMENT ON COLUMN orders.total_cents IS 'Total in cents to avoid floating point issues';
