export const SCORING_WEIGHTS = {
  travelerTypeMatch: 0.25,
  budgetFit: 0.20,
  durationFit: 0.15,
  seasonSuitability: 0.15,
  interestOverlap: 0.15,
  scoreAlignment: 0.10,
} as const;

// Duration mapping from quiz values to day ranges
export const DURATION_MAP: Record<string, [number, number]> = {
  'weekend': [1, 2],
  '3-5-days': [3, 5],
  'one-week': [6, 8],
  'two-weeks': [10, 14],
};

// Budget style to price band mapping
export const BUDGET_TO_PRICE_BAND: Record<string, string[]> = {
  'budget': ['budget'],
  'mid-range': ['budget', 'mid-range'],
  'premium': ['mid-range', 'premium'],
  'luxury': ['premium'],
};
