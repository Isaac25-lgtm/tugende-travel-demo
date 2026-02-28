'use client';

import { motion } from 'framer-motion';
import { Share2, Download, MessageCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ItineraryCard } from './itinerary-card';
import { TripSummary } from './trip-summary';
import { AlternativesSection } from './alternatives-section';
import { useTripStore } from '@/store/trip-store';
import { fadeInUp } from '@/lib/utils/motion';

export function ItineraryReveal() {
  const { itinerary, resetQuiz } = useTripStore();

  if (!itinerary) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center mb-10"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
          Your Uganda Adventure
        </h2>
        <p className="mt-2 text-text-secondary text-base">
          A personalized {itinerary.summary.totalDays}-day itinerary crafted just for you
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Itinerary Timeline */}
        <div className="lg:col-span-2">
          <div className="space-y-0">
            {itinerary.days.map((day, i) => (
              <ItineraryCard
                key={day.dayNumber}
                day={day}
                index={i}
                isLast={i === itinerary.days.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TripSummary summary={itinerary.summary} />

          {/* Actions */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-surface rounded-xl shadow-card p-5 space-y-3"
          >
            <h4 className="font-display text-lg font-semibold text-text-primary">
              Love this trip?
            </h4>
            <Button variant="cta" fullWidth className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Request This Trip
            </Button>
            <Button variant="outline" fullWidth className="gap-2">
              <Share2 className="w-4 h-4" />
              Share Trip
            </Button>
            <Button variant="ghost" fullWidth className="gap-2" onClick={resetQuiz}>
              <RotateCcw className="w-4 h-4" />
              Plan Another Trip
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Alternatives */}
      <div className="mt-12">
        <AlternativesSection alternatives={itinerary.alternatives} />
      </div>

      {/* Disclaimer */}
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mt-8 text-center text-xs text-text-muted"
      >
        All budget estimates are approximate and based on typical market rates.
        Actual costs may vary based on season, availability, and specific choices.
        Permit fees are set by Uganda Wildlife Authority and subject to change.
      </motion.p>
    </motion.div>
  );
}
