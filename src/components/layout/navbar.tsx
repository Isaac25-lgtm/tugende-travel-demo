'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Compass, Calculator, Calendar, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUIStore } from '@/store/ui-store';

const navLinks = [
  { href: '/planner', label: 'Plan My Trip', icon: Sparkles },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/map', label: 'Map', icon: MapPin },
  { href: '/budget', label: 'Budget', icon: Calculator },
  { href: '/best-time', label: 'Best Time', icon: Calendar },
];

export function Navbar() {
  const { isScrolled, setIsScrolled, isMobileMenuOpen, setMobileMenuOpen } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span
                className={cn(
                  'font-display text-xl font-bold tracking-tight transition-colors',
                  isScrolled ? 'text-primary' : 'text-white'
                )}
              >
                Tugende
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isScrolled
                      ? 'text-text-secondary hover:text-primary hover:bg-bg-light'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/planner"
                className="ml-2 px-4 py-2 rounded-lg bg-gold text-bg-dark text-sm font-semibold hover:bg-gold-light transition-colors"
              >
                Start Planning
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'md:hidden p-2 rounded-lg transition-colors',
                isScrolled ? 'text-text-primary hover:bg-bg-light' : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-white/90 hover:text-gold text-xl font-medium transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/planner"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 rounded-lg bg-gold text-bg-dark text-lg font-semibold hover:bg-gold-light transition-colors"
              >
                Start Planning
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
