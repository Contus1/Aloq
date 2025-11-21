'use client';

import { useEffect, useRef, useState } from 'react';

const principles = [
  {
    title: 'Barrierefrei von Grund auf',
    description: 'Hohe Kontraste, klare Sprache, für alle nutzbar',
    icon: '♿',
  },
  {
    title: 'Transparenter Datenschutz',
    description: 'DSGVO-konform, keine Tricks, keine versteckten Klauseln',
    icon: '🔒',
  },
  {
    title: 'Energieeffiziente Technologie',
    description: 'Optimierte Medien, minimaler Code, maximale Performance',
    icon: '🌿',
  },
  {
    title: 'Nutzerwohl zuerst',
    description: 'Keine Dark Patterns, keine Manipulation, nur ehrliche UX',
    icon: '❤️',
  },
];

export default function Ethics() {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-neutral-950">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className={`text-5xl md:text-7xl font-bold mb-6 tracking-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Ethik & <span className="gradient-text">Nachhaltigkeit</span>
            </h2>
            <p
              className={`text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-300 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Wir bauen für Menschen, nicht gegen sie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {principles.map((principle, index) => (
              <div
                key={index}
                className={`p-8 md:p-10 rounded-3xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-700 hover:scale-105 ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : index % 2 === 0
                      ? 'opacity-0 -translate-x-12'
                      : 'opacity-0 translate-x-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl mb-6">{principle.icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                  {principle.title}
                </h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
