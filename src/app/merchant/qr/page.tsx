'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

// MOCKUP DATA
const VENUE_ID = 'venue-123';
const VENUE_NAME = 'Café Zeitgeist';

export default function MerchantQRPage() {
  const router = useRouter();
  const [tableNumber, setTableNumber] = useState('1');
  const [qrSize, setQrSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [includeTableNumber, setIncludeTableNumber] = useState(true);

  // MOCKUP: QR Code URL
  const qrUrl = `https://aloq.app/order/${VENUE_ID}?table=${tableNumber}`;

  const handleDownloadQR = (format: 'png' | 'svg' | 'pdf') => {
    // MOCKUP: Download functionality
    alert(`MOCKUP: QR-Code wird als ${format.toUpperCase()} heruntergeladen...\nURL: ${qrUrl}`);
  };

  const handlePrintQR = () => {
    // MOCKUP: Print functionality
    window.print();
  };

  const handleBulkGenerate = () => {
    // MOCKUP: Bulk QR generation
    alert('MOCKUP: QR-Codes für alle Tische werden generiert (1-20)');
  };

  const qrSizeMap = {
    small: 200,
    medium: 300,
    large: 400,
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
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
              <h1 className="text-lg font-bold">QR-Codes für Tische</h1>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {VENUE_NAME}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Settings */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">QR-Code Generator</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="table">Tischnummer</Label>
                  <Input
                    id="table"
                    type="number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="1"
                    min="1"
                  />
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    QR-Code für Tisch #{tableNumber}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Größe</Label>
                  <div className="flex gap-2">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setQrSize(size)}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          qrSize === size
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-sm font-semibold capitalize">{size}</div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400">
                          {qrSizeMap[size]}px
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="includeTable"
                    checked={includeTableNumber}
                    onChange={(e) => setIncludeTableNumber(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600"
                  />
                  <Label htmlFor="includeTable" className="cursor-pointer">
                    Tischnummer auf QR-Code anzeigen
                  </Label>
                </div>
              </div>
            </Card>

            {/* Download Options */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Download</h2>
              <div className="space-y-3">
                <Button
                  onClick={() => handleDownloadQR('png')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Als PNG herunterladen
                  <Badge variant="secondary" className="ml-auto">Empfohlen</Badge>
                </Button>

                <Button
                  onClick={() => handleDownloadQR('svg')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Als SVG herunterladen
                  <Badge variant="secondary" className="ml-auto">Vektoren</Badge>
                </Button>

                <Button
                  onClick={() => handleDownloadQR('pdf')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Als PDF herunterladen
                  <Badge variant="secondary" className="ml-auto">Drucken</Badge>
                </Button>

                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <Button
                    onClick={handlePrintQR}
                    className="w-full"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Direkt drucken
                  </Button>
                </div>
              </div>
            </Card>

            {/* Bulk Generation */}
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Bulk-Generierung</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Erstelle QR-Codes für alle Tische auf einmal
                  </p>
                  <Button
                    onClick={handleBulkGenerate}
                    variant="outline"
                    className="bg-white text-purple-600 hover:bg-white/90 border-0"
                  >
                    QR-Codes für alle Tische
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Vorschau</h2>

              <div className="bg-white dark:bg-neutral-900 rounded-lg p-8 flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700">
                {/* MOCKUP QR Code */}
                <div
                  className="bg-white rounded-lg shadow-lg p-6 print:shadow-none"
                  style={{ width: 'fit-content' }}
                >
                  {includeTableNumber && (
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-neutral-900">Tisch #{tableNumber}</h3>
                      <p className="text-sm text-neutral-600">{VENUE_NAME}</p>
                    </div>
                  )}

                  {/* MOCKUP: QR Code placeholder */}
                  <div
                    className="bg-neutral-100 rounded-lg flex items-center justify-center"
                    style={{ width: qrSizeMap[qrSize], height: qrSizeMap[qrSize] }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-2">📱</div>
                      <p className="text-xs text-neutral-500 font-mono break-all px-4">
                        **MOCKUP QR**
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-xs text-neutral-600 mb-1">Scannen & Bestellen</p>
                    <p className="text-xs text-neutral-400 font-mono">{qrUrl}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Usage Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Statistiken (heute)</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">QR-Scans</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Tisch #{tableNumber}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">23</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Bestellungen</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Von diesem Tisch</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">8</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Umsatz</p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">Von diesem Tisch</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">67,20€</span>
                </div>
              </div>
            </Card>

            {/* Info */}
            <Card className="p-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <div className="flex gap-3">
                <div className="text-amber-600 dark:text-amber-400 mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Tipp für beste Ergebnisse</h4>
                  <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                    <li>• Drucke QR-Codes auf mindestens 5x5cm</li>
                    <li>• Laminiere die Aufsteller für längere Haltbarkeit</li>
                    <li>• Platziere sie gut sichtbar auf dem Tisch</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:shadow-none,
          .print\\:shadow-none * {
            visibility: visible;
          }
          .print\\:shadow-none {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
}
