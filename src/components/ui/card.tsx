'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { cardHover } from '@/lib/utils/motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  dark?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hoverable = false, dark = false, onClick }: CardProps) {
  const Component = hoverable ? motion.div : 'div';
  const motionProps = hoverable
    ? { whileHover: cardHover, transition: { duration: 0.2 } }
    : {};

  return (
    <Component
      className={cn(
        'rounded-xl overflow-hidden',
        'shadow-card',
        dark ? 'bg-bg-dark text-text-on-dark' : 'bg-surface text-text-primary',
        hoverable && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
}

export function CardImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-4 md:p-6', className)}>
      {children}
    </div>
  );
}
