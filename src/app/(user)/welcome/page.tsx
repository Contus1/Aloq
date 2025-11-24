'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const CITIES = [
  { value: 'kleinstadt-a', label: 'Kleinstadt A', status: 'active' },
  { value: 'kleinstadt-b', label: 'Kleinstadt B', status: 'beta' },
  { value: 'berlin', label: 'Berlin', status: 'coming-soon' },
];

export default function WelcomePage() {
  const router = useRouter();
  const [city, setCity] = useState<string>('');

  const handleContinue = () => {
    router.push('/app');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Branding */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg mb-4">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Aloq</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Alles in deiner Stadt. Sofort.
          </p>
        </div>

        {/* Simple City Selection */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Wähle deine Stadt
            </h2>
            <p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
              Aloq ist gerade in diesen Städten verfügbar
            </p>
          </div>

          <Select onValueChange={setCity} value={city}>
            <SelectTrigger className="w-full h-14 text-base">
              <SelectValue placeholder="Stadt auswählen..." />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  <div className="flex items-center justify-between w-full gap-3">
                    <span>{c.label}</span>
                    {c.status === 'active' && (
                      <Badge variant="default" className="ml-auto">
                        Verfügbar
                      </Badge>
                    )}
                    {c.status === 'beta' && (
                      <Badge variant="secondary" className="ml-auto">
                        Beta
                      </Badge>
                    )}
                    {c.status === 'coming-soon' && (
                      <Badge variant="outline" className="ml-auto">
                        Bald
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {city && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-sm text-blue-900 dark:text-blue-100">
                    <p className="font-medium mb-1">
                      {CITIES.find((c) => c.value === city)?.label} ist{' '}
                      {CITIES.find((c) => c.value === city)?.status === 'active'
                        ? 'verfügbar'
                        : 'in der Beta-Phase'}
                    </p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Aktuell 8 Locations verfügbar
                    </p>
                  </div>
                </div>
              </Card>

              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full h-14 text-base"
              >
                Los geht's!
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-neutral-500 dark:text-neutral-600 space-y-2">
          <p>Made in Germany 🇩🇪</p>
          <div className="flex items-center justify-center gap-4">
            <button className="hover:text-neutral-900 dark:hover:text-neutral-100">
              Datenschutz
            </button>
            <span>•</span>
            <button className="hover:text-neutral-900 dark:hover:text-neutral-100">
              Impressum
            </button>
            <span>•</span>
            <a 
              href="/merchant/login"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Für Betreiber
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
