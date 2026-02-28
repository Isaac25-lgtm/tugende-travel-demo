'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { staggerContainer, fadeInUp, cardHover } from '@/lib/utils/motion';
import { useUIStore } from '@/store/ui-store';

interface FeaturedDestination {
  id: string;
  name: string;
  region: string;
  image: string;
  tagline: string;
  duration: string;
  categories: string[];
  priceLabel: string;
}

const internationalFeatured: FeaturedDestination[] = [
  {
    id: 'bwindi-impenetrable',
    name: 'Bwindi Impenetrable Forest',
    region: 'Western Uganda',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
    tagline: 'Where the world\'s last mountain gorillas call home',
    duration: '2–3 days',
    categories: ['Wildlife', 'Hiking'],
    priceLabel: 'From $700/day',
  },
  {
    id: 'murchison-falls',
    name: 'Murchison Falls National Park',
    region: 'Northern Uganda',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    tagline: 'The most powerful waterfall on Earth',
    duration: '2–3 days',
    categories: ['Wildlife', 'Nature'],
    priceLabel: 'From $150/day',
  },
  {
    id: 'jinja',
    name: 'Jinja — Source of the Nile',
    region: 'Eastern Uganda',
    image: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800&q=80',
    tagline: 'Adventure capital of East Africa',
    duration: '1–3 days',
    categories: ['Adventure', 'Nature'],
    priceLabel: 'From $80/day',
  },
  {
    id: 'queen-elizabeth',
    name: 'Queen Elizabeth National Park',
    region: 'Western Uganda',
    image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80',
    tagline: 'Tree-climbing lions and Kazinga Channel cruises',
    duration: '2–3 days',
    categories: ['Wildlife', 'Nature'],
    priceLabel: 'From $180/day',
  },
];

const ugandanFeatured: FeaturedDestination[] = [
  {
    id: 'jinja',
    name: 'Jinja Weekend Getaway',
    region: 'Eastern Uganda',
    image: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800&q=80',
    tagline: 'Rafting, bungee jumping, and Nile-side dining',
    duration: 'Weekend',
    categories: ['Adventure', 'Weekend'],
    priceLabel: 'From UGX 200K',
  },
  {
    id: 'sipi-falls',
    name: 'Sipi Falls',
    region: 'Eastern Uganda',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
    tagline: 'Coffee, waterfalls, and mountain air',
    duration: 'Weekend',
    categories: ['Nature', 'Relaxation'],
    priceLabel: 'From UGX 150K',
  },
  {
    id: 'lake-bunyonyi',
    name: 'Lake Bunyonyi',
    region: 'Western Uganda',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    tagline: 'Uganda\'s most beautiful lake retreat',
    duration: 'Weekend',
    categories: ['Relaxation', 'Family'],
    priceLabel: 'From UGX 180K',
  },
  {
    id: 'ssese-islands',
    name: 'Ssese Islands',
    region: 'Central Uganda',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
    tagline: 'Beach vibes on Lake Victoria',
    duration: 'Weekend',
    categories: ['Relaxation', 'Beach'],
    priceLabel: 'From UGX 250K',
  },
];

export function FeaturedDestinations() {
  const { persona } = useUIStore();
  const featured = persona === 'international' ? internationalFeatured : ugandanFeatured;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {featured.map((dest) => (
        <motion.div key={`${persona}-${dest.id}`} variants={fadeInUp}>
          <Link href={`/explore?destination=${dest.id}`}>
            <motion.div
              whileHover={cardHover}
              className="group rounded-xl overflow-hidden bg-surface shadow-card cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white/80 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {dest.region}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                  {dest.name}
                </h3>
                <p className="mt-1 text-sm text-text-secondary line-clamp-2 leading-relaxed">
                  {dest.tagline}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="w-3 h-3" />
                    {dest.duration}
                  </div>
                  <span className="text-xs font-semibold text-primary">{dest.priceLabel}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {dest.categories.map((cat) => (
                    <Badge key={cat} variant="default" className="text-[10px] px-2 py-0.5">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
