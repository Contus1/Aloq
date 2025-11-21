'use client';

import { useEffect, useRef, useState } from 'react';

const values = [
  {
    title: 'Keine App-Sammlungen mehr',
    description: 'Ein Login für alles: Kaffee, Tisch, Termin, Tickets',
    icon: '🎯',
  },
  {
    title: 'Zwei Klicks zum Ziel',
    description: 'Suchen, tippen, fertig. Kein Anruf, kein Warten',
    icon: '⚡',
  },
  {
    title: 'Deine Stadt, deine Services',
    description: 'Alles lokal, alles verfügbar, alles jetzt',
    icon: '🏙️',
  },
  {
    title: 'Wächst mit dir',
    description: 'Heute Kaffee, morgen Arzt. Aloq erweitert sich mit deinen Bedürfnissen',
    icon: '🌱',
  },
];

export default function ValueProposition() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            values.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-neutral-950">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-20 tracking-tight">
            Warum <span className="gradient-text">Aloq</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group p-8 md:p-10 rounded-3xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800 transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                  visibleCards.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
              >
                <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                  {value.title}
                </h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
