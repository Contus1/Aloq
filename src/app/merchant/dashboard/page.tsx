'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// MOCKUP DATA - In Production von API laden
const MOCKUP_STATS = {
  ordersToday: 23,
  avgBasket: 1240,
  revenue: 28520,
  nextPickup: {
    code: '384917',
    time: '12:18',
    name: 'Max M.',
    items: ['2x Latte', '1x Croissant'],
  },
};

const MOCKUP_RECENT_ORDERS = [
  { id: '001', code: '384917', name: 'Max M.', time: '12:18', status: 'preparing', total: 1360 },
  { id: '002', code: '742891', name: 'Anna S.', time: '12:25', status: 'paid', total: 890 },
  { id: '003', code: '159753', name: 'Peter K.', time: '12:30', status: 'paid', total: 1450 },
];

export default function MerchantDashboardPage() {
  const router = useRouter();

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold">Café Aurora</h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Merchant Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <Badge variant="secondary" className="text-xs">
                +12%
              </Badge>
            </div>
            <p className="text-2xl font-bold">{MOCKUP_STATS.ordersToday}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Orders heute
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <Badge variant="secondary" className="text-xs">
                +8%
              </Badge>
            </div>
            <p className="text-2xl font-bold">{formatPrice(MOCKUP_STATS.avgBasket)}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Ø Warenkorb
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Badge variant="secondary" className="text-xs">
                +18%
              </Badge>
            </div>
            <p className="text-2xl font-bold">{formatPrice(MOCKUP_STATS.revenue)}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Umsatz heute
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Badge variant="default" className="text-xs animate-pulse">
                Live
              </Badge>
            </div>
            <p className="text-2xl font-bold">{MOCKUP_STATS.nextPickup.time}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Nächste Abholung
            </p>
          </Card>
        </div>

        {/* Next Pickup Highlight */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="default" className="animate-pulse">
                  In Vorbereitung
                </Badge>
                <Badge variant="outline">
                  Code: {MOCKUP_STATS.nextPickup.code}
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">
                🔥 Nächste Abholung: {MOCKUP_STATS.nextPickup.time} Uhr
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                Kunde: <span className="font-semibold">{MOCKUP_STATS.nextPickup.name}</span>
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {MOCKUP_STATS.nextPickup.items.join(', ')}
              </p>
            </div>
            <Button size="lg" onClick={() => router.push('/merchant/orders')}>
              Details ansehen →
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
            onClick={() => router.push('/merchant/orders')}
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Live Orders</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Bestellungen verwalten
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
            onClick={() => router.push('/merchant/menu')}
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30">
                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Menü</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Produkte bearbeiten
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
            onClick={() => router.push('/merchant/payouts')}
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Auszahlungen</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Finanzen & Payouts
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
            onClick={() => router.push('/merchant/qr')}
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-pink-100 dark:bg-pink-900/30">
                <svg className="w-7 h-7 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">QR-Codes</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Tisch-Bestellungen
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Orders Preview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Aktuelle Bestellungen</h3>
            <Button variant="outline" size="sm" onClick={() => router.push('/merchant/orders')}>
              Alle ansehen →
            </Button>
          </div>

          <div className="space-y-3">
            {MOCKUP_RECENT_ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                onClick={() => router.push('/merchant/orders')}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                      {order.time}
                    </p>
                    <Badge
                      variant={order.status === 'preparing' ? 'default' : 'secondary'}
                      className="text-xs mt-1"
                    >
                      {order.status === 'preparing' ? 'In Vorbereitung' : 'Bezahlt'}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-semibold">{order.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Code: {order.code}
                    </p>
                  </div>
                </div>
                <p className="font-bold">{formatPrice(order.total)}</p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
