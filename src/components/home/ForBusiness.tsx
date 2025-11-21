'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const benefits = [
  { title: 'Mehr Reichweite', description: 'Erscheine dort, wo deine Kunden aktiv suchen' },
  { title: 'Weniger No-Shows', description: 'Bestätigungen und Erinnerungen automatisch' },
  { title: 'Ein Dashboard', description: 'Alle Buchungen, alle Bestellungen, ein Ort' },
];

const useCases = [
  'Cafés & Bäckereien',
  'Restaurants & Bars',
  'Dienstleister (Friseur, Kosmetik, Gesundheit)',
];

export default function ForBusiness() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="business"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-br from-neutral-900 to-neutral-950 dark:from-neutral-950 dark:to-black text-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-5xl md:text-7xl font-bold mb-6 tracking-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Aloq für <span className="gradient-text">Unternehmen</span>
            </h2>
            <p
              className={`text-2xl md:text-3xl font-semibold mb-4 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Mehr Buchungen. Weniger Chaos. Maximale Sichtbarkeit.
            </p>
            <p
              className={`text-xl text-neutral-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Aloq verbindet dein Business mit Kunden, die wirklich kommen wollen.
            </p>
          </div>

          {/* Benefits */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-lg text-neutral-300">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div
            className={`mb-12 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-3xl font-bold mb-8 text-center">Perfekt für:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm text-lg font-medium"
                >
                  {useCase}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className={`text-center transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <Link
              href="/merchant"
              className="inline-block px-12 py-6 text-xl font-bold bg-white text-neutral-900 rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
            >
              Jetzt als Unternehmen starten
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
