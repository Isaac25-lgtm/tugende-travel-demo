'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DestinationCard } from '@/components/destinations/destination-card';
import { Chip } from '@/components/ui/chip';
import { Section } from '@/components/ui/page-shell';
import { destinations, allDestinations } from '@/data/seed-destinations';
import { extendedDestinations } from '@/data/seed-destinations-extended';
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

function applyFilters(
  list: typeof allDestinations,
  category: DestinationCategory | 'all',
  region: Region | 'all',
  budget: PriceBand | 'all'
) {
  return list.filter(d => {
    if (category !== 'all' && !d.categories.includes(category)) return false;
    if (region !== 'all' && d.region !== region) return false;
    if (budget !== 'all' && d.priceBand !== budget) return false;
    return true;
  });
}

export default function ExplorePage() {
  const [category, setCategory] = useState<DestinationCategory | 'all'>('all');
  const [region, setRegion] = useState<Region | 'all'>('all');
  const [budget, setBudget] = useState<PriceBand | 'all'>('all');
  const [showMore, setShowMore] = useState(false);

  const filteredMajor = useMemo(
    () => applyFilters(destinations, category, region, budget),
    [category, region, budget]
  );

  const filteredHiddenGems = useMemo(
    () => applyFilters(extendedDestinations, category, region, budget),
    [category, region, budget]
  );

  const totalCount = filteredMajor.length + filteredHiddenGems.length;

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
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-white/90 text-sm font-medium">{allDestinations.length}+ Destinations</span>
            </div>
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

        {/* Major Destinations */}
        <Section className="!pt-0">
          <p className="text-sm text-text-muted mb-6">
            {totalCount} destinations found
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={`major-${category}-${region}-${budget}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredMajor.map((d) => (
              <motion.div key={d.id} variants={fadeInUp}>
                <DestinationCard destination={d} />
              </motion.div>
            ))}
          </motion.div>

          {filteredMajor.length === 0 && filteredHiddenGems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">No destinations match your filters.</p>
              <p className="text-text-muted text-sm mt-1">Try adjusting your criteria.</p>
            </div>
          )}
        </Section>

        {/* Show More / Hidden Gems */}
        {filteredHiddenGems.length > 0 && (
          <Section className="!pt-0">
            {!showMore ? (
              <div className="text-center">
                <button
                  onClick={() => setShowMore(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary font-medium transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                  Show {filteredHiddenGems.length} More Hidden Gems
                </button>
                <p className="mt-2 text-text-muted text-sm">
                  Discover lesser-known destinations across Uganda
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-border" />
                  <h2 className="text-lg font-display font-semibold text-primary">Hidden Gems</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  key={`gems-${category}-${region}-${budget}`}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filteredHiddenGems.map((d) => (
                    <motion.div key={d.id} variants={fadeInUp}>
                      <DestinationCard destination={d} />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}
