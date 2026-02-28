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
  parkFees: 40, // average UWA park entry fee per day
  miscBuffer: 0.1, // 10% buffer
};

export function calculateBudget(inputs: BudgetInputs): BudgetResult {
  const accommRate = RATES.accommodation[inputs.accommodationTier];
  const avgAccomm = (accommRate.min + accommRate.max) / 2;

  const transportDaily = RATES.transport[inputs.transportMode];
  const mealsTier = inputs.accommodationTier;
  const mealsDaily = RATES.meals[mealsTier];

  const activitiesCost = inputs.selectedActivities.length * 50; // rough average per activity
  const parkFeesTotal = inputs.includePermits ? RATES.parkFees * inputs.durationDays : 0;

  const dailyBase = avgAccomm + transportDaily + mealsDaily;
  const activitiesTotal = activitiesCost;
  const subtotal = dailyBase * inputs.durationDays + activitiesTotal + parkFeesTotal;
  const miscellaneous = Math.round(subtotal * RATES.miscBuffer);

  const perPerson: BudgetBreakdown = {
    accommodation: Math.round(avgAccomm * inputs.durationDays),
    transport: Math.round(transportDaily * inputs.durationDays),
    parkFees: parkFeesTotal,
    activities: activitiesTotal,
    meals: Math.round(mealsDaily * inputs.durationDays),
    miscellaneous,
    total: Math.round(subtotal + miscellaneous),
  };

  const totalGroup: BudgetBreakdown = {
    accommodation: perPerson.accommodation * inputs.travelers,
    transport: perPerson.transport, // transport is often shared
    parkFees: perPerson.parkFees * inputs.travelers,
    activities: perPerson.activities * inputs.travelers,
    meals: perPerson.meals * inputs.travelers,
    miscellaneous: perPerson.miscellaneous * inputs.travelers,
    total: 0,
  };
  totalGroup.total = Object.values(totalGroup).reduce((a, b) => a + b, 0) - totalGroup.total;

  return {
    perPerson,
    totalGroup,
    currency: 'USD',
    disclaimer: 'These are approximate estimates based on typical market rates. Actual costs vary by season, provider, and specific choices.',
  };
}
