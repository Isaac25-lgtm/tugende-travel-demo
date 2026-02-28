export type AccommodationTier = 'budget' | 'mid-range' | 'premium';
export type TransportMode = 'public' | 'shared' | 'private';

export interface BudgetInputs {
  travelers: number;
  durationDays: number;
  accommodationTier: AccommodationTier;
  transportMode: TransportMode;
  selectedActivities: string[];
  includePermits: boolean;
}

export interface BudgetBreakdown {
  accommodation: number;
  transport: number;
  parkFees: number;
  activities: number;
  meals: number;
  miscellaneous: number;
  total: number;
}

export interface BudgetResult {
  perPerson: BudgetBreakdown;
  totalGroup: BudgetBreakdown;
  currency: 'USD';
  disclaimer: string;
}
