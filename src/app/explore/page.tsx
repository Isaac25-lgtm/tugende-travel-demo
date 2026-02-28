'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DestinationCard } from '@/components/destinations/destination-card';
import { Chip } from '@/components/ui/chip';
import { Section } from '@/components/ui/page-shell';
import { destinations } from '@/data/seed-destinations';
import { staggerContainer, fadeInUp } from '@/lib/utils/motion';
import type { DestinationCategory, Region, PriceBand } from '@/types/destination';

const CATEGORY_FILTERS: { value: DestinationCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'culture', label: 'Culture' },
  { value: 'nature', label: 'Nature' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'family', label: 'Family' },
];

const REGION_FILTERS: { value: Region | 'all'; label: string }[] = [
  { value: 'all', label: 'All Regions' },
  { value: 'Western', label: 'Western' },
  { value: 'Eastern', label: 'Eastern' },
  { value: 'Northern', label: 'Northern' },
  { value: 'Central', label: 'Central' },
];

const BUDGET_FILTERS: { value: PriceBand | 'all'; label: string }[] = [
  { value: 'all', label: 'Any Budget' },
  { value: 'budget', label: 'Budget' },
  { value: 'mid-range', label: 'Mid-Range' },
  { value: 'premium', label: 'Premium' },
];

export default function ExplorePage() {
  const [category, setCategory] = useState<DestinationCategory | 'all'>('all');
  const [region, setRegion] = useState<Region | 'all'>('all');
  const [budget, setBudget] = useState<PriceBand | 'all'>('all');

  const filtered = useMemo(() => {
    return destinations.filter(d => {
      if (category !== 'all' && !d.categories.includes(category)) return false;
      if (region !== 'all' && d.region !== region) return false;
      if (budget !== 'all' && d.priceBand !== budget) return false;
      return true;
    });
  }, [category, region, budget]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-bg-light">
        {/* Hero */}
        <div className="bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Explore Uganda
            </h1>
            <p className="mt-3 text-white/70 text-base md:text-lg max-w-xl mx-auto">
              From mountain gorillas to Nile rapids — discover the experiences that make Uganda the Pearl of Africa.
            </p>
          </div>
        </div>

        {/* Filters */}
        <Section className="!py-8">
          <div className="space-y-4">
            {/* Category */}
            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map((f) => (
                <Chip
                  key={f.value}
                  selected={category === f.value}
                  onClick={() => setCategory(f.value)}
                >
                  {f.label}
                </Chip>
              ))}
            </div>

            {/* Region and Budget */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                {REGION_FILTERS.map((f) => (
                  <Chip
                    key={f.value}
                    selected={region === f.value}
                    onClick={() => setRegion(f.value)}
                    className="text-xs"
                  >
                    {f.label}
                  </Chip>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {BUDGET_FILTERS.map((f) => (
                  <Chip
                    key={f.value}
                    selected={budget === f.value}
                    onClick={() => setBudget(f.value)}
                    className="text-xs"
                  >
                    {f.label}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Results */}
        <Section className="!pt-0">
          <p className="text-sm text-text-muted mb-6">{filtered.length} destinations found</p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={`${category}-${region}-${budget}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((d) => (
              <motion.div key={d.id} variants={fadeInUp}>
                <DestinationCard destination={d} />
              </motion.div>
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">No destinations match your filters.</p>
              <p className="text-text-muted text-sm mt-1">Try adjusting your criteria.</p>
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
