'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TICKET_OPTIONS = [
  {
    id: 'einzelfahrt',
    name: 'Einzelfahrt',
    description: 'Eine Fahrt innerhalb der gewählten Zone',
    price: 3.50,
    validity: '2 Stunden',
    zones: ['Zone 50', 'Zone 55', 'Alle Zonen'],
  },
  {
    id: 'tageskarte',
    name: 'Tageskarte',
    description: 'Unbegrenzte Fahrten für einen Tag',
    price: 9.90,
    validity: 'Bis 5 Uhr am Folgetag',
    zones: ['Zone 50', 'Zone 55', 'Alle Zonen'],
    popular: true,
  },
  {
    id: 'deutschland-ticket',
    name: 'Deutschland-Ticket',
    description: 'Deutschlandweit mit Bus und Bahn fahren',
    price: 49.00,
    validity: '1 Monat (Abo)',
    badge: 'Monatlich kündbar',
  },
];

export default function RMVTicketPage() {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState('tageskarte');
  const [selectedZone, setSelectedZone] = useState('Zone 50');

  const currentTicket = TICKET_OPTIONS.find((t) => t.id === selectedTicket);

  const handlePurchase = () => {
    // MockUp: Weiterleitung zur Zahlungsseite
    alert('🎫 Ticket wird gekauft...\n\n(Dies ist ein MockUp - keine echte Zahlung)');
    setTimeout(() => {
      router.push('/app/orders');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/app/apps">
              <Button variant="ghost" size="icon">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">🚉</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">RMV</h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Rhein-Main-Verkehrsverbund</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 pb-24 space-y-6">
        {/* Info Banner */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-medium">🎫 Digitales Ticket direkt auf dem Handy</p>
              <p className="text-blue-700 dark:text-blue-300 mt-1">Nach dem Kauf erhältst du einen QR-Code zum Vorzeigen.</p>
            </div>
          </div>
        </Card>

        {/* Ticket Auswahl */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Ticket auswählen</h2>
          
          <RadioGroup value={selectedTicket} onValueChange={setSelectedTicket}>
            <div className="space-y-3">
              {TICKET_OPTIONS.map((ticket) => (
                <label key={ticket.id} htmlFor={ticket.id} className="cursor-pointer">
                  <Card className={`p-5 transition-all ${selectedTicket === ticket.id ? 'ring-2 ring-blue-600 border-blue-600' : 'hover:border-neutral-300 dark:hover:border-neutral-600'}`}>
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value={ticket.id} id={ticket.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{ticket.name}</h3>
                          {ticket.popular && (
                            <Badge variant="default" className="bg-blue-600">Beliebt</Badge>
                          )}
                          {ticket.badge && (
                            <Badge variant="secondary">{ticket.badge}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                          {ticket.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="text-xs text-neutral-500">Gültigkeit</div>
                              <div className="text-sm font-semibold">{ticket.validity}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-black text-blue-600">
                              {ticket.price.toFixed(2)}€
                            </div>
                            {ticket.id === 'deutschland-ticket' && (
                              <div className="text-xs text-neutral-500">pro Monat</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </label>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Zonen Auswahl (nur für Einzelfahrt und Tageskarte) */}
        {currentTicket?.zones && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Tarifzone</h2>
            <RadioGroup value={selectedZone} onValueChange={setSelectedZone}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentTicket.zones.map((zone) => (
                  <label key={zone} htmlFor={zone} className="cursor-pointer">
                    <Card className={`p-4 text-center transition-all ${selectedZone === zone ? 'ring-2 ring-blue-600 border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'hover:border-neutral-300 dark:hover:border-neutral-600'}`}>
                      <RadioGroupItem value={zone} id={zone} className="sr-only" />
                      <div className="font-semibold">{zone}</div>
                      {zone === 'Alle Zonen' && (
                        <div className="text-xs text-neutral-500 mt-1">+2,00€</div>
                      )}
                    </Card>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Zusammenfassung */}
        <Card className="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
          <h3 className="font-bold text-lg mb-4">Zusammenfassung</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Ticket</span>
              <span className="font-semibold">{currentTicket?.name}</span>
            </div>
            {currentTicket?.zones && (
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Zone</span>
                <span className="font-semibold">{selectedZone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Gültigkeit</span>
              <span className="font-semibold">{currentTicket?.validity}</span>
            </div>
            <div className="h-px bg-neutral-200 dark:bg-neutral-700 my-3"></div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Gesamt</span>
              <span className="font-black text-2xl text-blue-600">
                {currentTicket && selectedZone === 'Alle Zonen' && currentTicket.zones
                  ? (currentTicket.price + 2).toFixed(2)
                  : currentTicket?.price.toFixed(2)}€
              </span>
            </div>
          </div>
        </Card>

        {/* Info zu Deutschland-Ticket */}
        {selectedTicket === 'deutschland-ticket' && (
          <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-amber-900 dark:text-amber-100">
                <p className="font-medium">Abo-Information</p>
                <p className="text-amber-700 dark:text-amber-300 mt-1">
                  Das Deutschland-Ticket verlängert sich automatisch monatlich. Du kannst jederzeit zum Monatsende kündigen.
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 p-4">
        <div className="max-w-3xl mx-auto">
          <Button 
            onClick={handlePurchase}
            size="lg" 
            className="w-full h-14 text-lg"
          >
            Jetzt kaufen • {currentTicket && selectedZone === 'Alle Zonen' && currentTicket.zones
              ? (currentTicket.price + 2).toFixed(2)
              : currentTicket?.price.toFixed(2)}€
          </Button>
          <p className="text-xs text-center text-neutral-500 mt-2">
            Nach dem Kauf erhältst du dein Ticket sofort als QR-Code
          </p>
        </div>
      </div>
    </div>
  );
}
