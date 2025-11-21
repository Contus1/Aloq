# Aloq Quick Start Guide

## 🚀 Projekt lokal starten

### 1. Prerequisites

Stelle sicher, dass du folgendes installiert hast:
- Node.js 18+ ([Download](https://nodejs.org/))
- npm (kommt mit Node.js)
- Git

### 2. Repository klonen

Wenn du das Projekt noch nicht hast:
```bash
git clone https://github.com/Contus1/Aloq.git
cd Aloq/aloq
```

### 3. Dependencies installieren

```bash
npm install
```

### 4. Environment Variables

Kopiere die Example-Datei:
```bash
cp .env.example .env.local
```

Für den Start brauchst du noch keine echten Werte – die Platzhalter reichen für die Frontend-Entwicklung.

### 5. Development Server starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 📍 Routen testen

### Homepage
```
http://localhost:3000/
```
→ Sollte die ultra-moderne Landing Page mit allen Sektionen zeigen

### Consumer App
```
http://localhost:3000/app
```
→ Zeigt die Suchoberfläche für Endnutzer

### Merchant Console
```
http://localhost:3000/merchant
```
→ Zeigt das Business Dashboard

### API Health Check
```
http://localhost:3000/api
```
→ Sollte JSON mit Status zurückgeben

## 🎨 Design ansehen

Das Design folgt dem gentlerain.ai-Stil:
- Große, mutige Typografie
- Subtile Gradient-Animationen
- Clean, minimalistisches Layout
- Dark Mode Support (teste mit System-Theme)

### Dark Mode testen

**macOS:**
System Settings → Appearance → Dark

**Windows:**
Settings → Personalization → Colors → Dark

Die Website passt sich automatisch an!

## 🛠️ Entwicklung

### Code formatieren

```bash
npm run format
```

### Linting

```bash
npm run lint
```

### Production Build testen

```bash
npm run build
npm start
```

## 📁 Wichtige Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/app/page.tsx` | Homepage |
| `src/app/layout.tsx` | Root Layout mit Metadata |
| `src/app/globals.css` | Globale Styles & Custom CSS |
| `src/components/home/*` | Homepage Komponenten |
| `src/app/app/*` | Consumer App |
| `src/app/merchant/*` | Merchant Console |
| `src/app/api/*` | API Routes |
| `src/types/index.ts` | TypeScript Definitionen |

## 🔍 Code Navigation

### Eine Component finden

```bash
# Suche nach Component-Namen
find src -name "Hero.tsx"

# Suche in Code
grep -r "gradient-text" src/
```

### Struktur ansehen

```bash
tree src/ -L 3 -I node_modules
```

## 🎯 Was als nächstes?

1. **Designs anpassen**: Farben, Abstände, etc. in `src/components/home/*`
2. **Neue Seiten**: Erstelle neue Routes in `src/app/`
3. **API erweitern**: Füge Logik in `src/app/api/*` hinzu
4. **Types hinzufügen**: Erweitere `src/types/index.ts`

## 📖 Dokumentation

- **README.md** - Projekt-Übersicht
- **TECHNICAL.md** - Technische Details & Best Practices
- **ROADMAP.md** - Feature-Planung & Todos

## 🐛 Probleme?

### Port schon belegt

```bash
# Finde Prozess auf Port 3000
lsof -ti:3000

# Beende Prozess
kill -9 $(lsof -ti:3000)

# Oder nutze anderen Port
npm run dev -- -p 3001
```

### Dependencies-Fehler

```bash
# Cache löschen und neu installieren
rm -rf node_modules package-lock.json
npm install
```

### Build-Fehler

```bash
# .next Ordner löschen
rm -rf .next
npm run dev
```

## 💡 Tipps

1. **Hot Reload**: Änderungen erscheinen automatisch im Browser
2. **Komponenten-Isolation**: Jede Section ist eigenständig
3. **TypeScript**: Nutze Type-Hints (Cmd+Space in VS Code)
4. **Tailwind IntelliSense**: Installiere VS Code Extension
5. **React DevTools**: Browser Extension installieren

## 🚢 Deployment (später)

Wenn du deployen möchtest:

```bash
# Vercel (empfohlen)
npm i -g vercel
vercel

# Oder via Git Push zu Vercel/Netlify
git push origin main
```

## 📞 Support

Bei Fragen:
- Siehe TECHNICAL.md für Details
- Siehe ROADMAP.md für geplante Features
- Check GitHub Issues

---

**Happy Coding! 🎉**
