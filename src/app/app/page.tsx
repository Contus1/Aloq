export default function AppPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Search Hero */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Was suchst du <span className="gradient-text">heute</span>?
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="z.B. Cappuccino, Tisch 19:00, Friseur morgen..."
              className="w-full px-8 py-6 text-lg rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none bg-white dark:bg-neutral-800 transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
              Suchen
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Beliebte Aktionen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['☕ Kaffee', '🍕 Essen', '✂️ Friseur', '🎫 Tickets'].map((action, i) => (
              <button
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:scale-105 transition-all text-center font-semibold"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Letzte Bestellungen</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-2">
                Noch keine Bestellungen
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                Starte deine erste Suche und entdecke lokale Services!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
