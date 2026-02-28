'use client';

import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'info' | 'premium' | 'adventure';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-bg-light text-text-secondary border border-gray-200',
  success: 'bg-soft-green text-primary',
  warning: 'bg-amber-50 text-amber-800',
  info: 'bg-blue-50 text-blue-800',
  premium: 'bg-gold/10 text-gold-dark',
  adventure: 'bg-sunset/10 text-sunset',
};

export function Badge({ children, variant = 'default', className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
