'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { fadeInUp } from '@/lib/utils/motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = true, light = false, className }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(centered && 'text-center', 'mb-10 md:mb-14', className)}
    >
      <h2
        className={cn(
          'font-display text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight',
          light ? 'text-text-on-dark' : 'text-text-primary'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3 text-base md:text-lg max-w-2xl',
            centered && 'mx-auto',
            light ? 'text-text-on-dark/70' : 'text-text-secondary'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
