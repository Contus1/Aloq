import Link from 'next/link';

const footerLinks = [
  { title: 'Datenschutz', href: '/privacy' },
  { title: 'Nutzungsbedingungen', href: '/terms' },
  { title: 'Kontakt', href: '/contact' },
  { title: 'Barrierefreiheit', href: '/accessibility' },
  { title: 'Nachhaltigkeit', href: '/sustainability' },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 dark:bg-black text-neutral-300 py-16 border-t border-neutral-800">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Logo and tagline */}
          <div className="mb-12 text-center">
            <h3 className="text-5xl font-bold mb-4 gradient-text">Aloq</h3>
            <p className="text-xl text-neutral-400">Alles in deiner Stadt. Eine App.</p>
          </div>

          {/* Links */}
          <nav className="mb-12">
            <ul className="flex flex-wrap justify-center gap-8 text-lg">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <div className="text-center text-neutral-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Aloq. Alle Rechte vorbehalten.</p>
            <p className="mt-2">
              Gebaut mit ❤️ für eine bessere, zugänglichere und nachhaltigere digitale Welt.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
