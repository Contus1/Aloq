# Supabase Setup für Aloq MVP

## 🚀 Schnellstart

### 1. Supabase Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com)
2. Klicke auf "New Project"
3. Wähle einen Namen (z.B. "aloq-mvp")
4. Wähle eine Region (z.B. "Frankfurt" für EU)
5. Setze ein sicheres Datenbank-Passwort
6. Warte ~2 Minuten auf Projekt-Setup

### 2. Schema einrichten

1. Öffne dein Projekt in Supabase Dashboard
2. Gehe zu **SQL Editor**
3. Klicke auf **New Query**
4. Kopiere den Inhalt von `supabase/schema.sql`
5. Führe das SQL aus (Run)

**Was wird erstellt:**
- ✅ 6 Tabellen (venues, items, orders, order_items, merchant_staff, item_options)
- ✅ Enums für venue_type und order_status
- ✅ Indexes für Performance
- ✅ Row Level Security (RLS) Policies
- ✅ Trigger für updated_at
- ✅ Funktion für Pickup-Code-Generierung

### 3. Demo-Daten laden

1. Gehe wieder zu **SQL Editor**
2. **New Query**
3. Kopiere den Inhalt von `supabase/seed.sql`
4. Führe das SQL aus

**Was wird erstellt:**
- ✅ 3 Demo-Venues (Café Aurora, Backhaus Schmidt, Green Bowl)
- ✅ ~35 Menu Items (Drinks, Food, Bread, Bowls, etc.)

### 4. Environment Variables holen

Gehe zu **Project Settings** → **API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Kopiere diese in deine `.env.local` Datei.

---

## 📊 Datenbank-Schema

### venues
Stores/Cafés/Bäckereien

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primary Key |
| name | VARCHAR | Name des Ladens |
| type | ENUM | cafe, bakery, lunch, service, other |
| description | TEXT | Beschreibung |
| address | TEXT | Adresse |
| open_hours | TEXT | Öffnungszeiten (als Text) |
| pickup_slot_minutes | INT | Intervall für Abholzeiten (10, 15, 20 min) |
| active | BOOLEAN | Ist aktiv? |

### items
Menü-Artikel/Produkte

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primary Key |
| venue_id | UUID | Foreign Key → venues |
| name | VARCHAR | Produktname |
| description | TEXT | Beschreibung |
| price_cents | INT | Preis in Cent (z.B. 380 = €3.80) |
| category | VARCHAR | Kategorie (drinks, food, etc.) |
| tags | TEXT[] | Tags (vegan, gluten-free, etc.) |
| active | BOOLEAN | Verfügbar? |

### orders
Bestellungen

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primary Key |
| venue_id | UUID | Foreign Key → venues |
| status | ENUM | pending, paid, preparing, ready, picked_up, cancelled |
| total_cents | INT | Gesamt in Cent |
| pickup_at | TIMESTAMP | Abholzeit |
| pickup_code | VARCHAR(10) | 6-stelliger Code |
| contact_name | VARCHAR | Kundenname |
| contact_email | VARCHAR | Kunden-E-Mail |
| payment_intent_id | VARCHAR | Stripe Payment Intent ID |

### order_items
Bestellpositionen

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primary Key |
| order_id | UUID | Foreign Key → orders |
| item_id | UUID | Foreign Key → items |
| item_name | VARCHAR | Snapshot des Produktnamens |
| unit_price_cents | INT | Einzelpreis in Cent |
| quantity | INT | Anzahl |
| selected_options | JSONB | Gewählte Optionen (z.B. Hafermilch) |

### merchant_staff
Händler-Mitarbeiter

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primary Key |
| user_id | UUID | Foreign Key → auth.users |
| venue_id | UUID | Foreign Key → venues |
| role | VARCHAR | owner, manager, staff |
| active | BOOLEAN | Aktiv? |

---

## 🔐 Row Level Security (RLS)

**Wichtig:** RLS ist aktiviert für Sicherheit!

### Policies

**Venues & Items:**
- ✅ Public read für aktive Venues/Items
- ✅ Jeder kann sie sehen (für Consumer App)

**Orders:**
- ✅ Kunden können ihre eigenen Orders sehen (via contact_email)
- ✅ Merchants können Orders für ihre Venues sehen
- ✅ Merchants können Orders für ihre Venues updaten

**Merchant Staff:**
- ✅ User können nur ihre eigenen Records sehen

---

## 🧪 Testing

### Venues testen

```sql
SELECT id, name, type, active FROM venues WHERE active = true;
```

Sollte 3 Venues zurückgeben.

### Items testen

```sql
SELECT 
  i.name, 
  i.price_cents, 
  v.name as venue_name
FROM items i
JOIN venues v ON i.venue_id = v.id
WHERE i.active = true
ORDER BY v.name, i.category;
```

Sollte ~35 Items zurückgeben.

### Pickup-Code-Generator testen

```sql
SELECT generate_pickup_code();
```

Sollte einen 6-stelligen Code zurückgeben (z.B. "042851").

---

## 🔧 Merchant Users erstellen

Für die Merchant Console brauchst du Auth-User:

### Via Dashboard:

1. Gehe zu **Authentication** → **Users**
2. Klicke **Add User** → **Create new user**
3. Erstelle Users:
   - Email: `cafe-aurora@aloq.app`
   - Password: (ein sicheres Passwort)
   - Email Confirm: ✅ Ja (für Testing)

4. Kopiere die User-ID (UUID)

5. Gehe zu **SQL Editor** und verknüpfe User mit Venue:

```sql
INSERT INTO merchant_staff (user_id, venue_id, role, active)
VALUES (
  'USER-UUID-HIER',  -- Ersetze mit der User-ID
  '00000000-0000-0000-0000-000000000001',  -- Café Aurora
  'owner',
  true
);
```

Wiederhole für die anderen 2 Venues.

---

## 📡 API Zugriff (Supabase JS Client)

### In Next.js verwenden:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Venues abrufen
const { data: venues } = await supabase
  .from('venues')
  .select('*')
  .eq('active', true);

// Items für eine Venue
const { data: items } = await supabase
  .from('items')
  .select('*')
  .eq('venue_id', venueId)
  .eq('active', true);
```

---

## 🚨 Troubleshooting

### "permission denied for table xyz"

→ RLS ist aktiv! Du brauchst entweder:
1. Service Role Key (für Backend)
2. Authenticated User (für geschützte Daten)

### "relation does not exist"

→ Schema wurde nicht ausgeführt. Gehe zu SQL Editor und führe `schema.sql` aus.

### "duplicate key value violates unique constraint"

→ Du versuchst Seed-Daten nochmal zu laden. Lösche zuerst:

```sql
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM items;
DELETE FROM venues;
DELETE FROM merchant_staff;
```

Dann führe `seed.sql` nochmal aus.

---

## 📚 Nächste Schritte

1. ✅ Schema + Seed ausgeführt
2. ⏭️ `.env.local` mit Supabase Keys füllen
3. ⏭️ Supabase Client in Next.js installieren: `npm install @supabase/supabase-js`
4. ⏭️ API Routes erstellen für Orders
5. ⏭️ Frontend mit Supabase verbinden

---

## 🔗 Ressourcen

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
