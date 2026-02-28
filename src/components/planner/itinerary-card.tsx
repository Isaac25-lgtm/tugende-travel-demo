'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { destinations } from '@/data/seed-destinations';
import type { ItineraryDay } from '@/types/itinerary';
import { formatRange } from '@/lib/utils/formatters';

interface ItineraryCardProps {
  day: ItineraryDay;
  index: number;
  isLast: boolean;
}

export function ItineraryCard({ day, index, isLast }: ItineraryCardProps) {
  const dest = destinations.find(d => d.id === day.destinationId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-4 md:gap-6"
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
          {day.dayNumber}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-primary/20 mt-2" />}
      </div>

      {/* Card Content */}
      <div className="flex-1 pb-8">
        <div className="bg-surface rounded-xl shadow-card overflow-hidden">
          {/* Image Header */}
          {dest && (
            <div className="relative h-40 md:h-48 overflow-hidden">
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-display text-xl font-bold text-white">{day.title}</h3>
                <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {dest.name}
                </p>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="p-4 md:p-5 space-y-4">
            {/* Activities */}
            <div>
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Activities</h4>
              <div className="flex flex-wrap gap-2">
                {day.activities.map((activity, i) => (
                  <Badge key={i} variant="success">
                    <CheckCircle className="w-3 h-3" />
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cost & Info Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-gold" />
                {formatRange(day.estimatedCostUSD.min, day.estimatedCostUSD.max)} /day
              </span>
              {day.travelNotes && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {day.travelNotes}
                </span>
              )}
            </div>

            {/* Why This Fits You */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
              <p className="text-sm text-primary font-medium leading-relaxed">
                <span className="font-semibold">Why this fits you: </span>
                {day.whyThisFitsYou}
              </p>
            </div>

            {/* Realism Markers */}
            {dest && (
              <div className="flex flex-wrap gap-2">
                {dest.permitRequired && (
                  <Badge variant="warning" icon={<AlertTriangle className="w-3 h-3" />}>
                    Permit Required
                  </Badge>
                )}
                {dest.difficulty >= 4 && (
                  <Badge variant="adventure">High Physical Effort</Badge>
                )}
                {dest.familyScore >= 4 && (
                  <Badge variant="success">Family-Friendly</Badge>
                )}
                {dest.transportFromKampala.durationHours > 6 && (
                  <Badge variant="info">Long Road Transfer</Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
