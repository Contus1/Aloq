'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// MOCKUP DATA
const MOCKUP_VENUES = [
  {
    id: '1',
    name: 'Café Zeitgeist',
    category: 'Café',
    rating: 4.8,
    distance: 0.3,
    pickupTime: 15,
    image: '☕',
    tags: ['beliebt', 'bio'],
    openUntil: '20:00',
    priceRange: '€€',
  },
  {
    id: '2',
    name: 'Backhaus Schmidt',
    category: 'Bäckerei',
    rating: 4.6,
    distance: 0.5,
    pickupTime: 10,
    image: '🥖',
    tags: ['neu'],
    openUntil: '18:00',
    priceRange: '€',
  },
  {
    id: '3',
    name: 'Burger König',
    category: 'Burger',
    rating: 4.5,
    distance: 1.2,
    pickupTime: 20,
    image: '🍔',
    tags: ['beliebt'],
    openUntil: '23:00',
    priceRange: '€€',
  },
  {
    id: '4',
    name: 'Pizza Paradiso',
    category: 'Pizza',
    rating: 4.7,
    distance: 0.8,
    pickupTime: 25,
    image: '🍕',
    tags: [],
    openUntil: '22:00',
    priceRange: '€€',
  },
  {
    id: '5',
    name: 'Sushi Samurai',
    category: 'Sushi',
    rating: 4.9,
    distance: 1.5,
    pickupTime: 30,
    image: '🍣',
    tags: ['beliebt', 'premium'],
    openUntil: '21:00',
    priceRange: '€€€',
  },
  {
    id: '6',
    name: 'Smoothie Bar',
    category: 'Getränke',
    rating: 4.4,
    distance: 0.6,
    pickupTime: 5,
    image: '🥤',
    tags: ['neu', 'vegan'],
    openUntil: '19:00',
    priceRange: '€',
  },
];

const MOCKUP_ITEMS = [
  {
    id: 'item-1',
    name: 'Latte Macchiato',
    venue: 'Café Zeitgeist',
    venueId: '1',
    category: 'Getränke',
    price: 340,
    image: '☕',
    tags: ['beliebt'],
  },
  {
    id: 'item-2',
    name: 'Croissant',
    venue: 'Backhaus Schmidt',
    venueId: '2',
    category: 'Gebäck',
    price: 220,
    image: '🥐',
    tags: ['neu'],
  },
  {
    id: 'item-3',
    name: 'Cheeseburger',
    venue: 'Burger König',
    venueId: '3',
    category: 'Burger',
    price: 890,
    image: '🍔',
    tags: ['beliebt'],
  },
  {
    id: 'item-4',
    name: 'Margherita Pizza',
    venue: 'Pizza Paradiso',
    venueId: '4',
    category: 'Pizza',
    price: 950,
    image: '🍕',
    tags: [],
  },
  {
    id: 'item-5',
    name: 'Rainbow Roll',
    venue: 'Sushi Samurai',
    venueId: '5',
    category: 'Sushi',
    price: 1290,
    image: '🍣',
    tags: ['premium'],
  },
];

const CATEGORIES = ['Alle', 'Café', 'Bäckerei', 'Burger', 'Pizza', 'Sushi', 'Getränke'];
const PRICE_RANGES = ['Alle', '€', '€€', '€€€'];
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevanz' },
  { value: 'distance', label: 'Entfernung' },
  { value: 'rating', label: 'Bewertung' },
  { value: 'pickup', label: 'Schnellste Abholung' },
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'venues' | 'items'>('venues');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedPrice, setSelectedPrice] = useState('Alle');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [openNowOnly, setOpenNowOnly] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  // Filter & Sort Logic
  let filteredVenues = MOCKUP_VENUES.filter((venue) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || venue.category === selectedCategory;
    const matchesPrice = selectedPrice === 'Alle' || venue.priceRange === selectedPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  let filteredItems = MOCKUP_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort
  if (sortBy === 'distance') {
    filteredVenues.sort((a, b) => a.distance - b.distance);
  } else if (sortBy === 'rating') {
    filteredVenues.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'pickup') {
    filteredVenues.sort((a, b) => a.pickupTime - b.pickupTime);
  }

  const resultCount = activeTab === 'venues' ? filteredVenues.length : filteredItems.length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-24">
      {/* Header with Search */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1 relative">
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
                placeholder="Suche nach Locations oder Produkten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base bg-neutral-100 dark:bg-neutral-800 border-0"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-lg transition-colors ${
                showFilters
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('venues')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'venues'
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              Locations ({filteredVenues.length})
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'items'
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              Produkte ({filteredItems.length})
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 animate-in slide-in-from-top-2">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              {/* Category Filter */}
              <div>
                <p className="text-sm font-semibold mb-2">Kategorie</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter (Venues only) */}
              {activeTab === 'venues' && (
                <div>
                  <p className="text-sm font-semibold mb-2">Preisklasse</p>
                  <div className="flex gap-2">
                    {PRICE_RANGES.map((price) => (
                      <button
                        key={price}
                        onClick={() => setSelectedPrice(price)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedPrice === price
                            ? 'bg-blue-600 text-white'
                            : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort & Toggles */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Sortieren:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 border-0 text-sm"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={openNowOnly}
                    onChange={(e) => setOpenNowOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">Nur jetzt geöffnet</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Results Header */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-1">
              {resultCount} {resultCount === 1 ? 'Ergebnis' : 'Ergebnisse'} für "{searchQuery}"
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {activeTab === 'venues' ? 'Locations' : 'Produkte'} in deiner Nähe
            </p>
          </div>
        )}

        {/* Empty State */}
        {resultCount === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Keine Ergebnisse gefunden</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Versuche es mit anderen Suchbegriffen oder passe deine Filter an
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Alle');
              setSelectedPrice('Alle');
            }}>
              Filter zurücksetzen
            </Button>
          </Card>
        )}

        {/* Venues Results */}
        {activeTab === 'venues' && filteredVenues.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVenues.map((venue) => (
              <Link key={venue.id} href={`/app/venue/${venue.id}`}>
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-xl flex items-center justify-center text-3xl">
                      {venue.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{venue.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <span>⭐ {venue.rating}</span>
                        <span>•</span>
                        <span>{venue.distance} km</span>
                        <span>•</span>
                        <span>{venue.priceRange}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {venue.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Offen bis {venue.openUntil}
                    </Badge>
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Abholzeit:</span>
                    <span className="font-semibold">~{venue.pickupTime} Min</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Items Results */}
        {activeTab === 'items' && filteredItems.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Link key={item.id} href={`/app/venue/${item.venueId}`}>
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center text-3xl">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{item.name}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                        {item.venue}
                      </p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  {item.tags.length > 0 && (
                    <div className="flex gap-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Popular Searches */}
        {!searchQuery && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Beliebte Suchen</h3>
            <div className="flex flex-wrap gap-2">
              {['Kaffee', 'Frühstück', 'Pizza', 'Burger', 'Sushi', 'Vegan', 'Glutenfrei', 'Bio'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full text-sm font-medium transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav Spacer */}
      <div className="h-20" />
    </div>
  );
}
