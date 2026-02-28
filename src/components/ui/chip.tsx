'use client';

import { cn } from '@/lib/utils/cn';

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export function Chip({ children, selected = false, onClick, className, icon }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium',
        'transition-all duration-200 cursor-pointer',
        'min-h-[44px]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        selected
          ? 'bg-primary text-white shadow-md'
          : 'bg-surface text-text-secondary border border-gray-200 hover:border-primary hover:text-primary',
        className
      )}
    >
      {icon}
      {children}
    </button>
  );
}
