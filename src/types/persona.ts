export type PersonaType = 'international' | 'ugandan';

export type TravelerType =
  | 'adventure-seeker'
  | 'family-explorer'
  | 'luxury-traveler'
  | 'budget-backpacker'
  | 'cultural-enthusiast'
  | 'weekend-escapist';

export interface PersonaConfig {
  type: PersonaType;
  currency: 'USD' | 'UGX';
  featuredDestinations: string[];
  heroHeadline: string;
  heroSubtext: string;
  ctaText: string;
}
