'use client';

import { motion } from 'framer-motion';
import { Wallet, Crown, Clock, ArrowRight } from 'lucide-react';
import type { AlternativeSuggestion } from '@/types/itinerary';
import { formatRange } from '@/lib/utils/formatters';
import { staggerContainer, fadeInUp } from '@/lib/utils/motion';

interface AlternativesSectionProps {
  alternatives: AlternativeSuggestion[];
}

const typeConfig = {
  budget: { icon: Wallet, label: 'Budget Alternative', color: 'bg-soft-green text-primary' },
  premium: { icon: Crown, label: 'Premium Upgrade', color: 'bg-gold/10 text-gold-dark' },
  short: { icon: Clock, label: 'Shorter Option', color: 'bg-blue-50 text-blue-800' },
};

export function AlternativesSection({ alternatives }: AlternativesSectionProps) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-5">
        Alternative Options
      </h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {alternatives.map((alt) => {
          const config = typeConfig[alt.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={alt.type}
              variants={fadeInUp}
              className="bg-surface rounded-xl shadow-card p-5 border border-gray-100"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${config.color}`}>
                <Icon className="w-3.5 h-3.5" />
                {config.label}
              </div>
              <h4 className="font-display text-lg font-bold text-text-primary mb-1">
                {alt.title}
              </h4>
              <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                {alt.description}
              </p>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Budget</span>
                  <span className="font-semibold text-text-primary">
                    {formatRange(alt.estimatedBudgetUSD.min, alt.estimatedBudgetUSD.max)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Duration</span>
                  <span className="font-semibold text-text-primary">{alt.durationDays} days</span>
                </div>
              </div>
              <ul className="space-y-1">
                {alt.keyDifferences.slice(0, 3).map((diff, i) => (
                  <li key={i} className="text-xs text-text-secondary flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-primary" />
                    {diff}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
