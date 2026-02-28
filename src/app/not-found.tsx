import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          Trail Not Found
        </h2>
        <p className="text-text-secondary mb-8">
          This path doesn&apos;t seem to exist. Let us help you find your way back to discovering Uganda.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline">Explore Destinations</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
