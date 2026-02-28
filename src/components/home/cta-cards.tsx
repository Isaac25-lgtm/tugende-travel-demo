'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Calculator, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/utils/motion';

const ctaItems = [
  {
    href: '/planner',
    icon: Sparkles,
    title: 'Plan My Trip',
    description: 'Answer a few questions and get a personalized Uganda itinerary in seconds.',
    color: 'bg-primary',
    accent: 'text-soft-green',
  },
  {
    href: '/explore',
    icon: Compass,
    title: 'Explore Destinations',
    description: 'Browse national parks, cultural sites, and hidden gems across Uganda.',
    color: 'bg-secondary',
    accent: 'text-gold',
  },
  {
    href: '/budget',
    icon: Calculator,
    title: 'Safari Budget',
    description: 'Calculate trip costs with interactive sliders and real-time estimates.',
    color: 'bg-bg-dark',
    accent: 'text-gold',
  },
];

export function CTACards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="grid grid-cols-1 md:grid-cols-3 gap-5"
    >
      {ctaItems.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div key={item.href} variants={fadeInUp}>
            <Link
              href={item.href}
              className={`group block rounded-xl ${item.color} p-6 md:p-8 text-white hover:shadow-elevated transition-shadow duration-300`}
            >
              <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${item.accent}`} />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">{item.description}</p>
              <div className="flex items-center gap-1.5 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
