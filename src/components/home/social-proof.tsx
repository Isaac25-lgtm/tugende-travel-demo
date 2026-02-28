'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/utils/motion';

const testimonials = [
  {
    name: 'Sarah & James',
    location: 'London, UK',
    quote: 'Tugende planned our entire gorilla trekking trip in minutes. The itinerary was perfect — we didn\'t have to change a thing.',
    rating: 5,
    avatar: 'S',
  },
  {
    name: 'Daniel Mukasa',
    location: 'Kampala, Uganda',
    quote: 'Finally a travel app that understands local travelers too. Found amazing weekend spots I never knew about.',
    rating: 5,
    avatar: 'D',
  },
  {
    name: 'Emily Chen',
    location: 'San Francisco, USA',
    quote: 'The AI recommended Kidepo Valley — a park I\'d never heard of. It became the highlight of our entire Africa trip.',
    rating: 5,
    avatar: 'E',
  },
];

export function SocialProof() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {testimonials.map((t) => (
        <motion.div
          key={t.name}
          variants={fadeInUp}
          className="bg-surface rounded-xl p-6 shadow-card"
        >
          <Quote className="w-8 h-8 text-gold/30 mb-3" />
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
              {t.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{t.name}</p>
              <p className="text-xs text-text-muted">{t.location}</p>
            </div>
            <div className="ml-auto flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
