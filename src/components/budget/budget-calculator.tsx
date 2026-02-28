'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Home, Car, DollarSign } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Chip } from '@/components/ui/chip';
import { calculateBudget } from '@/lib/budget/calculator';
import { formatCurrency } from '@/lib/utils/formatters';
import type { AccommodationTier, TransportMode } from '@/types/budget';
import { fadeInUp } from '@/lib/utils/motion';

export function BudgetCalculator() {
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(5);
  const [accommodation, setAccommodation] = useState<AccommodationTier>('mid-range');
  const [transport, setTransport] = useState<TransportMode>('shared');
  const [includePermits, setIncludePermits] = useState(true);

  const result = useMemo(() =>
    calculateBudget({
      travelers,
      durationDays: days,
      accommodationTier: accommodation,
      transportMode: transport,
      selectedActivities: [],
      includePermits,
    }),
    [travelers, days, accommodation, transport, includePermits]
  );

  const breakdownItems = [
    { label: 'Accommodation', value: result.perPerson.accommodation, color: 'bg-primary' },
    { label: 'Transport', value: result.perPerson.transport, color: 'bg-secondary' },
    { label: 'Park Fees', value: result.perPerson.parkFees, color: 'bg-gold' },
    { label: 'Meals', value: result.perPerson.meals, color: 'bg-sunset' },
    { label: 'Miscellaneous', value: result.perPerson.miscellaneous, color: 'bg-gray-400' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Controls */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
        <Slider
          label="Number of Travelers"
          value={travelers}
          min={1}
          max={10}
          onChange={setTravelers}
          formatValue={(v) => `${v} ${v === 1 ? 'person' : 'people'}`}
        />

        <Slider
          label="Trip Duration"
          value={days}
          min={1}
          max={14}
          onChange={setDays}
          formatValue={(v) => `${v} ${v === 1 ? 'day' : 'days'}`}
        />

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            <Home className="w-4 h-4 inline mr-1.5" />
            Accommodation
          </label>
          <div className="flex flex-wrap gap-2">
            {(['budget', 'mid-range', 'premium'] as AccommodationTier[]).map((tier) => (
              <Chip
                key={tier}
                selected={accommodation === tier}
                onClick={() => setAccommodation(tier)}
              >
                {tier === 'budget' ? 'Budget Camping' : tier === 'mid-range' ? 'Mid-Range Lodge' : 'Premium Luxury'}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            <Car className="w-4 h-4 inline mr-1.5" />
            Transport
          </label>
          <div className="flex flex-wrap gap-2">
            {(['public', 'shared', 'private'] as TransportMode[]).map((mode) => (
              <Chip
                key={mode}
                selected={transport === mode}
                onClick={() => setTransport(mode)}
              >
                {mode === 'public' ? 'Public Transport' : mode === 'shared' ? 'Shared Vehicle' : 'Private Vehicle'}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <Chip
            selected={includePermits}
            onClick={() => setIncludePermits(!includePermits)}
          >
            Include Park Entry Fees
          </Chip>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="bg-surface rounded-xl shadow-card p-6"
      >
        {/* Total */}
        <div className="text-center mb-6 pb-6 border-b border-gray-100">
          <p className="text-sm text-text-muted uppercase tracking-wide">Estimated Total (per person)</p>
          <motion.p
            key={result.perPerson.total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-4xl md:text-5xl font-bold text-primary mt-2"
          >
            {formatCurrency(result.perPerson.total)}
          </motion.p>
          <p className="text-sm text-text-muted mt-1">
            Group total: {formatCurrency(result.totalGroup.total)}
          </p>
        </div>

        {/* Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gold" />
            Cost Breakdown
          </h4>
          {breakdownItems.map((item) => {
            const percentage = result.perPerson.total > 0 ? (item.value / result.perPerson.total) * 100 : 0;
            return (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="font-medium text-text-primary">{formatCurrency(item.value)}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-[11px] text-text-muted leading-relaxed">
          {result.disclaimer}
        </p>
      </motion.div>
    </div>
  );
}
