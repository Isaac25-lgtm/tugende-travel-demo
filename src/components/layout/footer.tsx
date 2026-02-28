'use client';

import Link from 'next/link';
import { MapPin, Heart, Mail } from 'lucide-react';

const footerLinks = {
  discover: [
    { href: '/explore', label: 'Explore Destinations' },
    { href: '/map', label: 'Interactive Map' },
    { href: '/best-time', label: 'Best Time to Visit' },
  ],
  plan: [
    { href: '/planner', label: 'AI Trip Planner' },
    { href: '/budget', label: 'Safari Budget Calculator' },
  ],
  about: [
    { href: 'mailto:info@tugende.ug', label: 'Contact Us', external: true },
    { href: '/privacy', label: 'Privacy Policy', external: false },
    { href: '/terms', label: 'Terms of Service', external: false },
  ],
};

export function Footer() {
  return (
    <footer className="bg-bg-dark text-text-on-dark">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold">Tugende</span>
            </div>
            <p className="text-text-on-dark/60 text-sm leading-relaxed max-w-xs">
              Discover Uganda intelligently. Plan based on your style and budget. Decide with visual confidence.
            </p>
          </div>

          {/* Discover Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Discover</h3>
            <ul className="space-y-2.5">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-on-dark/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Plan</h3>
            <ul className="space-y-2.5">
              {footerLinks.plan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-on-dark/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="text-text-on-dark/60 hover:text-gold text-sm transition-colors inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-text-on-dark/60 hover:text-gold text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-on-dark/40 text-sm">
            &copy; {new Date().getFullYear()} Tugende. Discover Uganda intelligently.
          </p>
          <p className="text-text-on-dark/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for Uganda
          </p>
        </div>
      </div>
    </footer>
  );
}
