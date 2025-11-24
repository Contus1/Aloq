'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// MOCKUP DATA - In Production von API laden
const MOCKUP_ORDER = {
  id: 'ORD-123456',
  pickupCode: '384917',
  venueName: 'Café Aurora',
  venueAddress: 'Hauptstraße 42, 12345 Kleinstadt A',
  pickupTime: '12:20',
  pickupDate: 'Heute',
  status: 'preparing', // pending, paid, preparing, ready, picked_up
  items: [
    { name: 'Latte Macchiato', quantity: 2, price: 680 },
    { name: 'Croissant', quantity: 1, price: 220 },
  ],
  total: 1360,
  orderTime: '12:05',
};

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState(MOCKUP_ORDER);
  const [showShareSheet, setShowShareSheet] = useState(false);

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      pending: { label: 'Eingegangen', icon: '📝', color: 'bg-neutral-500' },
      paid: { label: 'Bezahlt', icon: '✅', color: 'bg-green-500' },
      preparing: { label: 'In Vorbereitung', icon: '👨‍🍳', color: 'bg-blue-500' },
      ready: { label: 'Bereit zur Abholung', icon: '🎉', color: 'bg-green-500' },
      picked_up: { label: 'Abgeholt', icon: '✨', color: 'bg-neutral-400' },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const shareOrder = async () => {
    // MOCKUP: Web Share API oder Custom Share Sheet
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meine Bestellung bei ' + order.venueName,
          text: `Ich hab gerade bei ${order.venueName} bestellt! 🎉\nAbhol-Code: ${order.pickupCode}\nAbholzeit: ${order.pickupDate}, ${order.pickupTime}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      setShowShareSheet(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-neutral-50 dark:from-green-950/20 dark:to-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/app')}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 className="text-lg font-bold">Bestellung bestätigt</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Success Animation */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
            <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Danke, Max!</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Deine Bestellung ist in Vorbereitung
          </p>
        </div>

        {/* Pickup Code - HERO */}
        <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            DEIN ABHOL-CODE
          </p>
          <div className="text-6xl font-bold tracking-wider mb-4 text-blue-600 dark:text-blue-400">
            {order.pickupCode}
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-6">
            Zeige diesen Code bei der Abholung vor
          </p>

          {/* QR Code MOCKUP */}
          <div className="inline-flex items-center justify-center w-48 h-48 bg-white dark:bg-neutral-900 rounded-xl border-2 border-blue-300 dark:border-blue-700">
            <div className="text-center space-y-2">
              <div className="text-4xl">📱</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                <strong>MOCKUP:</strong> QR-Code
              </p>
            </div>
          </div>
        </Card>

        {/* Pickup Info */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Abholung</h3>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {order.pickupDate}, {order.pickupTime} Uhr
              </p>
              <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  {order.venueName}
                </p>
                <p>{order.venueAddress}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-6">Status</h3>
          <div className="space-y-6">
            {[
              { status: 'paid', label: 'Bestellung eingegangen', time: order.orderTime, completed: true },
              { status: 'preparing', label: 'In Vorbereitung', time: '~5 Min', completed: order.status !== 'paid', active: order.status === 'preparing' },
              { status: 'ready', label: 'Bereit zur Abholung', time: order.pickupTime, completed: ['ready', 'picked_up'].includes(order.status), active: order.status === 'ready' },
              { status: 'picked_up', label: 'Abgeholt', time: '', completed: order.status === 'picked_up' },
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      step.completed
                        ? 'bg-green-500 text-white'
                        : step.active
                        ? 'bg-blue-500 text-white animate-pulse'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400'
                    }`}
                  >
                    {step.completed ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                    )}
                  </div>
                  {index < 3 && (
                    <div
                      className={`w-0.5 h-12 mt-2 ${
                        step.completed ? 'bg-green-500' : 'bg-neutral-200 dark:bg-neutral-700'
                      }`}
                    ></div>
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <p className={`font-semibold ${step.active ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    {step.label}
                  </p>
                  {step.time && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {step.time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Deine Bestellung</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-neutral-600 dark:text-neutral-400">
                  {item.quantity}x {item.name}
                </p>
                <p className="font-medium">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center font-bold text-lg">
            <span>Gesamt</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </Card>

        {/* Loyalty Card MOCKUP */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl">🎯</div>
            <div>
              <h3 className="font-semibold text-lg">Stempelkarte</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Noch 5 Kaffee bis zum Freigetränk!
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i <= 5
                    ? 'bg-purple-500 text-white'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400'
                }`}
              >
                {i <= 5 ? '☕' : i}
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={shareOrder}
            className="w-full"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Teilen
          </Button>
          <Button
            size="lg"
            onClick={() => router.push('/app/orders')}
            className="w-full"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Meine Bestellungen
          </Button>
        </div>

        {/* Support */}
        <div className="text-center pt-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Fragen zu deiner Bestellung?
          </p>
          <Button variant="link" size="sm">
            Kontaktiere {order.venueName} →
          </Button>
        </div>
      </main>
    </div>
  );
}
