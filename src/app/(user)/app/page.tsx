'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'coffee', label: 'Kaffee', icon: '☕' },
  { id: 'breakfast', label: 'Frühstück', icon: '🥐' },
  { id: 'lunch', label: 'Lunch', icon: '🥗' },
  { id: 'bakery', label: 'Bäckerei', icon: '🥖' },
  { id: 'dinner', label: 'Heute Abend', icon: '🍽️' },
];

const RECOMMENDED_SPOTS = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Café Aurora',
    type: 'Café',
    description: 'Third-wave Espresso & Croissants',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    badges: ['Beliebt', 'AI generiertes Bild'],
    distance: '0.3 km',
    rating: 4.8,
    pickupTime: '10-15 Min',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Backhaus Schmidt',
    type: 'Bäckerei',
    description: 'Frische Backwaren & Sauerteig seit 1985',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    badges: ['Frische Backwaren', 'AI generiertes Bild'],
    distance: '0.5 km',
    rating: 4.9,
    pickupTime: '15-20 Min',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Blumen Müller',
    type: 'Blumenladen',
    description: 'Frische Sträuße & Greenery to-go',
    image: 'https://images.unsplash.com/photo-1469536000970-8f1423a10774?auto=format&fit=crop&w=1200&q=80',
    badges: ['Lokal', 'AI generiertes Bild'],
    distance: '0.7 km',
    rating: 4.7,
    pickupTime: '20-30 Min',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Green Bowl',
    type: 'Lunch',
    description: 'Bowls, Greens & Haus-Dressings',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
    badges: ['Beliebt', 'AI generiertes Bild'],
    distance: '0.8 km',
    rating: 4.7,
    pickupTime: '20-25 Min',
  },
];

export default function UserHomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">Aloq</h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Kleinstadt A
                </p>
              </div>
            </div>
            <button className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Search Bar */}
          <Link href="/app/search" className="block">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <div className="pl-10 h-12 flex items-center text-base bg-neutral-100 dark:bg-neutral-800 border-0 rounded-lg text-neutral-600 dark:text-neutral-400">
                Wonach suchst du?
              </div>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Categories */}
        <section>
          <h2 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-4">
            Kategorien
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className="flex-shrink-0 px-4 py-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-blue-500 transition-all"
              >
                <span className="mr-2">{category.icon}</span>
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Recommended Spots */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Empfohlene Spots</h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Alle ansehen
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RECOMMENDED_SPOTS.map((spot) => (
              <Link key={spot.id} href={`/app/venue/${spot.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-neutral-200/70 dark:border-neutral-800/60">
                  <div
                    className="relative h-44"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(15,15,20,0.05) 0%, rgba(15,15,20,0.65) 100%), url(${spot.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-[11px] bg-white/90 text-neutral-900 border-neutral-200">
                        AI Bild
                      </Badge>
                      {spot.badges.slice(0, 1).map((badge, i) => (
                        <Badge
                          key={i}
                          variant={badge === 'Beliebt' ? 'default' : 'secondary'}
                          className="text-[11px]"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-1 drop-shadow-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide">{spot.type}</span>
                        <div className="flex items-center gap-1 text-xs font-semibold">
                          <svg
                            className="w-4 h-4 text-yellow-300 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{spot.rating}</span>
                        </div>
                      </div>
                      <p className="text-lg font-bold leading-tight">{spot.name}</p>
                      <p className="text-sm text-white/90 line-clamp-2">{spot.description}</p>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {spot.pickupTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {spot.distance}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {spot.type}
                    </Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-bold mb-4">Schnellzugriff</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/app/apps">
              <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <span className="text-xl">🎫</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Mini-Apps</h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Alle Services
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/app/orders">
              <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <span className="text-xl">📦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Meine Bestellungen</h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      2 aktiv
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 safe-area-inset-bottom z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <Link href="/app" className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link href="/app/orders" className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="text-xs font-medium">Orders</span>
            </Link>
            <Link href="/app/apps" className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="text-xs font-medium">Apps</span>
            </Link>
            <Link href="/app/search" className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-xs font-medium">Suche</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
