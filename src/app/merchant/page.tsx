export default function MerchantPage() {
  const stats = [
    { label: 'Heute', value: '0', subtitle: 'Buchungen' },
    { label: 'Diese Woche', value: '0', subtitle: 'Bestellungen' },
    { label: 'Umsatz', value: '0€', subtitle: 'Diese Woche' },
    { label: 'No-Show Rate', value: '0%', subtitle: 'Letzte 30 Tage' },
  ];

  return (
    <div className="container-custom py-12">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Willkommen zurück! 👋
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Verwalte dein Business und erreiche mehr Kunden
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all"
            >
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                {stat.label}
              </div>
              <div className="text-4xl font-bold mb-1 gradient-text">{stat.value}</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-500">{stat.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Letzte Buchungen</h2>
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
              Neue Buchung
            </button>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center">
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">
              Noch keine Buchungen vorhanden
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              Sobald Kunden dein Geschäft über Aloq finden, erscheinen die Buchungen hier
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Schnellaktionen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Öffnungszeiten anpassen', icon: '🕐' },
              { title: 'Menü bearbeiten', icon: '📋' },
              { title: 'Marketing-Tools', icon: '📊' },
            ].map((action, i) => (
              <button
                key={i}
                className="p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:scale-105 transition-all text-left"
              >
                <div className="text-4xl mb-4">{action.icon}</div>
                <h3 className="text-xl font-bold">{action.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
