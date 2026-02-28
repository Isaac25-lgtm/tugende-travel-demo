export type TravelerOrigin = 'international' | 'ugandan';
export type GroupType = 'solo' | 'couple' | 'family' | 'friends' | 'group';
export type TripDuration = 'weekend' | '3-5-days' | 'one-week' | 'two-weeks';
export type BudgetStyle = 'budget' | 'mid-range' | 'premium' | 'luxury';
export type TravelInterest = 'wildlife' | 'adventure' | 'culture' | 'relaxation' | 'nature' | 'photography';
export type TravelStyle = 'backpacker' | 'comfortable' | 'luxury';

export interface QuizAnswers {
  origin: TravelerOrigin;
  groupType: GroupType;
  duration: TripDuration;
  budgetStyle: BudgetStyle;
  interests: TravelInterest[];
  travelMonth?: number;
  travelStyle: TravelStyle;
}

export interface QuizStep {
  id: string;
  title: string;
  subtitle: string;
  type: 'single' | 'multi' | 'slider';
  field: keyof QuizAnswers;
}
