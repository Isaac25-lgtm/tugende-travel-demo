'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Clock, Star, Mountain, Car, Plane,
  DollarSign, Calendar, Users, AlertTriangle, Lightbulb, CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/page-shell';
import { allDestinations as destinations } from '@/data/seed-destinations';
import { fadeInUp } from '@/lib/utils/motion';
import { DIFFICULTY_LABELS, PRICE_BAND_LABELS, CATEGORY_LABELS } from '@/lib/utils/constants';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16 bg-bg-light">
          <Section className="text-center py-32">
            <h1 className="font-display text-3xl font-bold text-text-primary mb-4">Destination Not Found</h1>
            <p className="text-text-secondary mb-8">We couldn&apos;t find the destination you&apos;re looking for.</p>
            <Link href="/explore">
              <Button variant="primary">Browse All Destinations</Button>
            </Link>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  const d = destination;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-bg-light">
        {/* Hero */}
        <div className="relative h-[50vh] min-h-[360px]">
          <img
            src={d.heroImage}
            alt={d.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-[1400px] mx-auto">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-3xl md:text-5xl font-bold text-white"
            >
              {d.name}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-white/80 text-sm">
                <MapPin className="w-4 h-4" />
                {d.region} Uganda
              </span>
              <Badge variant="premium">{PRICE_BAND_LABELS[d.priceBand]}</Badge>
              <span className="flex items-center gap-1 text-white/80 text-sm">
                <Clock className="w-4 h-4" />
                {d.durationDays[0]}&ndash;{d.durationDays[1]} days
              </span>
              <span className="flex items-center gap-1 text-white/80 text-sm">
                <Mountain className="w-4 h-4" />
                {DIFFICULTY_LABELS[d.difficulty]}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Summary */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                <h2 className="font-display text-2xl font-bold text-text-primary mb-3">Overview</h2>
                <p className="text-text-secondary leading-relaxed">{d.summary}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {d.categories.map((cat) => (
                    <Badge key={cat} variant="default">{CATEGORY_LABELS[cat] || cat}</Badge>
                  ))}
                </div>
              </motion.div>

              {/* Activities */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                <h2 className="font-display text-2xl font-bold text-text-primary mb-4">Things to Do</h2>
                <div className="space-y-3">
                  {d.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-surface rounded-xl p-4 border border-gray-100 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-text-primary">{activity.name}</h3>
                            {activity.permitRequired && (
                              <Badge variant="warning" className="text-[10px]" icon={<AlertTriangle className="w-2.5 h-2.5" />}>
                                Permit Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary mt-1 leading-relaxed">{activity.description}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {activity.durationHours >= 24
                                ? `${Math.round(activity.durationHours / 24)} days`
                                : `${activity.durationHours} hrs`}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mountain className="w-3 h-3" />
                              {DIFFICULTY_LABELS[activity.difficulty]}
                            </span>
                            <Badge variant="default" className="text-[10px] px-2 py-0.5">
                              {PRICE_BAND_LABELS[activity.costBand]}
                            </Badge>
                          </div>
                        </div>
                        {activity.costEstimateUSD && (
                          <div className="text-right shrink-0">
                            <span className="text-sm font-semibold text-primary">
                              ${activity.costEstimateUSD.min}
                              {activity.costEstimateUSD.max !== activity.costEstimateUSD.min &&
                                `–$${activity.costEstimateUSD.max}`}
                            </span>
                            <p className="text-[10px] text-text-muted">per person</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tips */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <h2 className="font-display text-2xl font-bold text-text-primary mb-4">Travel Tips</h2>
                <div className="bg-surface rounded-xl p-5 border border-gray-100 shadow-sm space-y-3">
                  {d.tips.map((tip, i) => (
                    <div key={i} className="flex gap-3">
                      <Lightbulb className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <p className="text-sm text-text-secondary">{tip}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Budget Card */}
              <div className="bg-surface rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-display text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Daily Budget
                </h3>
                <div className="space-y-3">
                  {(['budget', 'midRange', 'premium'] as const).map((tier) => {
                    const label = tier === 'midRange' ? 'Mid-Range' : tier.charAt(0).toUpperCase() + tier.slice(1);
                    const range = d.dailyBudget[tier];
                    return (
                      <div key={tier} className="flex justify-between items-center">
                        <span className="text-sm text-text-secondary">{label}</span>
                        <span className="text-sm font-semibold text-text-primary">
                          ${range.min}&ndash;${range.max}/day
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Getting There */}
              <div className="bg-surface rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-display text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Car className="w-5 h-5 text-primary" />
                  Getting There
                </h3>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p>
                    <span className="font-medium text-text-primary">From Kampala:</span>{' '}
                    {d.transportFromKampala.durationHours > 0
                      ? `${d.transportFromKampala.durationHours} hours (${d.transportFromKampala.distanceKm} km)`
                      : 'You\u2019re already here!'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.transportFromKampala.modes.map((mode) => (
                      <Badge key={mode} variant="default" className="text-[10px]">
                        {mode === 'fly to Kihihi/Kisoro' || mode === 'fly to Kisoro' || mode === 'fly to Kidepo'
                          ? <><Plane className="w-2.5 h-2.5 inline mr-1" />{mode}</>
                          : mode}
                      </Badge>
                    ))}
                  </div>
                  {d.transportFromKampala.notes && (
                    <p className="text-xs text-text-muted italic">{d.transportFromKampala.notes}</p>
                  )}
                </div>
              </div>

              {/* Best Months */}
              <div className="bg-surface rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-display text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Best Months
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {MONTH_NAMES.map((month, i) => (
                    <span
                      key={month}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        d.bestMonths.includes(i + 1)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-text-muted'
                      }`}
                    >
                      {month}
                    </span>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div className="bg-surface rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-display text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Best For
                </h3>
                <div className="space-y-1.5">
                  {d.bestFor.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="text-sm text-text-secondary capitalize">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scores */}
              <div className="bg-surface rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-display text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold" />
                  Ratings
                </h3>
                <div className="space-y-2">
                  {[
                    { label: 'Wildlife', score: d.wildlifeScore },
                    { label: 'Adventure', score: d.adventureScore },
                    { label: 'Culture', score: d.cultureScore },
                    { label: 'Family', score: d.familyScore },
                    { label: 'Luxury', score: d.luxuryScore },
                  ].map(({ label, score }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary w-20">{label}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted w-8 text-right">{score}/5</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link href="/planner">
                <Button variant="cta" size="lg" className="w-full">
                  Plan a Trip Here
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
