import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aloq Merchant - Dein Business Dashboard',
  description: 'Verwalte Buchungen, Bestellungen und dein Geschäft',
};

export default function MerchantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <header className="sticky top-0 z-50 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold gradient-text">Aloq</h1>
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
                Merchant
              </span>
            </div>
            <nav className="flex items-center gap-6">
              <button className="text-sm font-medium hover:text-indigo-600 transition-colors">
                Dashboard
              </button>
              <button className="text-sm font-medium hover:text-indigo-600 transition-colors">
                Buchungen
              </button>
              <button className="text-sm font-medium hover:text-indigo-600 transition-colors">
                Einstellungen
              </button>
              <button className="text-sm font-medium hover:text-indigo-600 transition-colors">
                Profil
              </button>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
