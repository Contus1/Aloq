-- Aloq Demo Data (Seed)
-- This creates 3 demo venues with menu items for the MVP

-- ============================================================================
-- DEMO VENUES
-- ============================================================================

-- 1. Café Aurora (Coffee & Breakfast)
INSERT INTO venues (id, name, type, description, address, city, zip_code, open_hours, pickup_slot_minutes, phone, email, active)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Café Aurora',
  'cafe',
  'Specialty coffee & fresh breakfast. Perfect for your morning routine.',
  'Hauptstraße 42',
  'Berlin',
  '10115',
  'Mo-Fr: 07:00–18:00, Sa-So: 08:00–17:00',
  15,
  '+49 30 12345678',
  'hello@cafe-aurora.de',
  true
);

-- 2. Backhaus Schmidt (Bakery)
INSERT INTO venues (id, name, type, description, address, city, zip_code, open_hours, pickup_slot_minutes, phone, email, active)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'Backhaus Schmidt',
  'bakery',
  'Traditional bakery with fresh bread, rolls, and pastries daily.',
  'Bäckerstraße 7',
  'Berlin',
  '10117',
  'Mo-Sa: 06:00–19:00, So: 07:00–14:00',
  10,
  '+49 30 23456789',
  'info@backhaus-schmidt.de',
  true
);

-- 3. Green Bowl (Healthy Lunch)
INSERT INTO venues (id, name, type, description, address, city, zip_code, open_hours, pickup_slot_minutes, phone, email, active)
VALUES (
  '00000000-0000-0000-0000-000000000003',
  'Green Bowl',
  'lunch',
  'Fresh bowls, salads, and healthy lunch options. Quick pickup.',
  'Gesundstraße 15',
  'Berlin',
  '10178',
  'Mo-Fr: 11:00–16:00',
  20,
  '+49 30 34567890',
  'order@greenbowl.de',
  true
);

-- ============================================================================
-- CAFÉ AURORA - MENU ITEMS
-- ============================================================================

-- Drinks
INSERT INTO items (venue_id, name, description, price_cents, category, tags, active) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Espresso', 'Classic Italian espresso, strong and aromatic', 250, 'drinks', ARRAY['coffee'], true),
  ('00000000-0000-0000-0000-000000000001', 'Cappuccino', 'Espresso with steamed milk and foam', 380, 'drinks', ARRAY['coffee'], true),
  ('00000000-0000-0000-0000-000000000001', 'Flat White', 'Double espresso with silky microfoam', 420, 'drinks', ARRAY['coffee'], true),
  ('00000000-0000-0000-0000-000000000001', 'Latte Macchiato', 'Layered espresso with lots of steamed milk', 450, 'drinks', ARRAY['coffee'], true),
  ('00000000-0000-0000-0000-000000000001', 'Filter Coffee', 'Freshly brewed filter coffee of the day', 320, 'drinks', ARRAY['coffee'], true),
  ('00000000-0000-0000-0000-000000000001', 'Matcha Latte', 'Japanese matcha with oat milk', 480, 'drinks', ARRAY['tea', 'vegan'], true),
  ('00000000-0000-0000-0000-000000000001', 'Fresh Orange Juice', 'Freshly squeezed, 100% orange', 450, 'drinks', ARRAY['fresh', 'vegan'], true);

-- Food
INSERT INTO items (venue_id, name, description, price_cents, category, tags, active) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Croissant', 'Buttery French croissant', 280, 'food', ARRAY['pastry'], true),
  ('00000000-0000-0000-0000-000000000001', 'Pain au Chocolat', 'Flaky pastry with dark chocolate', 320, 'food', ARRAY['pastry'], true),
  ('00000000-0000-0000-0000-000000000001', 'Avocado Toast', 'Sourdough with smashed avocado, lemon, chili', 680, 'food', ARRAY['breakfast', 'vegan'], true),
  ('00000000-0000-0000-0000-000000000001', 'Breakfast Bagel', 'Bagel with cream cheese, salmon, cucumber', 780, 'food', ARRAY['breakfast'], true),
  ('00000000-0000-0000-0000-000000000001', 'Porridge Bowl', 'Oats with berries, nuts, and honey', 590, 'food', ARRAY['breakfast', 'healthy'], true);

-- ============================================================================
-- BACKHAUS SCHMIDT - MENU ITEMS
-- ============================================================================

-- Bread
INSERT INTO items (venue_id, name, description, price_cents, category, tags, active) VALUES
  ('00000000-0000-0000-0000-000000000002', 'Bauernbrot', 'Traditional German farmer bread (1kg)', 480, 'bread', ARRAY['whole-grain'], true),
  ('00000000-0000-0000-0000-000000000002', 'Vollkornbrot', 'Wholegrain rye bread (750g)', 420, 'bread', ARRAY['whole-grain'], true),
  ('00000000-0000-0000-0000-000000000002', 'Weißbrot', 'Classic white bread (500g)', 320, 'bread', ARRAY[], true),
  ('00000000-0000-0000-0000-000000000002', 'Kürbiskernbrot', 'Bread with pumpkin seeds (800g)', 520, 'bread', ARRAY['seeds'], true);

-- Rolls
INSERT INTO items (venue_id, name, description, price_cents, category, tags, active) VALUES
  ('00000000-0000-0000-0000-000000000002', 'Brötchen (6 Stück)', 'Classic bread rolls, pack of 6', 280, 'rolls', ARRAY[], true),
  ('00000000-0000-0000-0000-000000000002', 'Körnerbrötchen (6 Stück)', 'Multi-seed rolls, pack of 6', 320, 'rolls', ARRAY['seeds', 'whole-grain'], true),
  ('00000000-0000-0000-0000-000000000002', 'Laugenbrötchen (4 Stück)', 'Pretzel rolls, pack of 4', 340, 'rolls', ARRAY[], true);

-- Pastries
INSERT INTO items (venue_id, name, description, price_cents, category, tags, active) VALUES
  ('00000000-0000-0000-0000-000000000002', 'Buttercroissant', 'Classic French croissant', 250, 'pastry', ARRAY[], true),
  ('00000000-0000-0000-0000-000000000002', 'Apfeltasche', 'Apple turnover with cinnamon', 290, 'pastry', ARRAY['fruit'], true),
  ('00000000-0000-0000-0000-000000000002', 'Nussschnecke', 'Nut swirl with honey glaze', 320, 'pastry', ARRAY['nuts'], true),
  ('00000000-0000-0000-0000-000000000002', 'Käsekuchen', 'Slice of German cheesecake', 380, 'cake', ARRAY[], true),
  ('00000000-0000-0000-0000-000000000002', 'Donauwelle', 'Slice of marble cake with cherries', 350, 'cake', ARRAY[], true);

-- ============================================================================
-- GREEN BOWL - MENU ITEMS
-- ============================================================================

-- Bowls
INSERT INTO items (venue_id, name, description, price_cents, category, tags, active) VALUES
  ('00000000-0000-0000-0000-000000000003', 'Buddha Bowl', 'Quinoa, roasted veggies, chickpeas, tahini sauce', 980, 'bowl', ARRAY['vegan', 'healthy'], true),
  ('00000000-0000-0000-0000-000000000003', 'Power Bowl', 'Brown rice, grilled chicken, avocado, edamame', 1150, 'bowl', ARRAY['protein', 'healthy'], true),
  ('00000000-0000-0000-0000-000000000003', 'Mediterranean Bowl', 'Couscous, feta, olives, cherry tomatoes, hummus', 920, 'bowl', ARRAY['vegetarian', 'healthy'], true),
  ('00000000-0000-0000-0000-000000000003', 'Poke Bowl', 'Sushi rice, salmon, edamame, seaweed, soy-ginger dressing', 1280, 'bowl', ARRAY['fish', 'healthy'], true);

-- Salads
INSERT INTO items (venue_id, name, description, price_cents, category, tags, active) VALUES
  ('00000000-0000-0000-0000-000000000003', 'Caesar Salad', 'Romaine, parmesan, croutons, caesar dressing', 850, 'salad', ARRAY['vegetarian'], true),
  ('00000000-0000-0000-0000-000000000003', 'Greek Salad', 'Tomatoes, cucumber, feta, olives, oregano', 780, 'salad', ARRAY['vegetarian'], true),
  ('00000000-0000-0000-0000-000000000003', 'Asian Noodle Salad', 'Glass noodles, crunchy veggies, sesame dressing', 890, 'salad', ARRAY['vegan'], true);

-- Extras
INSERT INTO items (venue_id, name, description, price_cents, category, tags, active) VALUES
  ('00000000-0000-0000-0000-000000000003', 'Extra Protein (Chicken)', 'Grilled chicken breast', 380, 'extra', ARRAY['protein'], true),
  ('00000000-0000-0000-0000-000000000003', 'Extra Protein (Tofu)', 'Marinated tofu', 320, 'extra', ARRAY['vegan', 'protein'], true),
  ('00000000-0000-0000-0000-000000000003', 'Fresh Smoothie', 'Berry smoothie (250ml)', 490, 'drinks', ARRAY['healthy', 'vegan'], true);

-- ============================================================================
-- DEMO MERCHANT STAFF (Optional - requires auth user first)
-- ============================================================================

-- Note: To create merchant_staff entries, you first need to create users
-- in Supabase Auth. For the MVP, you can do this manually through Supabase Dashboard:
-- 1. Go to Authentication > Users > Add User
-- 2. Create users with emails like: cafe-aurora@aloq.app, backhaus@aloq.app, greenbowl@aloq.app
-- 3. Then run INSERT statements like:
--
-- INSERT INTO merchant_staff (user_id, venue_id, role, active)
-- VALUES ('<user-uuid-from-auth>', '00000000-0000-0000-0000-000000000001', 'owner', true);

-- For now, this is commented out. You'll add these through the dashboard or via a seed script
-- that first creates auth users.
