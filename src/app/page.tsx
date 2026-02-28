'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { PersonaToggle } from '@/components/home/persona-toggle';
import { CTACards } from '@/components/home/cta-cards';
import { FeaturedDestinations } from '@/components/home/featured-destinations';
import { SocialProof } from '@/components/home/social-proof';
import { SectionHeading } from '@/components/ui/section-heading';
import { Section } from '@/components/ui/page-shell';

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* CTA Cards */}
      <Section className="-mt-20 relative z-10 bg-transparent">
        <CTACards />
      </Section>

      {/* Featured Destinations */}
      <Section>
        <div className="mb-6">
          <PersonaToggle />
        </div>
        <SectionHeading
          title="Featured Destinations"
          subtitle="Handpicked experiences tailored to your travel style"
        />
        <FeaturedDestinations />
      </Section>

      {/* Social Proof */}
      <Section dark>
        <SectionHeading
          title="Travelers Love Tugende"
          subtitle="Experiences from people who discovered Uganda their way"
          light
        />
        <SocialProof />
      </Section>

      <Footer />
    </>
  );
}
