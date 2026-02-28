'use client';

import { cn } from '@/lib/utils/cn';

interface ShimmerProps {
  className?: string;
}

export function LoadingShimmer({ className }: ShimmerProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]',
        className
      )}
    />
  );
}

export function CardShimmer() {
  return (
    <div className="rounded-xl overflow-hidden bg-surface shadow-card">
      <LoadingShimmer className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <LoadingShimmer className="h-5 w-3/4" />
        <LoadingShimmer className="h-4 w-full" />
        <LoadingShimmer className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <LoadingShimmer className="h-6 w-16 rounded-full" />
          <LoadingShimmer className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
