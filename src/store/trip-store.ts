import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { QuizAnswers } from '@/types/quiz';
import type { GeneratedItinerary } from '@/types/itinerary';

interface TripState {
  // Quiz
  quizAnswers: Partial<QuizAnswers>;
  currentStep: number;
  isQuizComplete: boolean;

  // Results
  itinerary: GeneratedItinerary | null;
  isGenerating: boolean;
  generationError: string | null;

  // Actions
  setQuizAnswer: <K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  setItinerary: (itinerary: GeneratedItinerary) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setGenerationError: (error: string | null) => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      quizAnswers: {},
      currentStep: 0,
      isQuizComplete: false,
      itinerary: null,
      isGenerating: false,
      generationError: null,

      setQuizAnswer: (field, value) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [field]: value },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      completeQuiz: () => set({ isQuizComplete: true }),
      resetQuiz: () =>
        set({
          quizAnswers: {},
          currentStep: 0,
          isQuizComplete: false,
          itinerary: null,
          isGenerating: false,
          generationError: null,
        }),
      setItinerary: (itinerary) => set({ itinerary, isGenerating: false }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setGenerationError: (error) => set({ generationError: error, isGenerating: false }),
    }),
    {
      name: 'tugende-trip',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        quizAnswers: state.quizAnswers,
        currentStep: state.currentStep,
        isQuizComplete: state.isQuizComplete,
      }),
    }
  )
);
