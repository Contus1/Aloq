'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const MINI_APPS = [
  {
    id: 'rmv',
    name: 'RMV',
    description: 'ÖPNV-Tickets: Einzelfahrt, Tageskarte & D-Ticket',
    icon: '�',
    category: 'Mobilität',
    status: 'active',
    color: 'from-red-500 to-red-600',
    href: '/app/apps/rmv',
  },
  {
    id: 'kinopolis',
    name: 'Kinopolis',
    description: 'Kinotickets buchen & Sitzplatz wählen',
    icon: '🎬',
    category: 'Entertainment',
    status: 'active',
    color: 'from-purple-500 to-purple-600',
    href: '/app/apps/kinopolis',
  },
  {
    id: 'laundry',
    name: 'Wäsche abholen',
    description: 'Reinigung & Wäscheservice',
    icon: '👔',
    category: 'Services',
    status: 'coming-soon',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    description: 'Friseur, Massage & Spa buchen',
    icon: '💇',
    category: 'Wellness',
    status: 'coming-soon',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 'health',
    name: 'Gesundheit',
    description: 'Arzttermine & Apotheke',
    icon: '🏥',
    category: 'Gesundheit',
    status: 'coming-soon',
    color: 'from-red-500 to-red-600',
  },
  {
    id: 'delivery',
    name: 'Lieferdienste',
    description: 'Essen, Groceries & mehr',
    icon: '🚚',
    category: 'Delivery',
    status: 'coming-soon',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'parking',
    name: 'Parken',
    description: 'Parkplätze finden & buchen',
    icon: '🅿️',
    category: 'Mobilität',
    status: 'coming-soon',
    color: 'from-gray-500 to-gray-600',
  },
  {
    id: 'city-services',
    name: 'Bürgerservices',
    description: 'Termine, Müll, Stadtinfo',
    icon: '🏛️',
    category: 'Stadt',
    status: 'coming-soon',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'sports',
    name: 'Sport & Fitness',
    description: 'Fitnessstudio & Kurse buchen',
    icon: '🏋️',
    category: 'Sport',
    status: 'coming-soon',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'pets',
    name: 'Haustiere',
    description: 'Tierarzt, Grooming & mehr',
    icon: '🐕',
    category: 'Haustiere',
    status: 'coming-soon',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'education',
    name: 'Bildung',
    description: 'Kurse, Nachhilfe & Workshops',
    icon: '📚',
    category: 'Bildung',
    status: 'coming-soon',
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 'home',
    name: 'Handwerker',
    description: 'Reparaturen & Installationen',
    icon: '🔧',
    category: 'Handwerk',
    status: 'coming-soon',
    color: 'from-yellow-500 to-yellow-600',
  },
];

const CATEGORIES = ['Alle', 'Mobilität', 'Services', 'Entertainment', 'Gesundheit', 'Stadt'];

export default function MiniAppsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const filteredApps = MINI_APPS.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-xl font-bold text-white">N</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">Mini-Apps</h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Alle Services in einer App
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              type="text"
              placeholder="Mini-App suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base bg-neutral-100 dark:bg-neutral-800 border-0"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Banner */}
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden relative">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-0">
              Beta
            </Badge>
            <h2 className="text-2xl font-bold mb-2">Die WeChat-Vision für Deutschland</h2>
            <p className="text-blue-100 mb-4">
              Eine App für alles – von Kaffee bis Bürgerservice
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-blue-600 hover:bg-white/90"
            >
              Mehr erfahren
            </Button>
          </div>
          <div className="absolute -right-10 -bottom-10 text-9xl opacity-10">🚀</div>
        </Card>

        {/* Categories */}
        <section>
          <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-3">
            Kategorien
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Mini-Apps Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              {selectedCategory === 'Alle' ? 'Alle Mini-Apps' : selectedCategory}
            </h3>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {filteredApps.length} Apps
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredApps.map((app) => (
              app.href ? (
                <Link key={app.id} href={app.href}>
                  <Card className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] relative overflow-hidden group h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                    <div className="relative">
                      <div className="text-4xl mb-3">{app.icon}</div>
                      <h4 className="font-bold mb-1">{app.name}</h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                        {app.description}
                      </p>
                      <Badge variant={app.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {app.status === 'active' ? '✓ Verfügbar' : 'Bald verfügbar'}
                      </Badge>
                    </div>
                  </Card>
                </Link>
              ) : (
                <Card
                  key={app.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] relative overflow-hidden group"
                  onClick={() => alert(`MOCKUP: ${app.name} öffnen (Coming Soon)`)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative">
                    <div className="text-4xl mb-3">{app.icon}</div>
                    <h4 className="font-bold mb-1">{app.name}</h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                      {app.description}
                    </p>
                    <Badge variant={app.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {app.status === 'active' ? '✓ Verfügbar' : 'Bald verfügbar'}
                    </Badge>
                  </div>
                </Card>
              )
            ))}
          </div>
        </section>

        {/* Info Section */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Was sind Mini-Apps?</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Mini-Apps sind leichtgewichtige Anwendungen, die direkt in Aloq laufen – 
                ohne separate Installation. Inspiriert von WeChat's Mini-Programmen.
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">Keine separate App-Installation nötig</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">Nahtlose Integration in Aloq</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">Ein Login, ein Wallet, alle Services</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Partner werden */}
        <Card className="p-6 text-center">
          <div className="text-4xl mb-3">🤝</div>
          <h3 className="font-bold text-lg mb-2">Du möchtest Partner werden?</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Bringe deinen Service als Mini-App zu tausenden Nutzern
          </p>
          <Button>
            Jetzt bewerben
          </Button>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 safe-area-inset-bottom">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <button
              onClick={() => router.push('/app')}
              className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => router.push('/app/orders')}
              className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-xs font-medium">Orders</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-xs font-medium">Apps</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium">Profil</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
