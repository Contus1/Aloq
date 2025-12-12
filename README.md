# 🚀 Aloq - Super-App MVP für Deutschland

> **WeChat-inspirierte Super-App** für lokales Bestellen, Mini-Apps und Merchant-Management

**Alles in deiner Stadt. Eine App.**

---

## ⚡ Mockup lokal starten 

1) Voraussetzungen: Node.js 18+ und npm installiert. (Git nur nötig, wenn du per Repo klonst.)
2) Projekt in VS Code öffnen: `File → Open Folder` und den Ordner wählen, in dem die `package.json` liegt (`aloq`).
3) VS-Code-Terminal öffnen (``Ctrl+` `` bzw. `View → Terminal`) und sicherstellen, dass du im Projektordner bist (`pwd` zeigt auf `.../aloq`).
4) Abhängigkeiten holen: `npm install`
5) Dev-Server starten: `npm run dev` und im Browser [http://localhost:3000](http://localhost:3000) öffnen. Wichtige Mock-Routen: `/app`, `/app/apps/rmv` (RMV Tickets + Verbindungen), `/app/venue/...`.

> Kein `.env.local` nötig; alles läuft als Mockup ohne Stripe/Supabase Setup.

---

## 🎤 Elevator Pitch

Eine App, mit der man in seiner Stadt alles schnell finden und direkt buchen oder bestellen kann: Kaffee abholen, Tisch reservieren, später auch Arzttermine, Blumen, Friseur, Essen oder Tickets – alles in einer Oberfläche. Ein Login, eine Suche, eine Aktion.

---

## 🧭 Plan & Fokus (heute ↔ in den nächsten Monaten)

- **Grundidee**: Deutschland hat für jeden Service eine eigene App (Doctolib, Lieferando, TheFork, Fleurop). Aloq bündelt das in einer Suche: „Cappuccino“, „Tisch 19:00“, „Blumen“, „Arzt morgen“.
- **Startpunkt (MVP)**: Café- & Takeaway-Pickup + Tischreservierungen. Ziel: Bestellung/Reservierung in zwei Klicks, ohne App-Wechsel oder Telefonate.
- **Technische Entscheidung**: Kein Xcode-Start. Stattdessen Next.js + React + PWA für eine Codebasis (iPhone, Android, Desktop, Händlerkonsole), schnelle Builds/Hosting (Vercel), einfache Payments (Stripe) und SEO für die Homepage.

### Aktuelle Bauphase (Nov–Feb, Korea)
- Landing Page + Domain (Aloq.com o. Ä.) mit „Pilot-Partner“-Formular und Mockup-Screens.
- App-Grundgerüst mit 3 Demo-Stores (Café, Bäckerei, Lunch), Menüs/Optionen/Abhol-Slots, Checkout (Stripe PaymentIntent Mock), Guest/Magic-Link optional, einfache Suche (lokal seeded), UI mit Tailwind + shadcn.
- Händler-Konsole als PWA: Login, Öffnungszeiten, Menü-Editor, Bestellübersicht, „Ready“-Button.
- Recht & Business vorbereiten: AGB, Händlervertrag, Datenschutz, Impressum, Widerrufsbelehrung; Pitch Deck + Produktvideo; Pilot-Kit (Flyer, QR, Händlervertrag).

### Deutschland-Phase (ab März)
- Gewerbe anmelden (Kleingewerbe oder UG), Pilotstadt 20–80k Einwohner wählen.
- 10+ Cafés/Takeaways onboarden (Demo vor Ort, QR-Sticker, Flyer), „City Alpha“-Launch.
- Pilotstart: Launch-Day, PR/Local Ads, Studenten als erste Nutzer. Ziel: 300+ Orders in 30 Tagen und Messung von Conversion, Top-Items, Peak-Zeiten.

### Timeline kompakt
- **Nov–Dez**: Name + Domain, Design-System/Logo, Landing Page, Next.js + Supabase + Stripe Gerüst, Händler-Konsole v1, Demo-USPs.
- **Jan–Feb**: Fake-Daten + echter Clickthrough, End-to-end Flow fertig, Produktvideo, Rechtspaket, Pitch Deck, Pilot-Kit (Flyer/QR/Vertrag).
- **März**: Gewerbe, Pilotstadt, Kaltakquise zu Fuß, 10+ Betriebe onboarden, Aloq „City Alpha“ live.
- **Apr–Mai**: Feature-Fixes, native Reservations falls sinnvoll, Payment-Auszahlungen automatisieren, zweite Stadt vorbereiten.

### Langfristige Vision (Super-App für lokale Services)
- Geplante Integrationen: Gesundheit (Doctolib/Apotheken/Teststellen), Essen & Pickup, Cafés/Bäckerei, Friseur/Beauty (Treatwell/Reserve-with-Google), Blumen/Geschenke, Mobilität (ÖPNV/E-Scooter), Stadtservices (Recycling/Bürgerbüro/Events), Local Pay Wallet + Treuepunkte.
- Ziel-Metriken: Conversion >30 %, 10+ Betriebe je Stadt, AOV 12–18 €, Retention 25 % nach 30 Tagen.
- Nutzen: Nutzer ohne App-Hopping, Betriebe bekommen Sichtbarkeit/Bestellungen ohne eigene Website, Städte stärken lokale Anbieter digital.

---

## 📱 Was ist Aloq?

Aloq ist Deutschlands Antwort auf WeChat - eine **All-in-One Super-App**, die:
- **Lokales Bestellen** mit QR-Code-Bestellung am Tisch ermöglicht
- **Mini-Apps** für 12+ Services (City Pass, Kino, Wäscherei, Beauty, uvm.) bietet
- **Merchant-Portal** mit Live-Kanban, Menü-Editor und Auszahlungen bereitstellt
- **Mobile-First** mit vollständiger Desktop-Optimierung designed ist

---

## 🎯 Features

### 👥 User Journey (Kunde)

✅ **Welcome & Onboarding** (`/welcome`) - Rollen-Auswahl & Stadt-Picker  
✅ **Home Screen** (`/app`) - Suche, Kategorien, Empfohlene Venues  
✅ **Venue Detail** (`/app/venue/[id]`) - Menü, Cart, Bottom Sheet für Optionen  
✅ **Checkout** (`/app/checkout`) - Warenkorb, Abholzeit, Stripe Mockup  
✅ **Order Success** (`/app/order-success`) - Pickup-Code, QR, Timeline, Loyalty Card  
✅ **Meine Bestellungen** (`/app/orders`) - Aktive/Historie Tabs, Status-Tracking  
✅ **Mini-Apps Hub** (`/app/apps`) - 12 Mini-Apps Grid mit Kategorien  
✅ **Suche** (`/app/search`) - Filter, Sortierung, Locations & Produkte  

### 🏪 Merchant Journey (Betreiber)

✅ **Login** (`/merchant/login`) - Demo-Modus aktiviert  
✅ **Dashboard** (`/merchant/dashboard`) - 4 KPIs, Quick Actions  
✅ **Live Orders Board** (`/merchant/orders`) - Kanban mit Drag & Drop  
✅ **Menü-Editor** (`/merchant/menu`) - Tabelle, Aktiv-Schalter, Edit-Sheet  
✅ **Auszahlungen** (`/merchant/payouts`) - Historie, CSV Export  
✅ **QR-Codes** (`/merchant/qr`) - Generator für Tisch-Bestellungen  

---

## 🚉 RMV Mini-App (Mockup)

- Tickets (Einzelfahrt, Tageskarte, Deutschland-Ticket) + fiktive Verbindungsauskunft mit Gleis/Status/Auslastung.
- Demo unter `/app/apps/rmv` – Mock-Kauf leitet in die Bestellungen.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.3** mit App Router
- **TypeScript** (Strict Mode)
- **Tailwind CSS v4** mit Custom Variants
- **shadcn/ui** (13 Components)
- **React Context API** für Cart Management

### Drag & Drop
- `@dnd-kit/core` v6.1.2
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`

### Payment
- `@stripe/stripe-js` (Client-Side)
- **Mockup Mode** mit Apple Pay / Google Pay Badges

### Backend
- **Supabase** für Datenbank & Auth
- **Stripe** für Payments
- **7 API Routes** für Orders, Venues, Items, Merchant

---

## 🔌 API Endpoints

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

---

## 🚦 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Dev Server (Mockup-Only)

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

> Aktuell ist alles Mockup – kein Stripe/Supabase Setup oder `.env.local` erforderlich.

---

## 📂 Projekt-Struktur

```
src/
├── app/
│   ├── (user)/                    # User App Route Group
│   │   ├── welcome/page.tsx       # Onboarding
│   │   └── app/
│   │       ├── page.tsx           # Home Screen
│   │       ├── venue/[id]/        # Venue Detail
│   │       ├── checkout/          # Checkout Flow
│   │       ├── order-success/     # Success Screen
│   │       ├── orders/            # Order History
│   │       ├── apps/              # Mini-Apps Hub
│   │       └── search/            # Search Results
│   │
│   ├── merchant/                  # Merchant Portal
│   │   ├── layout.tsx             # Desktop Sidebar + Mobile Nav
│   │   ├── login/                 # Auth
│   │   ├── dashboard/             # Dashboard
│   │   ├── orders/                # Live Kanban Board
│   │   ├── menu/                  # Menu Editor
│   │   ├── payouts/               # Payouts Overview
│   │   └── qr/                    # QR Code Generator
│   │
│   ├── api/                       # Backend Routes
│   └── layout.tsx                 # Root Layout mit CartProvider
│
├── components/ui/                 # shadcn Components
├── contexts/CartContext.tsx       # Global Cart State
└── lib/                           # Supabase & Stripe Clients
```

---

## 🎨 Mockup Data

**Alle Mockup-Daten sind mit Kommentaren markiert:**

```typescript
// MOCKUP DATA - In Production von API laden
const MOCKUP_VENUES = [...]

// **MOCKUP:** Stripe Elements Integration
<div className="p-6 bg-neutral-100">
  **MOCKUP:** Stripe Elements wird hier integriert
</div>
```

**Zu ersetzen:**
1. Venue-Daten → API Calls
2. Order-Daten → API mit Email-Filter
3. Stripe Elements → Echte Integration
4. QR-Code → Library (z.B. `qrcode.react`)
5. Merchant Stats → API Aggregation

---

## 📱 Routing & Navigation

### User Routes
```
/welcome              → Onboarding
/app                  → Home Screen
/app/venue/[id]       → Venue Detail
/app/checkout         → Checkout
/app/order-success    → Success Screen
/app/orders           → Order History
/app/apps             → Mini-Apps Hub
/app/search           → Search Results
```

### Merchant Routes
```
/merchant/login       → Auth
/merchant/dashboard   → Dashboard
/merchant/orders      → Live Orders Kanban
/merchant/menu        → Menu Editor
/merchant/payouts     → Payouts Overview
/merchant/qr          → QR Code Generator
```

---

## 🎯 User Flows

### Flow 1: Bestellung aufgeben
```
/welcome → /app → /app/venue/1 → Add to Cart
→ /app/checkout → Payment → /app/order-success
```

### Flow 2: Merchant Bestellung bearbeiten
```
/merchant/login → /merchant/dashboard → Live Orders
→ Drag Order to "In Vorbereitung"
```

---

## 🌟 WeChat-Inspiration

Aloq folgt dem **WeChat Super-App Modell**:

1. **Einheitliche Platform**: Eine App für alles
2. **Mini-Apps**: Leichtgewichtige Services ohne Download
3. **QR-Codes**: Überall scanbar (Tische, Poster)
4. **Social Layer**: Teilen von Bestellungen & Codes
5. **Loyalty**: Stempelkarten & Rewards
6. **Merchant Tools**: Integriertes Business Dashboard

---

## 🐛 Bekannte Issues

1. **TypeScript Errors** in API Routes (Supabase Type Inference) - Non-Blocking
2. **Mockup Data** muss durch echte API Calls ersetzt werden
3. **Stripe Elements** Integration ausstehend

---

## 📈 Production Todos

- [ ] Mockup Data durch API Calls ersetzen
- [ ] Stripe Elements Integration
- [ ] QR-Code Library einbinden
- [ ] Supabase Auth aktivieren
- [ ] TypeScript Errors fixen
- [ ] E2E Tests mit Playwright
- [ ] Deployment auf Vercel

---

## 👨‍💻 Development Notes

### Cart Management
```typescript
const { cart, addToCart, getTotalCents } = useCart();

addToCart({
  venueId: '1',
  itemId: '1',
  itemName: 'Latte Macchiato',
  priceCents: 340,
  quantity: 1,
});
```

### Drag & Drop
```typescript
const { attributes, listeners, setNodeRef, transform } = useSortable({ 
  id: order.id 
});
```

---

## 📄 License

MIT - Created for Deutschland 🇩🇪

---

## 🙏 Credits

- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: Heroicons (via Tailwind)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **Inspiration**: WeChat, Alipay, Gojek

---

**Built with 💙 - Ready to revolutionize Germany's local commerce** 🚀

**Gebaut mit ❤️ für eine bessere, zugänglichere Welt.**
