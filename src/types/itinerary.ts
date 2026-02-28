import type { Destination } from './destination';

export interface ItineraryDay {
  dayNumber: number;
  destinationId: string;
  destination?: Destination;
  title: string;
  activities: string[];
  estimatedCostUSD: { min: number; max: number };
  travelNotes?: string;
  whyThisFitsYou: string;
  meals?: string;
  accommodation?: string;
  highlights?: string[];
}

export interface TripSummary {
  totalBudgetUSD: { min: number; max: number };
  totalDays: number;
  bestValueHighlights: string[];
  bookingPriorities: string[];
  seasonalWarnings?: string[];
  overallWhyThisTrip: string;
}

export interface AlternativeSuggestion {
  type: 'budget' | 'premium' | 'short';
  title: string;
  description: string;
  estimatedBudgetUSD: { min: number; max: number };
  durationDays: number;
  keyDifferences: string[];
  destinations: string[];
}

export interface GeneratedItinerary {
  id: string;
  days: ItineraryDay[];
  summary: TripSummary;
  alternatives: AlternativeSuggestion[];
  generatedAt: string;
  profileUsed: string;
}
