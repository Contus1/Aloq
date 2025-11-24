'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MOVIES = [
  {
    id: 'dune-2',
    title: 'Dune: Part Two',
    description: 'Paul Atreides vereint sich mit Chani und den Fremen',
    duration: '166 Min',
    rating: '12',
    genre: 'Sci-Fi, Action',
    poster: '🏜️',
    times: ['18:00', '20:30', '23:00'],
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    description: 'Das Leben von J. Robert Oppenheimer',
    duration: '180 Min',
    rating: '12',
    genre: 'Drama, Biografie',
    poster: '💥',
    times: ['17:30', '21:00'],
    popular: true,
  },
  {
    id: 'barbie',
    title: 'Barbie',
    description: 'Barbie und Ken in der realen Welt',
    duration: '114 Min',
    rating: '6',
    genre: 'Komödie, Fantasy',
    poster: '💖',
    times: ['16:00', '18:30', '21:00'],
  },
  {
    id: 'mission-impossible',
    title: 'Mission: Impossible',
    description: 'Ethan Hunt auf seiner gefährlichsten Mission',
    duration: '163 Min',
    rating: '12',
    genre: 'Action, Thriller',
    poster: '🎯',
    times: ['19:00', '21:45'],
  },
];

const SEATS = {
  rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  seatsPerRow: 12,
  occupied: ['D5', 'D6', 'D7', 'E5', 'E6', 'E7', 'F6', 'F7'],
};

export default function KinopolisPage() {
  const router = useRouter();
  const [step, setStep] = useState<'movie' | 'time' | 'seats'>('movie');
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const currentMovie = MOVIES.find((m) => m.id === selectedMovie);
  const ticketPrice = 12.50;

  const handleSeatClick = (seat: string) => {
    if (SEATS.occupied.includes(seat)) return;
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < 8) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const handleBooking = () => {
    alert(`🎬 Buchung erfolgreich!\n\n${selectedSeats.length}x ${currentMovie?.title}\n${selectedTime} Uhr\nSitze: ${selectedSeats.join(', ')}\n\n(Dies ist ein MockUp - keine echte Buchung)`);
    setTimeout(() => {
      router.push('/app/orders');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/app/apps">
              <Button variant="ghost" size="icon">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">🎬</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">Kinopolis</h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Kleinstadt A</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 pb-32 space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {['Film', 'Zeit', 'Sitze'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                (step === 'movie' && i === 0) || (step === 'time' && i === 1) || (step === 'seats' && i === 2)
                  ? 'bg-purple-600 text-white'
                  : i < (['movie', 'time', 'seats'].indexOf(step))
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
              }`}>
                <span className="text-sm font-semibold">{i + 1}</span>
                <span className="text-sm hidden sm:inline">{label}</span>
              </div>
              {i < 2 && (
                <svg className="w-6 h-6 text-neutral-300 dark:text-neutral-700 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Film auswählen */}
        {step === 'movie' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Wähle deinen Film</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {MOVIES.map((movie) => (
                <Card
                  key={movie.id}
                  className={`p-5 cursor-pointer transition-all ${
                    selectedMovie === movie.id
                      ? 'ring-2 ring-purple-600 border-purple-600'
                      : 'hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                  onClick={() => setSelectedMovie(movie.id)}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-20 h-28 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-4xl">
                      {movie.poster}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                          {movie.popular && (
                            <Badge variant="default" className="bg-purple-600 mb-2">🔥 Beliebt</Badge>
                          )}
                        </div>
                        <Badge variant="outline">FSK {movie.rating}</Badge>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                        {movie.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span>🎭 {movie.genre}</span>
                        <span>⏱️ {movie.duration}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => setStep('time')}
              disabled={!selectedMovie}
              size="lg"
              className="w-full"
            >
              Weiter zur Zeitauswahl
            </Button>
          </div>
        )}

        {/* Step 2: Zeit wählen */}
        {step === 'time' && currentMovie && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => setStep('movie')}
              className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück
            </button>

            <div>
              <h2 className="text-2xl font-bold mb-2">{currentMovie.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">Wähle deine Vorstellung</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Heute, 24. November 2025</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {currentMovie.times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedTime === time
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    <div className="text-xl font-bold">{time}</div>
                    <div className="text-xs text-neutral-500 mt-1">Verfügbar</div>
                  </button>
                ))}
              </div>
            </div>

            <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-purple-900 dark:text-purple-100">
                  <p className="font-medium">Ticket-Preis: {ticketPrice.toFixed(2)}€ pro Person</p>
                  <p className="text-purple-700 dark:text-purple-300 mt-1">Snacks & Getränke können nach der Buchung hinzugefügt werden.</p>
                </div>
              </div>
            </Card>

            <Button
              onClick={() => setStep('seats')}
              disabled={!selectedTime}
              size="lg"
              className="w-full"
            >
              Weiter zur Sitzplatzwahl
            </Button>
          </div>
        )}

        {/* Step 3: Sitze wählen */}
        {step === 'seats' && currentMovie && selectedTime && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => setStep('time')}
              className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück
            </button>

            <div>
              <h2 className="text-2xl font-bold mb-2">Wähle deine Sitze</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                {currentMovie.title} • {selectedTime} Uhr
              </p>
            </div>

            {/* Leinwand */}
            <div className="text-center">
              <div className="inline-block bg-gradient-to-b from-neutral-300 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 px-20 py-3 rounded-t-3xl">
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">🎬 LEINWAND</span>
              </div>
            </div>

            {/* Sitzplan */}
            <div className="overflow-x-auto pb-4">
              <div className="inline-block min-w-full">
                {SEATS.rows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 text-center font-semibold text-neutral-500">{row}</div>
                    <div className="flex gap-2">
                      {Array.from({ length: SEATS.seatsPerRow }, (_, i) => {
                        const seatId = `${row}${i + 1}`;
                        const isOccupied = SEATS.occupied.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);

                        return (
                          <button
                            key={seatId}
                            onClick={() => handleSeatClick(seatId)}
                            disabled={isOccupied}
                            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                              isOccupied
                                ? 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed'
                                : isSelected
                                ? 'bg-purple-600 text-white scale-110'
                                : 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 border border-green-300 dark:border-green-700'
                            }`}
                          >
                            {!isOccupied && !isSelected && '💺'}
                            {isSelected && '✓'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legende */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"></div>
                <span>Frei</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-600"></div>
                <span>Ausgewählt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-neutral-300 dark:bg-neutral-700"></div>
                <span>Belegt</span>
              </div>
            </div>

            {selectedSeats.length > 0 && (
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Ausgewählte Sitze</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">{selectedSeats.join(', ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-purple-600">
                      {(selectedSeats.length * ticketPrice).toFixed(2)}€
                    </div>
                    <div className="text-xs text-neutral-500">{selectedSeats.length}x {ticketPrice.toFixed(2)}€</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>

      {/* Fixed Bottom CTA */}
      {step === 'seats' && selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 p-4">
          <div className="max-w-5xl mx-auto">
            <Button
              onClick={handleBooking}
              size="lg"
              className="w-full h-14 text-lg"
            >
              Jetzt buchen • {(selectedSeats.length * ticketPrice).toFixed(2)}€
            </Button>
            <p className="text-xs text-center text-neutral-500 mt-2">
              Du erhältst deine Tickets sofort nach der Zahlung
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
