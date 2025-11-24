'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  category: string;
  tags: string[];
  available: boolean;
}

interface Venue {
  id: string;
  name: string;
  type: string;
  description: string;
  rating: number;
  pickup_slot_minutes: number;
  items_by_category: Record<string, MenuItem[]>;
}

interface CartItem {
  item: MenuItem;
  quantity: number;
  size?: string;
  milk?: string;
}

// MockUp Data for local venues
const MOCKUP_VENUES: Record<string, Venue> = {
  '00000000-0000-0000-0000-000000000002': {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Backhaus Schmidt',
    type: 'Bäckerei',
    description: 'Frische Backwaren seit 1985',
    rating: 4.9,
    pickup_slot_minutes: 15,
    items_by_category: {
      'Brötchen': [
        { id: 'b1', name: 'Weizenbrötchen', description: 'Klassisches Weizenbrötchen', price_cents: 45, category: 'Brötchen', tags: ['beliebt'], available: true },
        { id: 'b2', name: 'Körnerbrötchen', description: 'Mit Sonnenblumenkernen', price_cents: 65, category: 'Brötchen', tags: ['vollkorn'], available: true },
        { id: 'b3', name: 'Laugenbrötchen', description: 'Frisch gebacken', price_cents: 75, category: 'Brötchen', tags: ['laugen'], available: true },
      ],
      'Brote': [
        { id: 'br1', name: 'Bauernbrot', description: '500g, Roggenmischbrot', price_cents: 350, category: 'Brote', tags: ['regional'], available: true },
        { id: 'br2', name: 'Vollkornbrot', description: '750g, mit Körnern', price_cents: 420, category: 'Brote', tags: ['vollkorn'], available: true },
      ],
      'Kuchen': [
        { id: 'k1', name: 'Apfelkuchen', description: 'Stück, mit Sahne', price_cents: 280, category: 'Kuchen', tags: ['beliebt'], available: true },
        { id: 'k2', name: 'Käsekuchen', description: 'Cremig, klassisch', price_cents: 320, category: 'Kuchen', tags: ['sahne'], available: true },
        { id: 'k3', name: 'Donut', description: 'Mit Zuckerguss', price_cents: 180, category: 'Kuchen', tags: ['süß'], available: true },
      ],
    },
  },
  '00000000-0000-0000-0000-000000000003': {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Blumen Müller',
    type: 'Blumenladen',
    description: 'Frische Blumen aus der Region',
    rating: 4.7,
    pickup_slot_minutes: 30,
    items_by_category: {
      'Sträuße': [
        { id: 'bl1', name: 'Rosenstrauß', description: '12 rote Rosen', price_cents: 2490, category: 'Sträuße', tags: ['beliebt', 'romantisch'], available: true },
        { id: 'bl2', name: 'Frühlingsstrauß', description: 'Bunte Mischung', price_cents: 1890, category: 'Sträuße', tags: ['frühling'], available: true },
        { id: 'bl3', name: 'Tulpenstrauß', description: '15 bunte Tulpen', price_cents: 1590, category: 'Sträuße', tags: ['frühling'], available: true },
      ],
      'Einzelblumen': [
        { id: 'bl4', name: 'Rose', description: 'Einzelne rote Rose', price_cents: 290, category: 'Einzelblumen', tags: ['romantisch'], available: true },
        { id: 'bl5', name: 'Sonnenblume', description: 'Große Sonnenblume', price_cents: 350, category: 'Einzelblumen', tags: ['sommer'], available: true },
      ],
      'Topfpflanzen': [
        { id: 'bl6', name: 'Orchidee', description: 'Weiß, im Topf', price_cents: 1290, category: 'Topfpflanzen', tags: ['pflegeleicht'], available: true },
        { id: 'bl7', name: 'Kaktus Mix', description: '3er Set kleine Kakteen', price_cents: 890, category: 'Topfpflanzen', tags: ['pflegeleicht'], available: true },
      ],
    },
  },
};

export default function VenueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchVenue(params.id as string);
    }
  }, [params.id]);

  const fetchVenue = async (id: string) => {
    try {
      // Check if we have mockup data for this venue
      if (MOCKUP_VENUES[id]) {
        setVenue(MOCKUP_VENUES[id]);
        setLoading(false);
        return;
      }
      
      // Otherwise try API
      const response = await fetch(`/api/venues/${id}`);
      const data = await response.json();
      setVenue(data);
    } catch (error) {
      console.error('Error fetching venue:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === itemId);
      if (!existing) return prev;
      
      if (existing.quantity > 1) {
        return prev.map((c) =>
          c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c
        );
      }
      return prev.filter((c) => c.item.id !== itemId);
    });
  };

  const getItemQuantity = (itemId: string) => {
    return cart.find((c) => c.item.id === itemId)?.quantity || 0;
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item, i) => {
          if (i === index) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const getTotalCents = () => {
    return cart.reduce((sum, item) => sum + item.item.price_cents * item.quantity, 0);
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Venue nicht gefunden</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-lg font-bold">{venue.name}</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-48 bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
        <span className="text-8xl">
          {venue.type === 'Bäckerei' ? '🥖' : venue.type === 'Blumenladen' ? '💐' : venue.type === 'Café' ? '☕' : '🏪'}
        </span>
      </div>

      {/* Venue Info */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{venue.name}</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                {venue.description}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-5 h-5 text-yellow-500 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{venue.rating}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary">
              {venue.type}
            </Badge>
            <Badge variant="outline">
              Pickup {venue.pickup_slot_minutes} Min
            </Badge>
            <Badge variant="default">Open until 18:00</Badge>
          </div>
        </Card>
      </div>

      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {Object.entries(venue.items_by_category).map(([category, items]) => (
          <section key={category}>
            <h3 className="text-lg font-bold mb-4 sticky top-20 bg-neutral-50 dark:bg-neutral-950 py-2 z-10">
              {category}
            </h3>
            <div className="space-y-3">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-base">{item.name}</h4>
                        {item.tags.includes('beliebt') && (
                          <Badge variant="default" className="text-xs">
                            ⭐ Beliebt
                          </Badge>
                        )}
                        {item.tags.includes('neu') && (
                          <Badge variant="secondary" className="text-xs">
                            🆕 Neu
                          </Badge>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <p className="font-bold text-lg">
                        {formatPrice(item.price_cents)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getItemQuantity(item.id) === 0 ? (
                        <Button 
                          size="sm" 
                          onClick={() => addToCart(item)}
                          className="whitespace-nowrap"
                        >
                          Hinzufügen
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            -
                          </Button>
                          <span className="font-bold text-lg px-2 min-w-[2rem] text-center">
                            {getItemQuantity(item.id)}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => addToCart(item)}
                            className="h-8 w-8 p-0"
                          >
                            +
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 safe-area-inset-bottom">
          <Button
            size="lg"
            className="w-full max-w-7xl mx-auto"
            onClick={() => router.push(`/app/checkout?venue=${venue.id}`)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                  <span className="text-sm font-bold">{cart.length}</span>
                </div>
                <span>Warenkorb</span>
              </div>
              <span className="font-bold">{formatPrice(getTotalCents())}</span>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
