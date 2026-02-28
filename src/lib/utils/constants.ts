export const SITE_NAME = 'Tugende';
export const SITE_TAGLINE = 'Uganda\'s AI Travel Companion';
export const SITE_DESCRIPTION = 'Discover Uganda intelligently. Plan based on your style and budget. Decide with visual confidence.';

export const CATEGORY_COLORS: Record<string, string> = {
  wildlife: '#2D6A4F',
  adventure: '#E07A38',
  culture: '#7B2D8B',
  relaxation: '#3B82F6',
  family: '#D4A03C',
  nature: '#1B4332',
  photography: '#6366F1',
};

export const CATEGORY_LABELS: Record<string, string> = {
  wildlife: 'Wildlife',
  adventure: 'Adventure',
  culture: 'Culture',
  relaxation: 'Relaxation',
  family: 'Family',
  nature: 'Nature',
  photography: 'Photography',
};

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Easy',
  2: 'Moderate',
  3: 'Challenging',
  4: 'Demanding',
  5: 'Extreme',
};

export const PRICE_BAND_LABELS: Record<string, string> = {
  budget: 'Budget',
  'mid-range': 'Mid-Range',
  premium: 'Premium',
};

export const MAPBOX_CENTER: [number, number] = [32.29, 1.37]; // Uganda center [lng, lat]
export const MAPBOX_ZOOM = 6.5;

export const LOADING_MESSAGES = [
  'Exploring trails through Bwindi...',
  'Checking seasonal conditions for your dates...',
  'Scanning lodges that match your style...',
  'Mapping scenic routes across Uganda...',
  'Designing a trip around your budget...',
  'Finding the best wildlife viewing spots...',
  'Curating your perfect Uganda adventure...',
];
