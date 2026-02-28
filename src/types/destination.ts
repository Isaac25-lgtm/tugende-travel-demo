export type Region = 'Western' | 'Eastern' | 'Northern' | 'Central';
export type PriceBand = 'budget' | 'mid-range' | 'premium';
export type DestinationCategory = 'wildlife' | 'adventure' | 'culture' | 'relaxation' | 'family' | 'nature' | 'photography';

export interface DailyBudget {
  budget: { min: number; max: number };
  midRange: { min: number; max: number };
  premium: { min: number; max: number };
}

export interface TransportFromKampala {
  durationHours: number;
  distanceKm: number;
  modes: string[];
  notes?: string;
}

export interface Activity {
  id: string;
  name: string;
  category: DestinationCategory;
  difficulty: number;
  costBand: PriceBand;
  durationHours: number;
  description: string;
  permitRequired?: boolean;
  costEstimateUSD?: { min: number; max: number };
}

export interface SeasonData {
  month: number;
  weatherScore: number;
  wildlifeScore: number;
  crowdLevel: number;
  recommended: boolean;
  notes?: string;
}

export interface Destination {
  id: string;
  name: string;
  region: Region;
  coordinates: [number, number];
  categories: DestinationCategory[];
  priceBand: PriceBand;
  bestMonths: number[];
  durationDays: [number, number];
  difficulty: number;
  familyScore: number;
  adventureScore: number;
  luxuryScore: number;
  cultureScore: number;
  wildlifeScore: number;
  activities: Activity[];
  transportFromKampala: TransportFromKampala;
  summary: string;
  whyGoHere: string;
  tips: string[];
  heroImage: string;
  galleryImages?: string[];
  dailyBudget: DailyBudget;
  permitRequired: boolean;
  bestFor: string[];
  seasonData?: SeasonData[];
}
