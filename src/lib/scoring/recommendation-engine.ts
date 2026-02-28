import type { Destination } from '@/types/destination';
import type { QuizAnswers } from '@/types/quiz';
import { SCORING_WEIGHTS, DURATION_MAP, BUDGET_TO_PRICE_BAND } from './weights';

export interface ScoredDestination {
  destination: Destination;
  score: number;
  breakdown: {
    travelerType: number;
    budget: number;
    duration: number;
    season: number;
    interests: number;
    alignment: number;
  };
}

function scoreTravelerTypeMatch(dest: Destination, answers: QuizAnswers): number {
  const typeMapping: Record<string, string[]> = {
    'solo': ['adventure seekers', 'backpackers', 'photographers', 'solo travelers'],
    'couple': ['couples', 'relaxation seekers', 'luxury travelers'],
    'family': ['families', 'first-time visitors', 'family explorer'],
    'friends': ['friend groups', 'adventure seekers', 'backpackers'],
    'group': ['safari lovers', 'cultural travelers', 'group travelers'],
  };

  const relevantTypes = typeMapping[answers.groupType] || [];
  const matches = dest.bestFor.filter(bf =>
    relevantTypes.some(rt => bf.toLowerCase().includes(rt.toLowerCase()))
  );
  return Math.min(matches.length / Math.max(relevantTypes.length, 1), 1);
}

function scoreBudgetFit(dest: Destination, answers: QuizAnswers): number {
  const acceptableBands = BUDGET_TO_PRICE_BAND[answers.budgetStyle] || ['mid-range'];
  return acceptableBands.includes(dest.priceBand) ? 1 : 0.3;
}

function scoreDurationFit(dest: Destination, answers: QuizAnswers): number {
  const [tripMin, tripMax] = DURATION_MAP[answers.duration] || [3, 5];
  const [destMin, destMax] = dest.durationDays;

  // Perfect fit: destination fits within trip duration
  if (destMin <= tripMax && destMax >= tripMin) return 1;
  // Partial fit: destination is slightly outside trip range
  if (destMin <= tripMax + 1 || destMax >= tripMin - 1) return 0.5;
  return 0.2;
}

function scoreSeasonSuitability(dest: Destination, answers: QuizAnswers): number {
  if (!answers.travelMonth) return 0.7; // Flexible dates get neutral score
  return dest.bestMonths.includes(answers.travelMonth) ? 1 : 0.4;
}

function scoreInterestOverlap(dest: Destination, answers: QuizAnswers): number {
  if (!answers.interests || answers.interests.length === 0) return 0.5;
  const matches = answers.interests.filter(interest =>
    dest.categories.includes(interest)
  );
  return matches.length / answers.interests.length;
}

function scoreAlignment(dest: Destination, answers: QuizAnswers): number {
  const styleScores: Record<string, (d: Destination) => number> = {
    'backpacker': (d) => (6 - d.luxuryScore) / 5 * 0.5 + d.adventureScore / 5 * 0.5,
    'comfortable': (d) => (d.familyScore + d.luxuryScore) / 10,
    'luxury': (d) => d.luxuryScore / 5,
  };

  const scoreFn = styleScores[answers.travelStyle];
  return scoreFn ? scoreFn(dest) : 0.5;
}

export function scoreDestination(dest: Destination, answers: QuizAnswers): ScoredDestination {
  const breakdown = {
    travelerType: scoreTravelerTypeMatch(dest, answers),
    budget: scoreBudgetFit(dest, answers),
    duration: scoreDurationFit(dest, answers),
    season: scoreSeasonSuitability(dest, answers),
    interests: scoreInterestOverlap(dest, answers),
    alignment: scoreAlignment(dest, answers),
  };

  const score =
    breakdown.travelerType * SCORING_WEIGHTS.travelerTypeMatch +
    breakdown.budget * SCORING_WEIGHTS.budgetFit +
    breakdown.duration * SCORING_WEIGHTS.durationFit +
    breakdown.season * SCORING_WEIGHTS.seasonSuitability +
    breakdown.interests * SCORING_WEIGHTS.interestOverlap +
    breakdown.alignment * SCORING_WEIGHTS.scoreAlignment;

  return {
    destination: dest,
    score: Math.round(score * 100),
    breakdown,
  };
}

export function rankDestinations(
  destinations: Destination[],
  answers: QuizAnswers,
  limit: number = 7
): ScoredDestination[] {
  const scored = destinations.map(d => scoreDestination(d, answers));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}
