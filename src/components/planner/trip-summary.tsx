'use client';

import { motion } from 'framer-motion';
import { DollarSign, Calendar, Star, AlertTriangle, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { TripSummary as TripSummaryType } from '@/types/itinerary';
import { formatRange } from '@/lib/utils/formatters';
import { fadeInUp } from '@/lib/utils/motion';

interface TripSummaryProps {
  summary: TripSummaryType;
}

export function TripSummary({ summary }: TripSummaryProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-surface rounded-xl shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="bg-primary p-5 md:p-6">
        <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
          Trip Summary
        </h3>
        <p className="text-white/70 text-sm">{summary.overallWhyThisTrip}</p>
      </div>

      <div className="p-5 md:p-6 space-y-5">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bg-light rounded-lg p-4 text-center">
            <DollarSign className="w-5 h-5 text-gold mx-auto mb-1" />
            <p className="text-xs text-text-muted uppercase tracking-wide">Estimated Budget</p>
            <p className="text-lg font-bold text-text-primary mt-1">
              {formatRange(summary.totalBudgetUSD.min, summary.totalBudgetUSD.max)}
            </p>
            <p className="text-[10px] text-text-muted mt-0.5">per person, approximate</p>
          </div>
          <div className="bg-bg-light rounded-lg p-4 text-center">
            <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-text-muted uppercase tracking-wide">Duration</p>
            <p className="text-lg font-bold text-text-primary mt-1">
              {summary.totalDays} Days
            </p>
          </div>
        </div>

        {/* Best Value */}
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
            <Star className="w-4 h-4 text-gold" />
            Best Value Highlights
          </h4>
          <ul className="space-y-1.5">
            {summary.bestValueHighlights.map((h, i) => (
              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-gold mt-0.5">•</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking Priorities */}
        {summary.bookingPriorities.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
              <Bookmark className="w-4 h-4 text-primary" />
              Book These First
            </h4>
            <ul className="space-y-1.5">
              {summary.bookingPriorities.map((b, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Seasonal Warnings */}
        {summary.seasonalWarnings && summary.seasonalWarnings.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-800 mb-1.5">
              <AlertTriangle className="w-4 h-4" />
              Seasonal Notes
            </h4>
            {summary.seasonalWarnings.map((w, i) => (
              <p key={i} className="text-sm text-amber-700">{w}</p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
