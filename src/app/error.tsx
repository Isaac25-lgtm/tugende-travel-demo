'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
          Something went wrong
        </h1>
        <p className="text-text-secondary mb-6">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
          <a href="/">
            <Button variant="outline">
              Back to Home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
