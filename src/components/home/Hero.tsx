'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use timeout to avoid cascading renders
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 dark:from-neutral-950 dark:via-indigo-950/20 dark:to-purple-950/10">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl transition-transform duration-[3000ms] ${
            mounted ? 'scale-150 rotate-45' : 'scale-100'
          }`}
        />
        <div
          className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl transition-transform duration-[3000ms] delay-300 ${
            mounted ? 'scale-150 -rotate-45' : 'scale-100'
          }`}
        />
      </div>

      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
          {/* Headline */}
          <h1
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tight transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Alles in deiner Stadt.
            <br />
            <span className="gradient-text">Eine App.</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto text-neutral-600 dark:text-neutral-400 leading-relaxed transition-all duration-1000 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Schluss mit App-Chaos. Aloq bringt dir lokale Services direkt auf den Screen – vom
            Cappuccino bis zum Tisch.
            <br />
            <span className="font-semibold text-neutral-900 dark:text-neutral-200">
              Eine Suche. Eine Aktion.
            </span>
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href="/app"
              className="group relative px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50"
            >
              <span className="relative z-10">Jetzt starten</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="#business"
              className="px-10 py-5 text-lg font-semibold text-neutral-900 dark:text-neutral-100 border-2 border-neutral-900 dark:border-neutral-100 rounded-full transition-all duration-300 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-neutral-900 hover:scale-105"
            >
              Für Unternehmen
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-6 h-10 border-2 border-neutral-400 dark:border-neutral-600 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
