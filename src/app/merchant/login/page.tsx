'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MerchantLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // MOCKUP: In Production würde hier Supabase Auth verwendet werden
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: credentials.email,
      //   password: credentials.password,
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // MOCKUP: Demo-Login für Testing
      if (credentials.email && credentials.password) {
        router.push('/merchant/dashboard');
      } else {
        alert('Bitte E-Mail und Passwort eingeben');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login fehlgeschlagen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Branding */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Nuvra Merchant</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Verwalte dein Geschäft, Bestellungen und Menü
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="dein@cafe.de"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-neutral-600 dark:text-neutral-400">
                  Angemeldet bleiben
                </span>
              </label>
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => alert('MOCKUP: Passwort zurücksetzen')}
              >
                Passwort vergessen?
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Wird angemeldet...
                </>
              ) : (
                'Anmelden'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-1">Demo-Account</p>
                <p className="text-blue-700 dark:text-blue-300 text-xs">
                  Gib beliebige E-Mail und Passwort ein zum Testen
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Noch kein Account?{' '}
            <button
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              onClick={() => alert('MOCKUP: Registrierung öffnen')}
            >
              Jetzt registrieren
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-neutral-500 dark:text-neutral-600">
          <p>© 2025 Aloq • Merchant Portal</p>
        </div>
      </div>
    </div>
  );
}
