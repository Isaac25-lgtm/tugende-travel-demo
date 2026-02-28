'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BudgetCalculator } from '@/components/budget/budget-calculator';
import { SectionHeading } from '@/components/ui/section-heading';
import { Section } from '@/components/ui/page-shell';

export default function BudgetPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-bg-light">
        {/* Hero */}
        <div className="bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Safari Budget Calculator
            </h1>
            <p className="mt-3 text-white/70 text-base md:text-lg max-w-xl mx-auto">
              Get a realistic estimate for your Uganda trip. Adjust the sliders and see costs update in real time.
            </p>
          </div>
        </div>

        <Section>
          <BudgetCalculator />
        </Section>
      </main>
      <Footer />
    </>
  );
}
