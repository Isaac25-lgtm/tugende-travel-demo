import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Tugende — Uganda\'s AI Travel Companion',
    template: '%s | Tugende',
  },
  description: 'Discover Uganda intelligently. Plan personalized trips with AI — from gorilla trekking in Bwindi to rafting the Nile.',
  keywords: ['Uganda', 'travel', 'safari', 'gorilla trekking', 'AI travel planner', 'Tugende', 'Uganda tourism', 'trip planner'],
  openGraph: {
    title: 'Tugende — Uganda\'s AI Travel Companion',
    description: 'Plan personalized Uganda trips with AI. Gorilla trekking, safari, adventure — tailored to your style and budget.',
    siteName: 'Tugende',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Uganda landscape — Tugende AI Travel Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tugende — Uganda\'s AI Travel Companion',
    description: 'Plan personalized Uganda trips with AI. Gorilla trekking, safari, adventure — tailored to your style and budget.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
