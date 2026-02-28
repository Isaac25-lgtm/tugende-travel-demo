'use client';

import { useEffect, useCallback } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { TripWizard } from '@/components/planner/trip-wizard';
import { TripLoading } from '@/components/planner/trip-loading';
import { ItineraryReveal } from '@/components/planner/itinerary-reveal';
import { useTripStore } from '@/store/trip-store';
import type { QuizAnswers } from '@/types/quiz';

export default function PlannerPage() {
  const {
    isQuizComplete,
    isGenerating,
    itinerary,
    quizAnswers,
    setItinerary,
    setIsGenerating,
    setGenerationError,
  } = useTripStore();

  const generateTrip = useCallback(async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: quizAnswers as QuizAnswers }),
      });

      if (!response.ok) throw new Error('Generation failed');

      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (error) {
      console.error('Trip generation error:', error);
      setGenerationError('Failed to generate itinerary. Please try again.');
      // Still try to show something useful
      setIsGenerating(false);
    }
  }, [quizAnswers, setItinerary, setIsGenerating, setGenerationError]);

  useEffect(() => {
    if (isQuizComplete && isGenerating && !itinerary) {
      generateTrip();
    }
  }, [isQuizComplete, isGenerating, itinerary, generateTrip]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-bg-light">
        {!isQuizComplete && <TripWizard />}
        {isQuizComplete && isGenerating && !itinerary && <TripLoading />}
        {itinerary && <ItineraryReveal />}
      </main>
      <Footer />
    </>
  );
}
