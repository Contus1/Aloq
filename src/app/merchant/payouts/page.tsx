'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// MOCKUP DATA - In Production von API laden
const MOCKUP_PAYOUTS = [
  {
    id: '1',
    date: '2025-11-20',
    amount: 2852000, // in cents
    status: 'completed',
    orders: 127,
    fees: 85560,
    reference: 'PO-2025-11-001',
  },
  {
    id: '2',
    date: '2025-11-13',
    amount: 3124000,
    status: 'completed',
    orders: 142,
    fees: 93720,
    reference: 'PO-2025-10-004',
  },
  {
    id: '3',
    date: '2025-11-06',
    amount: 2689000,
    status: 'completed',
    orders: 118,
    fees: 80670,
    reference: 'PO-2025-10-003',
  },
  {
    id: '4',
    date: '2025-10-30',
    amount: 3456000,
    status: 'completed',
    orders: 156,
    fees: 103680,
    reference: 'PO-2025-10-002',
  },
  {
    id: '5',
    date: '2025-10-23',
    amount: 2987000,
    status: 'completed',
    orders: 134,
    fees: 89610,
    reference: 'PO-2025-10-001',
  },
];

const CURRENT_BALANCE = 1678500; // in cents
const PENDING_ORDERS = 89;
const NEXT_PAYOUT_DATE = '2025-11-27';

interface Payout {
  id: string;
  date: string;
  amount: number;
  status: string;
  orders: number;
  fees: number;
  reference: string;
}

export default function MerchantPayoutsPage() {
  const router = useRouter();
  const [payouts] = useState<Payout[]>(MOCKUP_PAYOUTS);
  const [timeFilter, setTimeFilter] = useState('all');

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr));
  };

  const handleExportCSV = () => {
    // MOCKUP: CSV Export
    const csv = [
      ['Datum', 'Referenz', 'Bestellungen', 'Brutto', 'Gebühren', 'Netto', 'Status'].join(';'),
      ...payouts.map(p => [
        p.date,
        p.reference,
        p.orders,
        formatPrice(p.amount + p.fees),
        formatPrice(p.fees),
        formatPrice(p.amount),
        p.status,
      ].join(';'))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auszahlungen-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-bold">Auszahlungen</h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Automatische wöchentliche Auszahlung
                </p>
              </div>
            </div>

            <Button onClick={handleExportCSV} variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CSV Export
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Balance Card */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm opacity-90 mb-1">Aktuelles Guthaben</p>
                <p className="text-3xl font-bold">{formatPrice(CURRENT_BALANCE)}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="opacity-90">{PENDING_ORDERS} ausstehende Bestellungen</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Nächste Auszahlung</p>
                <p className="text-2xl font-bold">{formatDate(NEXT_PAYOUT_DATE)}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Automatisch auf dein Konto
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Letzte 30 Tage</p>
                <p className="text-2xl font-bold">
                  {formatPrice(payouts.slice(0, 4).reduce((sum, p) => sum + p.amount, 0))}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {payouts.slice(0, 4).reduce((sum, p) => sum + p.orders, 0)} Bestellungen
            </p>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Auszahlungshistorie</h2>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle anzeigen</SelectItem>
              <SelectItem value="30">Letzte 30 Tage</SelectItem>
              <SelectItem value="90">Letzte 90 Tage</SelectItem>
              <SelectItem value="year">Dieses Jahr</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payouts Table - Desktop */}
        <Card className="p-6 hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left py-3 px-4 font-semibold">Datum</th>
                  <th className="text-left py-3 px-4 font-semibold">Referenz</th>
                  <th className="text-right py-3 px-4 font-semibold">Bestellungen</th>
                  <th className="text-right py-3 px-4 font-semibold">Brutto</th>
                  <th className="text-right py-3 px-4 font-semibold">Gebühren</th>
                  <th className="text-right py-3 px-4 font-semibold">Netto</th>
                  <th className="text-center py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((payout) => (
                  <tr
                    key={payout.id}
                    className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold">{formatDate(payout.date)}</p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          KW {new Date(payout.date).getWeek()}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                        {payout.reference}
                      </code>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold">{payout.orders}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {formatPrice(payout.amount + payout.fees)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-red-600 dark:text-red-400">
                        -{formatPrice(payout.fees)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {formatPrice(payout.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                        ✓ Ausgezahlt
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Payouts Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {payouts.map((payout) => (
            <Card key={payout.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{formatDate(payout.date)}</p>
                  <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                    {payout.reference}
                  </code>
                </div>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                  ✓ Ausgezahlt
                </Badge>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Bestellungen:</span>
                  <span className="font-semibold">{payout.orders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Brutto:</span>
                  <span>{formatPrice(payout.amount + payout.fees)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Gebühren:</span>
                  <span className="text-red-600 dark:text-red-400">-{formatPrice(payout.fees)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="font-semibold">Netto:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{formatPrice(payout.amount)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="p-6 mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg h-fit">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Wie funktionieren Auszahlungen?</h3>
              <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• Automatische wöchentliche Auszahlung jeden Mittwoch</li>
                <li>• Gebühr: 3% + 0,30€ pro Transaktion</li>
                <li>• Auszahlung dauert 1-2 Werktage</li>
                <li>• Minimum-Betrag: 10,00€</li>
              </ul>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

// Helper: Get ISO week number
declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function() {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};
