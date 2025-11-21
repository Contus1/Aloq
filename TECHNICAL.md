# Aloq - Technische Dokumentation

## Architektur-Übersicht

Aloq ist als Next.js-Monorepo strukturiert, das drei Hauptbereiche in einer Codebasis vereint:

1. **Marketing Website** (`/`)
2. **Consumer App** (`/app`)
3. **Merchant Console** (`/merchant`)

### Warum Monorepo?

- **Code-Sharing**: Gemeinsame Components, Types und Utils
- **Konsistente Dependencies**: Eine package.json für alles
- **Einfachere Deployment**: Ein Build, ein Deploy
- **Bessere DX**: Alle Teile in einem Projekt

## Routing-Struktur

```
/ (Root)
├── page.tsx                    → Homepage
│
├── /app                        → Consumer PWA
│   ├── layout.tsx             → App-spezifisches Layout
│   ├── page.tsx               → Dashboard/Suche
│   ├── /search
│   ├── /orders
│   └── /profile
│
├── /merchant                   → Merchant Console
│   ├── layout.tsx             → Merchant-spezifisches Layout
│   ├── page.tsx               → Merchant Dashboard
│   ├── /bookings
│   ├── /orders
│   └── /settings
│
└── /api                        → Backend API
    ├── /auth
    ├── /search
    ├── /bookings
    ├── /orders
    └── /merchants
```

## API-Design

### REST Principles

Alle API-Routen folgen RESTful Conventions:

- `GET` - Daten abrufen
- `POST` - Neue Ressource erstellen
- `PUT/PATCH` - Ressource aktualisieren
- `DELETE` - Ressource löschen

### Authentifizierung (geplant)

```typescript
// Middleware für geschützte Routen
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Route logic
}
```

### Rate Limiting (TODO)

```typescript
// Schutz vor Missbrauch
import rateLimit from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const identifier = request.ip ?? 'anonymous';
  const { success } = await rateLimit(identifier);
  
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  
  // Route logic
}
```

## Datenbank-Schema (geplant)

### Users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'customer' | 'merchant' | 'admin'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Merchants

```sql
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  business_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  address JSONB NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  description TEXT,
  opening_hours JSONB,
  images TEXT[],
  rating DECIMAL(3,2),
  review_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Bookings

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  customer_id UUID REFERENCES users(id),
  service_type VARCHAR(100),
  datetime TIMESTAMP NOT NULL,
  party_size INT,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Orders

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  customer_id UUID REFERENCES users(id),
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  order_type VARCHAR(50) NOT NULL,
  pickup_time TIMESTAMP,
  delivery_address JSONB,
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## State Management

### Client-Side

**Aktuell**: React Hooks (useState, useEffect)

**Geplant für komplexere Features**:
- Zustand für auth
- TanStack Query (React Query) für Server State
- Optional: Zustand für globalen Client State

### Server-Side

- Next.js Server Components für initiales Rendering
- Server Actions für Mutations (geplant)
- API Routes für externe Zugriffe

## Styling-Konventionen

### Tailwind Classes

```tsx
// ✅ Gut: Semantische Gruppierung
<div className="
  flex items-center justify-between
  px-6 py-4
  bg-white dark:bg-neutral-900
  border border-neutral-200 dark:border-neutral-800
  rounded-xl
  hover:scale-105 transition-transform
">
  
// ❌ Schlecht: Ungeordnet
<div className="px-6 rounded-xl flex hover:scale-105 bg-white items-center border">
```

### Custom CSS

Nur für komplexe Animationen oder wiederverwendbare Patterns in `globals.css`.

## Performance-Optimierungen

### Bilder

```tsx
import Image from 'next/image';

// Immer Next.js Image Component nutzen
<Image
  src="/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

### Code Splitting

```tsx
// Lazy Loading für schwere Components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
});
```

### Font Optimization

- System fonts bevorzugen
- WOFF2 für custom fonts
- font-display: swap

## Sicherheit

### Geplante Maßnahmen

1. **Input Validation**: Zod oder Yup für Schema-Validierung
2. **CSRF Protection**: Tokens für State-Changing Operations
3. **XSS Prevention**: DOMPurify für User-Generated Content
4. **SQL Injection**: Prepared Statements/ORMs
5. **Rate Limiting**: Pro IP/User für API Routes
6. **Secure Headers**: next.config.ts mit Security Headers
7. **HTTPS Only**: Strict-Transport-Security
8. **Cookie Security**: httpOnly, secure, sameSite

## Testing-Strategie (TODO)

### Unit Tests

```bash
npm test
npm run test:watch
```

- Jest + React Testing Library
- Tests für Business Logic
- Tests für API Routes

### E2E Tests

```bash
npm run test:e2e
```

- Playwright oder Cypress
- User Flows testen
- Critical Paths absichern

### Accessibility Tests

- axe-core Integration
- Lighthouse CI
- Manual Testing mit Screen Readers

## Deployment

### Vercel (empfohlen)

```bash
# Automatisch via Git Push
git push origin main

# Oder manuell
vercel --prod
```

### Environment Variables

```env
# .env.local (nicht committen!)
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Build-Optimierung

```javascript
// next.config.ts
const config = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [/* ... */],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

## Monitoring & Analytics (TODO)

- **Error Tracking**: Sentry
- **Analytics**: Privacy-First Alternative (Plausible/Fathom)
- **Performance**: Vercel Analytics
- **Logs**: Structured Logging mit Winston/Pino

## Barrierefreiheit

### WCAG 2.1 Level AA Compliance

- ✅ Semantic HTML
- ✅ Keyboard Navigation
- ✅ ARIA Labels where needed
- ✅ Color Contrast (4.5:1 minimum)
- ✅ Focus Indicators
- ✅ Skip Links
- ✅ Alt Text für alle Bilder

### Testing

```bash
# Lighthouse Accessibility Audit
npm run lighthouse

# axe-core
npm run test:a11y
```

## Git Workflow

### Branching Strategy

```
main (production)
  └── develop (staging)
       ├── feature/search-integration
       ├── feature/payment-flow
       └── fix/booking-validation
```

### Commit Convention

```bash
feat: Add universal search
fix: Resolve booking time conflict
docs: Update API documentation
style: Format components with Prettier
refactor: Simplify auth logic
test: Add booking flow tests
chore: Update dependencies
```

## Weitere Resourcen

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
