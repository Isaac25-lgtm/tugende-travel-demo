'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface WizardOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
}

interface WizardStepProps {
  title: string;
  subtitle: string;
  options: WizardOption[];
  selected: string | string[] | undefined;
  onSelect: (value: string) => void;
  multiSelect?: boolean;
  direction: number;
}

export function WizardStep({ title, subtitle, options, selected, onSelect, multiSelect = false, direction }: WizardStepProps) {
  const isSelected = (value: string) => {
    if (multiSelect && Array.isArray(selected)) {
      return selected.includes(value);
    }
    return selected === value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
          {title}
        </h2>
        <p className="mt-2 text-text-secondary text-base">
          {subtitle}
        </p>
      </div>

      <div className={cn(
        'grid gap-3',
        options.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' :
        options.length <= 4 ? 'grid-cols-2' :
        'grid-cols-2 sm:grid-cols-3'
      )}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            role={multiSelect ? 'checkbox' : 'radio'}
            aria-checked={isSelected(option.value)}
            aria-label={option.description ? `${option.label}: ${option.description}` : option.label}
            className={cn(
              'relative flex flex-col items-center gap-2 p-4 md:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer',
              'min-h-[80px] text-center',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
              isSelected(option.value)
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 bg-surface hover:border-primary/40 hover:shadow-sm'
            )}
          >
            {option.image && (
              <div className="w-full h-20 rounded-lg overflow-hidden mb-1">
                <img src={option.image} alt={option.label} className="w-full h-full object-cover" />
              </div>
            )}
            {option.icon && (
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                isSelected(option.value) ? 'bg-primary text-white' : 'bg-bg-light text-text-secondary'
              )}>
                {option.icon}
              </div>
            )}
            <span className={cn(
              'font-medium text-sm md:text-base transition-colors',
              isSelected(option.value) ? 'text-primary' : 'text-text-primary'
            )}>
              {option.label}
            </span>
            {option.description && (
              <span className="text-xs text-text-muted leading-tight">
                {option.description}
              </span>
            )}
            {isSelected(option.value) && (
              <motion.div
                layoutId="selected-indicator"
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </button>
        ))}
      </div>

      {multiSelect && (
        <p className="text-center text-xs text-text-muted mt-3">Select all that apply</p>
      )}
    </motion.div>
  );
}
