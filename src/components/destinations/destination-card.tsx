'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Star, AlertTriangle, Mountain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cardHover } from '@/lib/utils/motion';
import type { Destination } from '@/types/destination';
import { DIFFICULTY_LABELS, PRICE_BAND_LABELS, CATEGORY_LABELS } from '@/lib/utils/constants';

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
}

export function DestinationCard({ destination, onClick }: DestinationCardProps) {
  const d = destination;

  return (
    <motion.div
      whileHover={cardHover}
      onClick={onClick}
      className="group rounded-xl overflow-hidden bg-surface shadow-card cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={d.heroImage}
          alt={d.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-lg font-bold text-white line-clamp-1">{d.name}</h3>
          <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" />
            {d.region} Uganda
          </p>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="premium" className="text-[10px]">
            {PRICE_BAND_LABELS[d.priceBand]}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
          {d.whyGoHere}
        </p>

        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {d.durationDays[0]}–{d.durationDays[1]} days
          </span>
          <span className="flex items-center gap-1">
            <Mountain className="w-3.5 h-3.5" />
            {DIFFICULTY_LABELS[d.difficulty]}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-gold" />
            {d.wildlifeScore}/5
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {d.categories.slice(0, 3).map((cat) => (
            <Badge key={cat} variant="default" className="text-[10px] px-2 py-0.5">
              {CATEGORY_LABELS[cat] || cat}
            </Badge>
          ))}
          {d.permitRequired && (
            <Badge variant="warning" className="text-[10px] px-2 py-0.5" icon={<AlertTriangle className="w-2.5 h-2.5" />}>
              Permit
            </Badge>
          )}
        </div>

        <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-text-muted">
            From ${d.dailyBudget.budget.min}/day
          </span>
          <span className="text-xs font-medium text-primary group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
