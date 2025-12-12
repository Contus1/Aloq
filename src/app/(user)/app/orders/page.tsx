'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// MOCKUP DATA - In Production von API laden via /api/orders?email=user@example.com
const MOCKUP_ORDERS = [
  {
    id: 'ORD-001',
    venueName: 'Café Aurora',
    venueType: 'Café',
    status: 'ready',
    pickupCode: '384917',
    pickupTime: 'Heute, 12:20',
    pickupIn: '4 Min',
    items: [
      { name: 'Latte Macchiato', quantity: 2 },
      { name: 'Croissant', quantity: 1 },
    ],
    total: 1360,
    orderDate: '2025-11-24T12:05:00',
  },
  {
    id: 'ORD-002',
    venueName: 'Backhaus Schmidt',
    venueType: 'Bäckerei',
    status: 'preparing',
    pickupCode: '742891',
    pickupTime: 'Heute, 14:00',
    pickupIn: '1 Std 35 Min',
    items: [
      { name: 'Brötchen Mix', quantity: 6 },
      { name: 'Käsekuchen', quantity: 1 },
    ],
    total: 890,
    orderDate: '2025-11-24T13:10:00',
  },
  {
    id: 'ORD-003',
    venueName: 'Green Bowl',
    venueType: 'Lunch',
    status: 'picked_up',
    pickupCode: '159753',
    pickupTime: 'Gestern, 13:00',
    items: [
      { name: 'Buddha Bowl', quantity: 1 },
      { name: 'Hummus', quantity: 1 },
    ],
    total: 1450,
    orderDate: '2025-11-23T12:50:00',
  },
  {
    id: 'ORD-004',
    venueName: 'Café Aurora',
    venueType: 'Café',
    status: 'picked_up',
    pickupCode: '628374',
    pickupTime: 'Vor 3 Tagen',
    items: [
      { name: 'Cappuccino', quantity: 1 },
    ],
    total: 340,
    orderDate: '2025-11-21T10:30:00',
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('active');

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: 'Eingegangen', variant: 'secondary' as const, pulse: false, icon: undefined },
      paid: { label: 'Bezahlt', variant: 'default' as const, pulse: false, icon: undefined },
      preparing: { label: 'In Vorbereitung', variant: 'default' as const, icon: '👨‍🍳', pulse: false },
      ready: { label: 'Bereit', variant: 'default' as const, icon: '✅', pulse: true },
      picked_up: { label: 'Abgeholt', variant: 'outline' as const, icon: '✨', pulse: false },
      cancelled: { label: 'Storniert', variant: 'destructive' as const, pulse: false, icon: undefined },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const activeOrders = MOCKUP_ORDERS.filter(o => ['preparing', 'ready'].includes(o.status));
  const historyOrders = MOCKUP_ORDERS.filter(o => ['picked_up', 'cancelled'].includes(o.status));

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-bold">Meine Bestellungen</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active" className="relative">
              Aktiv
              {activeOrders.length > 0 && (
                <Badge variant="default" className="ml-2 px-2 py-0 text-xs">
                  {activeOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">Historie</TabsTrigger>
          </TabsList>

          {/* Active Orders */}
          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-bold mb-2">Keine aktiven Bestellungen</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Starte jetzt deine erste Bestellung!
                </p>
                <Button onClick={() => router.push('/app')}>
                  Läden entdecken
                </Button>
              </Card>
            ) : (
              activeOrders.map((order) => {
                const statusInfo = getStatusBadge(order.status);
                return (
                  <Card
                    key={order.id}
                    className="p-6 cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => router.push(`/app/order-success?orderId=${order.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">{order.venueName}</h3>
                          <Badge variant="outline" className="text-xs">
                            {order.venueType}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </p>
                      </div>
                      <Badge
                        variant={statusInfo.variant}
                        className={statusInfo.pulse ? 'animate-pulse' : ''}
                      >
                        {statusInfo.icon && <span className="mr-1">{statusInfo.icon}</span>}
                        {statusInfo.label}
                      </Badge>
                    </div>

                    {/* Pickup Info Highlight */}
                    {order.status === 'ready' && (
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">
                              🎉 Bereit zur Abholung!
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              In {order.pickupIn}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-700 dark:text-green-300 mb-1">
                              Code
                            </p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {order.pickupCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {order.status === 'preparing' && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            Wird gerade vorbereitet...
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Abholung: {order.pickupTime}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-4">
            {historyOrders.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold mb-2">Noch keine abgeschlossenen Bestellungen</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Deine vergangenen Bestellungen erscheinen hier
                </p>
              </Card>
            ) : (
              historyOrders.map((order) => {
                const statusInfo = getStatusBadge(order.status);
                return (
                  <Card
                    key={order.id}
                    className="p-6 cursor-pointer hover:shadow-md transition-all opacity-80 hover:opacity-100"
                    onClick={() => router.push(`/app/order-success?orderId=${order.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{order.venueName}</h3>
                          <Badge variant="outline" className="text-xs">
                            {order.venueType}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </p>
                      </div>
                      <Badge variant={statusInfo.variant}>
                        {statusInfo.icon && <span className="mr-1">{statusInfo.icon}</span>}
                        {statusInfo.label}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
                      <span>{order.pickupTime}</span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {formatPrice(order.total)}
                      </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('MOCKUP: Nochmal bestellen');
                        }}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Nochmal bestellen
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('MOCKUP: Bewertung abgeben');
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </Button>
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
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
            <button className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-xs font-medium">Orders</span>
            </button>
            <button
              onClick={() => router.push('/app/apps')}
              className="flex flex-col items-center gap-1 text-neutral-600 dark:text-neutral-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
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
