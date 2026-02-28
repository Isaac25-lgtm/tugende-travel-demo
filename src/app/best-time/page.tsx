'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Chip } from '@/components/ui/chip';
import { Section } from '@/components/ui/page-shell';
import { getMonthFullName } from '@/lib/utils/formatters';
import { staggerContainer, fadeInUp } from '@/lib/utils/motion';

type ActivityMode = 'overall' | 'gorilla' | 'safari' | 'rafting' | 'birding' | 'trekking';

const activityModes: { value: ActivityMode; label: string }[] = [
  { value: 'overall', label: 'Overall' },
  { value: 'gorilla', label: 'Gorilla Trekking' },
  { value: 'safari', label: 'Safari' },
  { value: 'rafting', label: 'Rafting' },
  { value: 'birding', label: 'Birding' },
  { value: 'trekking', label: 'Trekking' },
];

interface MonthData {
  score: number;
  label: string;
  notes: string;
  season: 'dry' | 'wet' | 'shoulder';
}

const seasonData: Record<ActivityMode, MonthData[]> = {
  overall: [
    { score: 4, label: 'Great', notes: 'Dry season. Excellent wildlife viewing and trekking.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Dry season continues. Good for gorilla trekking.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Rains starting. Shoulder season with lower crowds.', season: 'shoulder' },
    { score: 2, label: 'Fair', notes: 'Heavy rains. Some roads difficult. Green landscapes.', season: 'wet' },
    { score: 2, label: 'Fair', notes: 'Wet season. Lower prices and fewer tourists.', season: 'wet' },
    { score: 5, label: 'Excellent', notes: 'Dry season begins. Peak tourism month.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Best overall month. Dry, clear, great wildlife.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Peak season. Book everything early.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Dry season ending. Still excellent conditions.', season: 'dry' },
    { score: 2, label: 'Fair', notes: 'Short rains begin. Some roads muddy.', season: 'wet' },
    { score: 2, label: 'Fair', notes: 'Rainy period. Lower prices available.', season: 'wet' },
    { score: 4, label: 'Great', notes: 'Rains easing. Good for holiday season trips.', season: 'dry' },
  ],
  gorilla: [
    { score: 5, label: 'Excellent', notes: 'Dry trails. Gorillas often lower in the forest.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Still dry. Good trekking conditions.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Shoulder season. Some rain but manageable.', season: 'shoulder' },
    { score: 2, label: 'Fair', notes: 'Muddy trails but lower permit demand.', season: 'wet' },
    { score: 2, label: 'Fair', notes: 'Wet forest floors. Challenging but rewarding.', season: 'wet' },
    { score: 5, label: 'Excellent', notes: 'Peak gorilla trekking season starts.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Best month for gorilla trekking.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Dry trails, high visibility. Book early.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Dry season ending. Still good conditions.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Rains start. Fewer crowds for permits.', season: 'shoulder' },
    { score: 2, label: 'Fair', notes: 'Wet season. Permits more available.', season: 'wet' },
    { score: 4, label: 'Great', notes: 'Holiday season. Good trekking weather.', season: 'dry' },
  ],
  safari: [
    { score: 4, label: 'Great', notes: 'Animals near water sources. Good visibility.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Peak dry season in Kidepo.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Green season starting. Newborn animals.', season: 'shoulder' },
    { score: 2, label: 'Fair', notes: 'Lush vegetation can hide animals.', season: 'wet' },
    { score: 2, label: 'Fair', notes: 'Wet, but migratory birds arrive.', season: 'wet' },
    { score: 5, label: 'Excellent', notes: 'Dry season. Best game viewing.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Excellent safari conditions everywhere.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Peak safari season. Sparse vegetation.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Late dry season. Good wildlife viewing.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Short rains. Mixed conditions.', season: 'shoulder' },
    { score: 2, label: 'Fair', notes: 'Wet but good for birding safaris.', season: 'wet' },
    { score: 4, label: 'Great', notes: 'Rains easing. Good game drives.', season: 'dry' },
  ],
  rafting: [
    { score: 4, label: 'Great', notes: 'Consistent water levels. Good rapids.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Dry season. Great conditions.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Water levels rising. Exciting rapids.', season: 'shoulder' },
    { score: 5, label: 'Excellent', notes: 'Higher water = bigger rapids. Thrilling!', season: 'wet' },
    { score: 5, label: 'Excellent', notes: 'Peak water levels. Epic rafting.', season: 'wet' },
    { score: 4, label: 'Great', notes: 'Levels dropping. Still excellent.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Lower water. Some rapids easier.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Lower water levels.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Water rising again.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Good conditions returning.', season: 'shoulder' },
    { score: 5, label: 'Excellent', notes: 'High water. Best rapids.', season: 'wet' },
    { score: 4, label: 'Great', notes: 'Good water levels.', season: 'dry' },
  ],
  birding: [
    { score: 4, label: 'Great', notes: 'Resident species active.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Good visibility for spotting.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Migratory birds arriving. Breeding plumage.', season: 'shoulder' },
    { score: 5, label: 'Excellent', notes: 'Peak birding. Migrants + residents.', season: 'wet' },
    { score: 5, label: 'Excellent', notes: 'Outstanding birding. Nesting season.', season: 'wet' },
    { score: 3, label: 'Good', notes: 'Migrants departing. Resident species.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Fewer species. Clear skies.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Dry season. Basic species.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Migration begins. Species increasing.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Migrants returning. Great variety.', season: 'shoulder' },
    { score: 5, label: 'Excellent', notes: 'Peak migration. 1000+ species possible.', season: 'wet' },
    { score: 4, label: 'Great', notes: 'Good mix of residents and migrants.', season: 'dry' },
  ],
  trekking: [
    { score: 5, label: 'Excellent', notes: 'Dry trails. Clear mountain views.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Best trekking conditions.', season: 'dry' },
    { score: 3, label: 'Good', notes: 'Rains starting. Trails getting muddy.', season: 'shoulder' },
    { score: 1, label: 'Poor', notes: 'Heavy rain. Trails very slippery.', season: 'wet' },
    { score: 1, label: 'Poor', notes: 'Not recommended for high-altitude trekking.', season: 'wet' },
    { score: 5, label: 'Excellent', notes: 'Dry season. Excellent for Rwenzoris.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Best trekking month.', season: 'dry' },
    { score: 5, label: 'Excellent', notes: 'Perfect conditions. Peak season.', season: 'dry' },
    { score: 4, label: 'Great', notes: 'Late dry season. Still good.', season: 'dry' },
    { score: 2, label: 'Fair', notes: 'Short rains. Lower altitude OK.', season: 'wet' },
    { score: 2, label: 'Fair', notes: 'Wet trails. Challenging conditions.', season: 'wet' },
    { score: 4, label: 'Great', notes: 'Rains easing. Sipi/Elgon good.', season: 'dry' },
  ],
};

const scoreColors: Record<number, string> = {
  1: 'bg-red-100 text-red-800 border-red-200',
  2: 'bg-orange-50 text-orange-800 border-orange-200',
  3: 'bg-amber-50 text-amber-800 border-amber-200',
  4: 'bg-green-50 text-green-800 border-green-200',
  5: 'bg-emerald-100 text-emerald-800 border-emerald-300',
};

export default function BestTimePage() {
  const [mode, setMode] = useState<ActivityMode>('overall');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const data = seasonData[mode];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-bg-light">
        {/* Hero */}
        <div className="bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Best Time to Visit Uganda
            </h1>
            <p className="mt-3 text-white/70 text-base md:text-lg max-w-xl mx-auto">
              Two dry seasons, incredible wildlife year-round. Find the perfect month for your adventure.
            </p>
          </div>
        </div>

        {/* Activity Toggle */}
        <Section className="!py-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {activityModes.map(m => (
              <Chip key={m.value} selected={mode === m.value} onClick={() => setMode(m.value)}>
                {m.label}
              </Chip>
            ))}
          </div>
        </Section>

        {/* Calendar Grid */}
        <Section className="!pt-0">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={mode}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3"
          >
            {data.map((month, i) => (
              <motion.button
                key={i}
                variants={fadeInUp}
                onClick={() => setSelectedMonth(selectedMonth === i ? null : i)}
                aria-label={`${getMonthFullName(i + 1)}: ${month.label} (${month.score}/5), ${month.season} season. ${month.notes}`}
                aria-pressed={selectedMonth === i}
                className={`p-3 md:p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${scoreColors[month.score]} ${selectedMonth === i ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide">{getMonthFullName(i + 1).slice(0, 3)}</p>
                <p className="text-lg font-bold mt-1">{month.score}/5</p>
                <p className="text-[10px] mt-0.5">{month.label}</p>
                <div className="mt-1.5">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${month.season === 'dry' ? 'bg-yellow-100 text-yellow-800' : month.season === 'wet' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}>
                    {month.season}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Selected Month Details */}
          {selectedMonth !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-surface rounded-xl shadow-card p-6 max-w-2xl mx-auto"
            >
              <h3 className="font-display text-xl font-bold text-text-primary">
                {getMonthFullName(selectedMonth + 1)}
              </h3>
              <p className="mt-2 text-text-secondary leading-relaxed">
                {data[selectedMonth].notes}
              </p>
              <div className="mt-3 flex gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${data[selectedMonth].season === 'dry' ? 'bg-yellow-100 text-yellow-800' : data[selectedMonth].season === 'wet' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}>
                  {data[selectedMonth].season === 'dry' ? 'Dry Season' : data[selectedMonth].season === 'wet' ? 'Wet Season' : 'Shoulder Season'}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${scoreColors[data[selectedMonth].score]}`}>
                  Rating: {data[selectedMonth].label}
                </span>
              </div>
            </motion.div>
          )}

          {/* Legend */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center text-xs text-text-muted">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" /> Excellent (5)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-50 border border-green-200" /> Great (4)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-50 border border-amber-200" /> Good (3)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-50 border border-orange-200" /> Fair (2)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-100 border border-red-200" /> Poor (1)</span>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
