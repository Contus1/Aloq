# Aloq MVP - Tech Demo

**Alles in deiner Stadt. Eine App.**

Eine App, mit der man in seiner Stadt alles schnell finden und direkt buchen oder bestellen kann: Kaffee abholen, Tisch reservieren, später auch Arzttermine, Blumen, Friseur, Essen oder Tickets – alles in einer Oberfläche.

## 🚀 MVP Features

- ✅ **3 Demo-Venues**: Café Aurora, Backhaus Schmidt, Green Bowl
- ✅ **Guest Checkout**: Keine Registrierung erforderlich
- ✅ **Warenkorb**: Items auswählen + Abholzeit wählen
- ✅ **Stripe Payment**: Testmodus mit Webhook-Integration
- ✅ **Pickup-Code**: 6-stelliger Code nach Bezahlung
- ✅ **Merchant Console**: Bestellübersicht + Status-Updates

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Supabase (PostgreSQL + Row Level Security)
- **Auth**: Supabase Auth (Merchant Only)
- **Payment**: Stripe (Webhook Support)
- **Deployment**: Vercel-ready

## 🔌 API Endpoints (✅ Implementiert)

| Endpoint | Method | Beschreibung |
|----------|--------|--------------|
| `/api/orders` | POST | Order erstellen + Stripe Payment Intent |
| `/api/orders?email=` | GET | Orders nach E-Mail abrufen |
| `/api/stripe/webhook` | POST | Stripe Payment Events verarbeiten |
| `/api/merchant/orders?venue_id=` | GET | Orders für Venue abrufen |
| `/api/merchant/orders/[id]/status` | POST | Order Status updaten |
| `/api/search?q=` | GET | Suche über Venues + Items |
| `/api/venues` | GET | Alle aktiven Venues |
| `/api/venues/[id]` | GET | Venue Detail mit Menü |

## 🎯 User Flow (MVP)

1. **User** öffnet App im Browser
2. Sieht **3 Demo-Läden** (Café, Bäckerei, Bowl-Restaurant)
3. Wählt **Laden** → Sieht **Menü**
4. Fügt **Items** zum **Warenkorb** hinzu
5. Wählt **Abholzeit** (Slots à 15-30 Min)
6. Bezahlt mit **Stripe** (Testmodus)
7. Bekommt **6-stelligen Abhol-Code**
8. **Merchant** sieht Bestellung im Dashboard
9. Merchant drückt **"Preparing"** → **"Ready"**
10. User holt ab, Merchant drückt **"Picked Up"**

## 🏃‍♂️ Setup & Development

```bash
# Installation
npm install

# Development Server
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 🌱 Status

- ✅ Datenbank-Schema (Supabase)
- ✅ Demo-Daten (3 Venues, 35 Items)
- ✅ API Routes (7 Endpoints)
- ⏳ shadcn/ui Integration
- ⏳ Consumer App Frontend
- ⏳ Merchant Console

---

**Gebaut mit ❤️ für eine bessere, zugänglichere Welt.**
