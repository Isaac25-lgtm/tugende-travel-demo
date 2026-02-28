import type { Destination } from '@/types/destination';
import type { QuizAnswers } from '@/types/quiz';
import type { ScoredDestination } from './recommendation-engine';
import { scoreDestination } from './recommendation-engine';

export interface AlternativeSet {
  budget: ScoredDestination[];
  premium: ScoredDestination[];
  short: ScoredDestination[];
}

export function generateAlternatives(
  allDestinations: Destination[],
  primarySelection: ScoredDestination[],
  answers: QuizAnswers
): AlternativeSet {
  const primaryIds = new Set(primarySelection.map(s => s.destination.id));
  const remaining = allDestinations.filter(d => !primaryIds.has(d.id));

  // Budget alternative: swap expensive destinations for cheaper ones
  const budgetAnswers: QuizAnswers = { ...answers, budgetStyle: 'budget', travelStyle: 'backpacker' };
  const budgetScored = remaining
    .filter(d => d.priceBand === 'budget')
    .map(d => scoreDestination(d, budgetAnswers))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Premium alternative: swap budget destinations for premium ones
  const premiumAnswers: QuizAnswers = { ...answers, budgetStyle: 'luxury', travelStyle: 'luxury' };
  const premiumScored = remaining
    .filter(d => d.priceBand === 'premium' || d.priceBand === 'mid-range')
    .map(d => scoreDestination(d, premiumAnswers))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Short alternative: destinations with shortest duration fit
  const shortAnswers: QuizAnswers = { ...answers, duration: 'weekend' };
  const shortScored = allDestinations
    .filter(d => d.durationDays[0] <= 2)
    .map(d => scoreDestination(d, shortAnswers))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return {
    budget: budgetScored,
    premium: premiumScored,
    short: shortScored,
  };
}
