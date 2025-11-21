# Aloq MVP - Setup Guide

## 🎯 Was ist der MVP?

Der MVP (Minimum Viable Product) / Tech-Demo zeigt den kompletten Flow:

1. **User** öffnet App → sieht 3 Demo-Läden
2. **User** wählt Artikel → Warenkorb → wählt Abholzeit
3. **User** bezahlt (Stripe Testmodus)
4. **User** bekommt Abhol-Code
5. **Merchant** sieht Bestellung → drückt „Ready"

**Noch OHNE:**
- User-Accounts (Guest Checkout reicht)
- Geo-Location
- Echtes Merchant-Onboarding
- Push-Notifications

---

## 🚀 Setup-Schritte

### 1. Supabase Setup ✅

1. Supabase-Projekt erstellt
2. Schema ausgeführt (`supabase/schema.sql`)
3. Demo-Daten geladen (`supabase/seed.sql`)
4. Environment Variables kopiert

**→ Siehe `supabase/README.md` für Details**

### 2. Stripe Setup ⏳

1. Gehe zu [stripe.com/de](https://stripe.com/de) → Registrieren
2. Aktiviere **Test Mode** (Toggle oben rechts)
3. Gehe zu **Developers** → **API Keys**
4. Kopiere:
   - Publishable Key (`pk_test_...`)
   - Secret Key (`sk_test_...`)
5. Füge in `.env.local` ein:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

**Webhook später:**
- Für lokale Entwicklung: Stripe CLI
- Für Production: Webhook in Stripe Dashboard einrichten

### 3. Environment Variables

Kopiere `.env.example` zu `.env.local`:

```bash
cp .env.example .env.local
```

Fülle diese Werte aus:

```env
# PFLICHT für MVP
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OPTIONAL (später)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. Dependencies installieren ✅

```bash
npm install
```

Bereits installiert:
- ✅ `@supabase/supabase-js`
- ✅ `stripe`
- ✅ `@stripe/stripe-js`

### 5. Dev Server starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

---

## 📋 Was wurde erstellt?

### ✅ Supabase Backend

**Schema** (`supabase/schema.sql`):
- 6 Tabellen (venues, items, orders, order_items, merchant_staff, item_options)
- Row Level Security (RLS) aktiviert
- Pickup-Code-Generator-Funktion
- Indexes für Performance

**Demo-Daten** (`supabase/seed.sql`):
- 3 Venues (Café Aurora, Backhaus Schmidt, Green Bowl)
- ~35 Menu Items

**Types** (`src/types/database.ts`):
- TypeScript-Definitionen für alle Tabellen

**Client** (`src/lib/supabase.ts`):
- Supabase Client für Browser
- Admin Client für Server

### ✅ Stripe Integration

**Utility** (`src/lib/stripe.ts`):
- Stripe Client initialisiert
- Helper-Funktionen (formatCurrency, calculateOrderTotal)

### ⏳ TODO: API Routes

Folgende API-Routen müssen noch erstellt werden:

1. **`/api/orders/prepare`** - Order vorbereiten + Payment Intent
2. **`/api/stripe/webhook`** - Stripe Webhook Handler
3. **`/api/merchant/orders`** - Orders für Merchant abrufen
4. **`/api/merchant/orders/[id]/status`** - Order-Status aktualisieren
5. **`/api/search`** - Einfache Suche über Venues & Items

### ⏳ TODO: Frontend

**Consumer App** (`/app/*`):
1. Venue-Liste mit Demo-Läden
2. Venue-Detail mit Menü
3. Warenkorb-Funktionalität
4. Checkout mit Stripe
5. Bestellbestätigung mit Pickup-Code

**Merchant Console** (`/merchant/*`):
1. Login (Supabase Auth)
2. Orders-Liste für heute
3. Status-Update-Buttons
4. Einfache Menü-Ansicht (read-only für MVP)

---

## 🧪 Testing

### Stripe Testkarten

**Erfolgreiche Zahlung:**
```
Kartennummer: 4242 4242 4242 4242
Datum: beliebig in der Zukunft (z.B. 12/34)
CVC: beliebig (z.B. 123)
PLZ: beliebig (z.B. 12345)
```

**Ablehnung (insufficient funds):**
```
Kartennummer: 4000 0000 0000 9995
```

**3D Secure (Authentication required):**
```
Kartennummer: 4000 0027 6000 3184
```

**Vollständige Liste:** [stripe.com/docs/testing](https://stripe.com/docs/testing)

### Supabase Testing

**Venues abrufen:**
```typescript
const { data } = await supabase
  .from('venues')
  .select('*')
  .eq('active', true);

console.log(data); // Sollte 3 Venues zurückgeben
```

**Items für Café Aurora:**
```typescript
const { data } = await supabase
  .from('items')
  .select('*')
  .eq('venue_id', '00000000-0000-0000-0000-000000000001')
  .eq('active', true);

console.log(data); // Sollte ~12 Items zurückgeben
```

---

## 🗺️ Development Roadmap

### Phase 1: Backend (Diese Woche)
- [x] Supabase Schema
- [x] Demo-Daten
- [x] TypeScript Types
- [x] Supabase Client
- [x] Stripe Client
- [ ] API Routes (orders, webhook, merchant)

### Phase 2: Frontend Core (Nächste Woche)
- [ ] shadcn/ui Integration
- [ ] Venue-Liste
- [ ] Venue-Detail + Menü
- [ ] Warenkorb-State Management
- [ ] Checkout-Seite

### Phase 3: Payment & Orders (Woche 3)
- [ ] Stripe Elements Integration
- [ ] Payment Flow
- [ ] Order Confirmation
- [ ] Merchant Login
- [ ] Merchant Orders-View

### Phase 4: Polish & Testing (Woche 4)
- [ ] End-to-End Testing
- [ ] Mobile Optimierung
- [ ] Error Handling
- [ ] Loading States
- [ ] Demo-Video

---

## 📦 Dependencies

### Installiert ✅

```json
{
  "dependencies": {
    "next": "16.0.3",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@supabase/supabase-js": "^2.x",
    "stripe": "^17.x",
    "@stripe/stripe-js": "^4.x"
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^4",
    "eslint": "^9",
    "prettier": "^3.6.2"
  }
}
```

### Noch zu installieren (nächste Schritte)

```bash
# shadcn/ui
npx shadcn@latest init

# State Management (für Warenkorb)
npm install zustand

# Date/Time Handling
npm install date-fns

# Form Validation
npm install zod react-hook-form @hookform/resolvers
```

---

## 🔐 Security Checklist

- [x] Environment Variables nicht committen (`.env.local` in `.gitignore`)
- [x] Row Level Security aktiviert
- [x] Service Role Key nur server-side nutzen
- [x] Stripe Secret Key nur server-side
- [ ] CSRF Protection (Next.js API Routes sind safe)
- [ ] Input Validation (Zod)
- [ ] Rate Limiting (später)

---

## 🚨 Troubleshooting

### "Module not found: @/types/database"

→ TypeScript kann den Path Alias nicht auflösen. Restart VS Code oder:
```bash
npx tsc --noEmit
```

### "Missing Supabase environment variables"

→ Hast du `.env.local` erstellt und gefüllt?

### "Stripe API version mismatch"

→ Update Stripe SDK:
```bash
npm update stripe
```

### "RLS policy violation"

→ Du versuchst protected Daten abzurufen. Entweder:
1. Service Role Key nutzen (server-side)
2. Als User authentifizieren
3. RLS Policy anpassen

---

## 📖 Dokumentation

- **Supabase Setup:** `supabase/README.md`
- **Project Summary:** `PROJECT_SUMMARY.md`
- **Technical Docs:** `TECHNICAL.md`
- **Roadmap:** `ROADMAP.md`

---

## ✅ Nächste Schritte

1. **Fülle `.env.local` aus** mit Supabase + Stripe Keys
2. **Teste Supabase Connection** (siehe Testing oben)
3. **Implementiere API Routes** (als nächstes)
4. **shadcn/ui Setup** für UI Components
5. **Frontend bauen** (Venues, Cart, Checkout)

---

**Status:** Backend Setup ✅ | API Implementation ⏳ | Frontend ⏳
