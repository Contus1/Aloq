import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aloq - Alles in deiner Stadt. Eine App.',
  description:
    'Schluss mit App-Chaos. Aloq bringt dir lokale Services direkt auf den Screen – vom Cappuccino bis zum Tisch.',
  keywords: ['aloq', 'local services', 'booking', 'reservation', 'pwa'],
  authors: [{ name: 'Aloq' }],
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
        {children}
      </body>
    </html>
  );
}
