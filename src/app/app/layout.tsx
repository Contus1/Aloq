import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aloq App - Deine lokalen Services',
  description: 'Finde und buche alles in deiner Stadt',
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">Aloq</h1>
            <nav className="flex items-center gap-6">
              <button className="text-sm font-medium hover:text-indigo-600 transition-colors">
                Suche
              </button>
              <button className="text-sm font-medium hover:text-indigo-600 transition-colors">
                Bestellungen
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
