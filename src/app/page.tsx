'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Simple Gradient Background */}
      <div 
        className="fixed inset-0 opacity-30 bg-gradient-to-br from-blue-600/30 via-transparent to-purple-600/30"
      />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-xl font-bold">A</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Aloq</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#wie" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Wie funktioniert's?
              </Link>
              <Link href="/welcome" className="px-6 py-2.5 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/20 transition-all">
                Für Kunden
              </Link>
              <Link href="/merchant/login" className="px-6 py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90 transition-all hover:scale-105">
                Für Betreiber
              </Link>
            </div>
            <Link href="/welcome" className="md:hidden px-6 py-2.5 bg-white text-black rounded-lg text-sm font-semibold">
              Starten
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-medium text-white/80">Kostenlos • Keine App nötig</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
            style={{
              lineHeight: '1',
              background: 'linear-gradient(to bottom, white, rgba(255,255,255,0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Bestellen, Buchen, Bezahlen.
            <br />
            In Sekunden.
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            Dein Lieblingscafé, Friseurtermin oder Kinokarte.
            <br />
            <span className="text-white font-semibold">Alles an einem Ort. Sofort.</span>
          </p>

          {/* Single Clear CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/welcome"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-2xl text-xl font-bold hover:bg-white/90 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20 w-full sm:w-auto"
            >
              Als Kunde starten
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link 
              href="/merchant/login"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 border-2 border-white/30 text-white rounded-2xl text-xl font-bold hover:bg-white/20 transition-all hover:scale-105 w-full sm:w-auto"
            >
              Als Betreiber starten
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </Link>
          </div>

          {/* Simple Trust Badges */}
          <div className="flex items-center justify-center gap-8 mt-16 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>DSGVO-konform</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Sichere Zahlung</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Made in Germany</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Simple Examples */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-center">
            Was kann ich damit machen?
          </h2>
          <p className="text-xl text-white/60 text-center mb-20 max-w-2xl mx-auto">
            Alles, was du in deiner Stadt brauchst. Einfach suchen, anklicken, erledigt.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '☕',
                title: 'Kaffee bestellen',
                desc: 'Café finden, Latte bestellen, in 10 Minuten abholen. Ohne Anstehen.',
                example: 'Café Zeitgeist, Hamburg',
              },
              {
                icon: '✂️',
                title: 'Friseurtermin buchen',
                desc: 'Freien Termin sehen, sofort buchen. Keine Telefonate mehr.',
                example: 'Hair Studio Müller, Berlin',
              },
              {
                icon: '🎬',
                title: 'Kinoticket kaufen',
                desc: 'Film aussuchen, Platz wählen, bezahlen. Ticket auf dem Handy.',
                example: 'CineStar, München',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/70 mb-4 leading-relaxed">{item.desc}</p>
                <div className="text-sm text-white/40 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="wie" className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-center">
            Wie funktioniert's?
          </h2>
          <p className="text-xl text-white/60 text-center mb-20 max-w-2xl mx-auto">
            Keine Installation. Keine Registrierung beim Start. Einfach loslegen.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: '1', 
                title: 'Link öffnen', 
                desc: 'Aloq.app in deinem Browser öffnen. Funktioniert auf jedem Handy und Computer.',
                icon: '🌐',
              },
              { 
                step: '2', 
                title: 'Suchen & Finden', 
                desc: 'Tippe wonach du suchst: "Kaffee", "Friseur" oder "Kino". Aloq zeigt dir alles in deiner Nähe.',
                icon: '🔍',
              },
              { 
                step: '3', 
                title: 'Fertig!', 
                desc: 'Auswählen, bestellen, bezahlen – alles in einer App. In unter 30 Sekunden.',
                icon: '✨',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-8"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <div className="text-sm text-blue-400 font-bold mb-3">Schritt {item.step}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/welcome"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl text-lg font-bold hover:bg-white/20 transition-all"
            >
              Jetzt ausprobieren
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="relative py-32 px-6 border-t border-white/5 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Warum noch eine App?
          </h2>
          <p className="text-xl text-white/70 mb-16 leading-relaxed max-w-2xl mx-auto">
            Weil du gerade 15 Apps auf deinem Handy hast für Dinge, die du in einer machen könntest.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20">
              <div className="text-3xl mb-4">😫</div>
              <h3 className="text-xl font-bold mb-3 text-red-400">Vorher</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Für jedes Café eine eigene App</li>
                <li>• Überall neu registrieren</li>
                <li>• Verschiedene Accounts merken</li>
                <li>• Handyspeicher voll</li>
                <li>• Unübersichtlich</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3 text-green-400">Mit Aloq</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Eine App für alles</li>
                <li>• Einmal anmelden</li>
                <li>• Ein Account</li>
                <li>• Keine Installation nötig</li>
                <li>• Immer übersichtlich</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section - SIMPLIFIED */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Du hast ein Geschäft?
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Lass deine Kunden sofort buchen und bestellen. Ohne eigene App, ohne Technik-Kopfschmerzen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Mehr Kunden',
                desc: 'Werde auf Aloq gefunden, wenn jemand in deiner Stadt nach deinem Service sucht.',
                icon: '📈',
              },
              {
                title: 'Weniger Arbeit',
                desc: 'Keine Telefonate mehr. Bestellungen kommen direkt digital rein.',
                icon: '⚡',
              },
              {
                title: 'Schnelle Zahlung',
                desc: 'Kunden bezahlen sofort online. Geld kommt automatisch auf dein Konto.',
                icon: '💰',
              },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/60 mb-6">
              Café, Friseur, Restaurant, Kino – egal was. Aloq funktioniert für alle.
            </p>
            <Link
              href="/merchant/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl text-lg font-bold hover:bg-white/90 transition-all hover:scale-105"
            >
              Kostenlos als Betreiber anmelden
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-sm text-white/40 mt-4">
              Dauert 2 Minuten • Keine Kreditkarte nötig
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Bereit?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Öffnet direkt im Browser. Keine Installation. Keine Registrierung beim Start.
          </p>
          <Link
            href="/welcome"
            className="inline-flex items-center gap-2 px-12 py-6 bg-white text-black rounded-2xl text-xl font-bold hover:bg-white/90 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
          >
            Jetzt kostenlos ausprobieren
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-sm text-white/40 mt-6">
            Funktioniert auf jedem Handy und Computer
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-xl font-bold">A</span>
                </div>
                <span className="text-2xl font-bold">Aloq</span>
              </div>
              <p className="text-white/40 text-sm">
                Alles in deiner Stadt.
                <br />
                Eine App.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Für dich</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/welcome" className="hover:text-white transition-colors">Jetzt starten</Link></li>
                <li><Link href="#wie" className="hover:text-white transition-colors">Wie funktioniert's?</Link></li>
                <li><Link href="/merchant/login" className="hover:text-white transition-colors">Für Betreiber</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Datenschutz</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Nutzungsbedingungen</Link></li>
                <li><Link href="/imprint" className="hover:text-white transition-colors">Impressum</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="mailto:hello@aloq.app" className="hover:text-white transition-colors">hello@aloq.app</a></li>
                <li><a href="https://twitter.com/aloq" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="https://instagram.com/aloq" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>© 2025 Aloq. Gebaut mit ❤️ in Deutschland.</p>
            <p>Made for humans. Built for the future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
