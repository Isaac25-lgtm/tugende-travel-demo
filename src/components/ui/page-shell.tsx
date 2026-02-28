'use client';

import { cn } from '@/lib/utils/cn';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
}

export function PageShell({ children, className, withPadding = true }: PageShellProps) {
  return (
    <main className={cn('min-h-screen', withPadding && 'pt-16', className)}>
      {children}
    </main>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}

export function Section({ children, className, dark = false, id }: { children: React.ReactNode; className?: string; dark?: boolean; id?: string }) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24',
        dark ? 'bg-bg-dark text-text-on-dark' : 'bg-bg-light',
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
