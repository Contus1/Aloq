'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const MOCK_CONNECTIONS = [
  {
    id: 'c1',
    from: 'Frankfurt (Main) Hbf',
    to: 'Offenbach Marktplatz',
    departure: '12:05',
    arrival: '12:17',
    duration: '12 min',
    line: 'S8',
    platform: 'Gleis 103',
    status: 'Pünktlich',
    occupancy: 'Entspannt',
  },
  {
    id: 'c2',
    from: 'Frankfurt (Main) Hbf',
    to: 'Wiesbaden Hbf',
    departure: '12:12',
    arrival: '12:53',
    duration: '41 min',
    line: 'RE 13',
    platform: 'Gleis 18',
    status: '2 min später',
    occupancy: 'Viele Sitzplätze',
  },
  {
    id: 'c3',
    from: 'Offenbach Marktplatz',
    to: 'Frankfurt (Main) Hbf',
    departure: '12:20',
    arrival: '12:34',
    duration: '14 min',
    line: 'S9',
    platform: 'Gleis 2',
    status: 'Pünktlich',
    occupancy: 'Normal',
  },
  {
    id: 'c4',
    from: 'Frankfurt (Main) Hbf',
    to: 'Hanau Hbf',
    departure: '12:28',
    arrival: '12:46',
    duration: '18 min',
    line: 'RB 49',
    platform: 'Gleis 12',
    status: 'Pünktlich',
    occupancy: 'Locker',
  },
];

export default function RMVTicketPage() {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState('tageskarte');
  const [selectedZone, setSelectedZone] = useState('Zone 50');
  const [from, setFrom] = useState('Frankfurt (Main) Hbf');
  const [to, setTo] = useState('Offenbach Marktplatz');
  const [time, setTime] = useState('Jetzt');
  const [connections, setConnections] = useState(MOCK_CONNECTIONS);

  const currentTicket = TICKET_OPTIONS.find((t) => t.id === selectedTicket);

  const handlePurchase = () => {
    // MockUp: Weiterleitung zur Zahlungsseite
    alert('🎫 Ticket wird gekauft...\n\n(Dies ist ein MockUp - keine echte Zahlung)');
    setTimeout(() => {
      router.push('/app/orders');
    }, 1000);
  };

  const handleConnectionSearch = () => {
    const fromQuery = from.trim().toLowerCase();
    const toQuery = to.trim().toLowerCase();

    const filtered = MOCK_CONNECTIONS.filter((conn) => {
      const matchesFrom = !fromQuery || conn.from.toLowerCase().includes(fromQuery);
      const matchesTo = !toQuery || conn.to.toLowerCase().includes(toQuery);
      return matchesFrom && matchesTo;
    });

    setConnections(filtered.length ? filtered : MOCK_CONNECTIONS);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
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
        {/* Connection Finder */}
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-300 font-semibold">RMV Mock</p>
              <h2 className="text-xl font-bold">Nächste Verbindungen finden</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Fiktive Daten zur Demo – inkl. Status & Auslastung.</p>
            </div>
            <Badge className="bg-neutral-900 text-white">AI generiertes Banner</Badge>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="from">Von</Label>
              <Input
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Frankfurt (Main) Hbf"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="to">Nach</Label>
              <Input
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Offenbach Marktplatz"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="block">Abfahrt</Label>
              <div className="flex flex-wrap gap-2">
                {['Jetzt', '+15 Min', '+30 Min'].map((slot) => (
                  <Button
                    key={slot}
                    variant={time === slot ? 'default' : 'outline'}
                    onClick={() => setTime(slot)}
                    size="sm"
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Demo: Schnellste Verbindungen inkl. Verspätung & Gleisangabe · Slot: {time}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSwap}>
                Orte tauschen
              </Button>
              <Button size="sm" onClick={handleConnectionSearch}>
                Verbindungen finden
              </Button>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {connections.map((connection) => (
              <Card key={connection.id} className="p-4 border border-blue-100/60 dark:border-blue-800/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-700 dark:text-blue-200">
                      {connection.line}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{connection.from} → {connection.to}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {connection.platform} • {connection.occupancy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{connection.status}</Badge>
                    <Badge variant="outline">{connection.duration}</Badge>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-bold">{connection.departure}</span>
                    <span className="text-neutral-400">→</span>
                    <span className="font-mono text-lg font-bold">{connection.arrival}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-blue-600 dark:text-blue-300">
                    Ticket dazu holen
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

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
