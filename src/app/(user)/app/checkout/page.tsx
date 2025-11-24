'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// MOCKUP: Stripe Elements würde hier integriert werden
// import { Elements, PaymentElement } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const venueId = searchParams.get('venue');
  const { cart, getTotalCents, clearCart } = useCart();

  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [pickupTime, setPickupTime] = useState('15');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  const getPickupTimeOptions = () => {
    const now = new Date();
    return [
      { value: '15', label: `In 15 Min (${new Date(now.getTime() + 15 * 60000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })})` },
      { value: '30', label: `In 30 Min (${new Date(now.getTime() + 30 * 60000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })})` },
      { value: '45', label: `In 45 Min (${new Date(now.getTime() + 45 * 60000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })})` },
      { value: '60', label: `In 1 Std (${new Date(now.getTime() + 60 * 60000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })})` },
    ];
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // MOCKUP DATA - Ersetzen mit echter API
      const mockOrderId = `ORD-${Date.now()}`;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production: Call /api/orders with cart data
      // const response = await fetch('/api/orders', { method: 'POST', body: JSON.stringify({...}) });
      
      clearCart();
      router.push(`/app/order-success?orderId=${mockOrderId}`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Zahlung fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold mb-2">Dein Warenkorb ist leer</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Füge zuerst Items zu deinem Warenkorb hinzu
          </p>
          <Button onClick={() => router.push('/app')}>Zurück zur Übersicht</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-bold">Checkout</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Order Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Deine Bestellung</h2>
          <div className="space-y-3">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">
                    {item.quantity}x {item.item.name}
                  </p>
                  {(item.size || item.milk) && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {item.size && `Größe: ${item.size}`}
                      {item.size && item.milk && ' • '}
                      {item.milk && `Milch: ${item.milk}`}
                    </p>
                  )}
                </div>
                <p className="font-semibold">
                  {formatPrice(item.item.price_cents * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Gesamt</span>
            <span>{formatPrice(getTotalCents())}</span>
          </div>
        </Card>

        {/* Pickup Time Selection */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Abholzeit wählen</h2>
          <RadioGroup value={pickupTime} onValueChange={setPickupTime}>
            {getPickupTimeOptions().map((option) => (
              <div key={option.value} className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value={option.value} id={`time-${option.value}`} />
                <Label htmlFor={`time-${option.value}`} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Kontaktdaten</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Max Mustermann"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail *</Label>
              <Input
                id="email"
                type="email"
                placeholder="max@example.com"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon (optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+49 123 456789"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* Payment Method - MOCKUP */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Zahlungsmethode</h2>
          
          {/* MOCKUP: Stripe Elements würde hier sein */}
          <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-8 text-center space-y-4">
            <div className="text-4xl">💳</div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <strong>MOCKUP:</strong> Stripe Elements Integration
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                 Pay
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                G Pay
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                💳 Karte
              </Badge>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-1">Sichere Zahlung mit Stripe</p>
                <p className="text-blue-700 dark:text-blue-300">
                  Deine Zahlungsdaten werden verschlüsselt übertragen und nicht gespeichert
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Note */}
        <p className="text-xs text-center text-neutral-600 dark:text-neutral-400 px-4">
          Mit deiner Bestellung akzeptierst du unsere{' '}
          <button className="underline hover:text-neutral-900 dark:hover:text-neutral-100">
            AGB
          </button>{' '}
          und{' '}
          <button className="underline hover:text-neutral-900 dark:hover:text-neutral-100">
            Datenschutzerklärung
          </button>
        </p>
      </main>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 safe-area-inset-bottom">
        <Button
          size="lg"
          className="w-full max-w-3xl mx-auto"
          onClick={handleCheckout}
          disabled={isProcessing || !contactInfo.name || !contactInfo.email}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              Zahlung wird verarbeitet...
            </>
          ) : (
            <>
              Jetzt bezahlen • {formatPrice(getTotalCents())}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
