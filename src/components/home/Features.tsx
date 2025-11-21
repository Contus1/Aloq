'use client';

import { useEffect, useRef, useState } from 'react';

const features = [
  {
    title: 'PWA-Technologie',
    description: 'Funktioniert wie eine App, ohne Download-Ballast',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Ein Login, alles drin',
    description: 'Kein Account-Jonglieren mehr',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Universelle Suche',
    description: 'Einfach tippen, was du brauchst. Aloq versteht es',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Sofortaktion',
    description: 'Bestellen und reservieren in Sekunden, nicht Minuten',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Lokale Power',
    description: 'Deine Lieblingsläden, Cafés und Services gebündelt',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Grenzenlos erweiterbar',
    description: 'Neue Branchen, neue Möglichkeiten, eine Plattform',
    gradient: 'from-pink-500 to-rose-500',
  },
];

export default function Features() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures((prev) => [...prev, index]);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-8 tracking-tight">
            Deine <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl md:text-2xl text-center text-neutral-600 dark:text-neutral-400 mb-20 max-w-3xl mx-auto">
            Alles, was du brauchst – in einer Plattform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-8 transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                  visibleFeatures.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  />
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
