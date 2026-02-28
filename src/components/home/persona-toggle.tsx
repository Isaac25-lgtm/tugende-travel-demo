'use client';

import { motion } from 'framer-motion';
import { Globe, Home } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUIStore } from '@/store/ui-store';

export function PersonaToggle() {
  const { persona, setPersona } = useUIStore();

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center bg-surface rounded-full p-1 shadow-card border border-gray-100">
        <button
          onClick={() => setPersona('international')}
          className={cn(
            'relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer',
            persona === 'international' ? 'text-white' : 'text-text-secondary hover:text-text-primary'
          )}
        >
          {persona === 'international' && (
            <motion.div
              layoutId="persona-bg"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          )}
          <Globe className="w-4 h-4 relative z-10" />
          <span className="relative z-10">International Visitor</span>
        </button>
        <button
          onClick={() => setPersona('ugandan')}
          className={cn(
            'relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer',
            persona === 'ugandan' ? 'text-white' : 'text-text-secondary hover:text-text-primary'
          )}
        >
          {persona === 'ugandan' && (
            <motion.div
              layoutId="persona-bg"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          )}
          <Home className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Ugandan Explorer</span>
        </button>
      </div>
    </div>
  );
}
