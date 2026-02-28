'use client';

import { Suspense, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { TripWizard } from '@/components/planner/trip-wizard';
import { TripLoading } from '@/components/planner/trip-loading';
import { ItineraryReveal } from '@/components/planner/itinerary-reveal';
import { Button } from '@/components/ui/button';
import { useTripStore } from '@/store/trip-store';
import type { QuizAnswers } from '@/types/quiz';

function PlannerContent() {
  const {
    isQuizComplete,
    isGenerating,
    itinerary,
    quizAnswers,
    generationError,
    setItinerary,
    setIsGenerating,
    setGenerationError,
    resetQuiz,
  } = useTripStore();

  const searchParams = useSearchParams();
  const heroQuery = searchParams.get('q');

  const generatingRef = useRef(false);

  const generateTrip = useCallback(async () => {
    if (generatingRef.current) return;
    generatingRef.current = true;
    try {
      setIsGenerating(true);
      setGenerationError(null);
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: quizAnswers as QuizAnswers, heroQuery: heroQuery || undefined }),
      });

      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate itinerary. Please try again.');
      }

      const data = await response.json();
      if (!data.itinerary || !data.itinerary.days?.length) {
        throw new Error('The AI returned an incomplete itinerary. Please try again.');
      }
      setItinerary(data.itinerary);
    } catch (error) {
      console.error('Trip generation error:', error);
      setGenerationError(
        error instanceof Error ? error.message : 'Failed to generate itinerary. Please try again.'
      );
    } finally {
      generatingRef.current = false;
    }
  }, [quizAnswers, heroQuery, setItinerary, setIsGenerating, setGenerationError]);

  // Trigger generation when quiz is complete and no itinerary exists
  useEffect(() => {
    if (isQuizComplete && !itinerary && !generationError) {
      generateTrip();
    }
  }, [isQuizComplete, itinerary, generationError, generateTrip]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-bg-light">
        {/* Hero query context banner */}
        {!isQuizComplete && heroQuery && (
          <div className="max-w-2xl mx-auto px-4 pt-6">
            <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 text-center">
              <p className="text-sm text-text-secondary">
                Planning for: <span className="font-semibold text-text-primary">&ldquo;{heroQuery}&rdquo;</span>
              </p>
            </div>
          </div>
        )}

        {/* Wizard */}
        {!isQuizComplete && <TripWizard />}

        {/* Loading */}
        {isQuizComplete && isGenerating && !itinerary && !generationError && <TripLoading />}

        {/* Error state */}
        {isQuizComplete && !isGenerating && !itinerary && generationError && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
              <h2 className="font-display text-xl font-bold text-red-800 mb-2">
                Something went wrong
              </h2>
              <p className="text-red-700 text-sm mb-6">{generationError}</p>
              <div className="flex gap-3 justify-center">
                <Button variant="primary" onClick={() => {
                  setGenerationError(null);
                  setIsGenerating(true);
                }}>
                  Try Again
                </Button>
                <Button variant="outline" onClick={resetQuiz}>
                  Start Over
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Itinerary reveal */}
        {itinerary && <ItineraryReveal />}
      </main>
      <Footer />
    </>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-light" />}>
      <PlannerContent />
    </Suspense>
  );
}
