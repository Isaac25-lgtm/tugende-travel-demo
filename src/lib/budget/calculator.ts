import type { BudgetInputs, BudgetBreakdown, BudgetResult } from '@/types/budget';

const RATES = {
  accommodation: {
    'budget': { min: 15, max: 35 },
    'mid-range': { min: 80, max: 180 },
    'premium': { min: 250, max: 600 },
  },
  transport: {
    'public': 15,
    'shared': 40,
    'private': 120,
  },
  meals: {
    'budget': 15,
    'mid-range': 35,
    'premium': 70,
  },
  parkFees: 40,
  miscBuffer: 0.1,
};

// Real activity costs based on Uganda market rates (USD)
const ACTIVITY_COSTS: Record<string, number> = {
  'bwi-gorilla-trek': 700,
  'mg-gorilla': 700,
  'mg-golden-monkey': 100,
  'kb-chimp-trek': 200,
  'kb-chimp-hab': 250,
  'ji-rafting': 137,
  'ji-bungee': 115,
  'ji-horseback': 60,
  'en-ngamba': 92,
  'zr-rhino-track': 50,
  'rw-central-circuit': 2000,
};
const DEFAULT_ACTIVITY_COST = 50;

export function calculateBudget(inputs: BudgetInputs): BudgetResult {
  const accommRate = RATES.accommodation[inputs.accommodationTier];
  const avgAccomm = (accommRate.min + accommRate.max) / 2;

  const transportDaily = RATES.transport[inputs.transportMode];
  const mealsTier = inputs.accommodationTier;
  const mealsDaily = RATES.meals[mealsTier];

  const activitiesCost = (inputs.selectedActivities || []).reduce(
    (sum, id) => sum + (ACTIVITY_COSTS[id] || DEFAULT_ACTIVITY_COST),
    0
  );
  const parkFeesTotal = inputs.includePermits ? RATES.parkFees * inputs.durationDays : 0;

  const dailyBase = avgAccomm + transportDaily + mealsDaily;
  const subtotal = dailyBase * inputs.durationDays + activitiesCost + parkFeesTotal;
  const miscellaneous = Math.round(subtotal * RATES.miscBuffer);

  const perPerson: BudgetBreakdown = {
    accommodation: Math.round(avgAccomm * inputs.durationDays),
    transport: Math.round(transportDaily * inputs.durationDays),
    parkFees: parkFeesTotal,
    activities: activitiesCost,
    meals: Math.round(mealsDaily * inputs.durationDays),
    miscellaneous,
    total: Math.round(subtotal + miscellaneous),
  };

  const totalGroup: BudgetBreakdown = {
    accommodation: perPerson.accommodation * inputs.travelers,
    transport: perPerson.transport * inputs.travelers,
    parkFees: perPerson.parkFees * inputs.travelers,
    activities: perPerson.activities * inputs.travelers,
    meals: perPerson.meals * inputs.travelers,
    miscellaneous: perPerson.miscellaneous * inputs.travelers,
    total: 0,
  };
  totalGroup.total = totalGroup.accommodation + totalGroup.transport + totalGroup.parkFees
    + totalGroup.activities + totalGroup.meals + totalGroup.miscellaneous;

  return {
    perPerson,
    totalGroup,
    currency: 'USD',
    disclaimer: 'These are approximate estimates based on typical market rates. Actual costs vary by season, provider, and specific choices. Gorilla trekking permits are $700 per person as set by Uganda Wildlife Authority.',
  };
}
