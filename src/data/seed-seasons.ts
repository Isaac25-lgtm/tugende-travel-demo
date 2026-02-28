import type { SeasonData } from '@/types/destination';

// Generic season templates for Uganda's two dry seasons (Jun-Sep, Dec-Feb) and two wet seasons (Mar-May, Oct-Nov)
export function getDefaultSeasonData(bestMonths: number[]): SeasonData[] {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const isDry = [1, 2, 6, 7, 8, 9, 12].includes(month);
    const isPeakWet = [4, 5, 10, 11].includes(month);
    const isBest = bestMonths.includes(month);

    return {
      month,
      weatherScore: isDry ? 4 : isPeakWet ? 2 : 3,
      wildlifeScore: isDry ? 4 : 3,
      crowdLevel: isBest && isDry ? 4 : isDry ? 3 : 2,
      recommended: isBest,
      notes: isDry
        ? 'Dry season — good conditions for most activities'
        : isPeakWet
        ? 'Rainy season — some roads may be difficult, fewer crowds'
        : 'Transitional season — occasional rain, moderate conditions',
    };
  });
}

// Destination-specific overrides
export const seasonOverrides: Record<string, Partial<SeasonData>[]> = {
  'bwindi-impenetrable': [
    { month: 6, notes: 'Peak gorilla trekking season — book permits early', crowdLevel: 5 },
    { month: 7, notes: 'Peak gorilla trekking season — excellent conditions', crowdLevel: 5 },
    { month: 8, notes: 'Peak gorilla trekking season — dry trails', crowdLevel: 5 },
    { month: 3, notes: 'Shoulder season — lower permit demand, occasional rain', crowdLevel: 2 },
  ],
  'jinja': [
    { month: 1, notes: 'Great rafting conditions year-round', weatherScore: 4 },
    { month: 4, notes: 'Slightly higher water levels — exciting rapids', weatherScore: 3 },
  ],
  'kidepo-valley': [
    { month: 11, notes: 'Dry season in Kidepo — wildlife concentrates at water', wildlifeScore: 5, weatherScore: 4 },
    { month: 12, notes: 'Excellent game viewing — dry and wildlife-rich', wildlifeScore: 5, weatherScore: 4 },
    { month: 1, notes: 'Peak dry season — best wildlife viewing', wildlifeScore: 5, weatherScore: 5 },
    { month: 2, notes: 'Peak dry season — outstanding conditions', wildlifeScore: 5, weatherScore: 5 },
  ],
};
