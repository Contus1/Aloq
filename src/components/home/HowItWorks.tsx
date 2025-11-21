'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Öffnen',
    description: 'App starten, einloggen, suchen',
  },
  {
    number: '02',
    title: 'Finden',
    description: '„Cappuccino" oder „Tisch 19:00" eingeben',
  },
  {
    number: '03',
    title: 'Fertig',
    description: 'Bestellen, reservieren, abholen. Sofort.',
  },
];

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-20 text-white tracking-tight">
            So einfach geht's
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  visibleSteps.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
              >
                {/* Connecting line (hidden on mobile, shown on md+) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-white/30 -z-10">
                    <div
                      className={`h-full bg-white transition-all duration-1000 ${
                        visibleSteps.includes(index + 1) ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-10 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-8xl font-bold text-white/30 mb-6">{step.number}</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-xl text-white/90 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
