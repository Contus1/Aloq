# Aloq - Monorepo

**Alles in deiner Stadt. Eine App.**

Ein modernes Next.js-Monorepo für die Aloq-Plattform, die lokale Services in einer einzigen Anwendung bündelt.

## 🚀 Features

- **Homepage**: Ultra-minimalistisches Design im gentlerain.ai-Stil
- **Consumer PWA** (`/app`): App für Endnutzer zum Suchen, Buchen und Bestellen
- **Merchant Console** (`/merchant`): Dashboard für Geschäftsinhaber
- **API Routes** (`/api`): Backend-Logik mit Next.js API Routes

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Code Quality**: ESLint + Prettier
- **Deployment**: Vercel-ready

## 📁 Projektstruktur

```
aloq/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── app/                  # Consumer PWA
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── merchant/             # Merchant Console
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── api/                  # API Routes
│   │       ├── auth/
│   │       ├── search/
│   │       ├── bookings/
│   │       ├── orders/
│   │       └── merchants/
│   ├── components/
│   │   └── home/                 # Homepage Components
│   └── types/
│       └── index.ts              # TypeScript Types
├── public/
│   └── manifest.json             # PWA Manifest
└── package.json
```

## 🏃‍♂️ Entwicklung

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

### Build

```bash
npm run build
npm start
```

### Code Quality

```bash
# Linting
npm run lint

# Formatierung
npm run format

# Formatierung prüfen
npm run format:check
```

## 🎨 Design-Prinzipien

- **Ultra-minimalistisch**: Große Typografie, klare Struktur
- **Subtile Animationen**: Mikrointeraktionen ohne Ablenkung
- **Dark Mode Support**: Automatische Theme-Anpassung
- **Mobile-First**: Optimiert für alle Bildschirmgrößen
- **Barrierefreiheit**: Hohe Kontraste, semantisches HTML

## 🗺️ Routen-Übersicht

- `/` - Homepage mit Value Proposition
- `/app` - Consumer PWA (Suche, Buchung, Bestellungen)
- `/merchant` - Merchant Dashboard
- `/api/*` - Backend API Endpoints

## 🔐 Authentifizierung

Die Authentifizierung ist vorbereitet, aber noch nicht implementiert. API-Routen unter `/api/auth/*` sind als Platzhalter vorhanden.

**Geplante Integration**:
- NextAuth.js für OAuth & Credentials
- JWT für Session Management
- DSGVO-konforme Cookie-Verwaltung

## 📱 PWA Features

- Installierbar als Web App
- Offline-fähig (in Planung)
- Push-Benachrichtigungen (in Planung)
- App-Shortcuts für schnellen Zugriff

## 🌱 Nächste Schritte

1. **Datenbank-Integration**: PostgreSQL/MongoDB anbinden
2. **Auth-System**: NextAuth.js implementieren
3. **Such-Engine**: Elasticsearch/Algolia für universelle Suche
4. **Payment**: Stripe/PayPal Integration
5. **Notifications**: Push-Benachrichtigungen und E-Mails
6. **Testing**: Jest + React Testing Library
7. **CI/CD**: GitHub Actions Setup

## 📄 Lizenz

Proprietary - Alle Rechte vorbehalten

## 🤝 Kontakt

Für Fragen oder Unterstützung kontaktiere das Aloq-Team.

---

**Gebaut mit ❤️ für eine bessere, zugänglichere und nachhaltigere digitale Welt.**
