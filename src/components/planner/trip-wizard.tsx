'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Home, User, Users, Heart, Tent, Clock, Wallet, Camera, TreePine, Compass, Palmtree, Mountain, Sparkles, Calendar, Crown, Backpack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WizardStep } from './wizard-step';
import { useTripStore } from '@/store/trip-store';
import type { QuizAnswers } from '@/types/quiz';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface StepConfig {
  id: string;
  title: string;
  subtitle: string;
  field: keyof QuizAnswers;
  multiSelect?: boolean;
  options: Array<{ value: string; label: string; description?: string; icon?: React.ReactNode }>;
}

const steps: StepConfig[] = [
  {
    id: 'origin',
    title: 'Where are you traveling from?',
    subtitle: 'This helps us tailor pricing, content, and recommendations',
    field: 'origin',
    options: [
      { value: 'international', label: 'International', description: 'Visiting Uganda from abroad', icon: <Globe className="w-5 h-5" /> },
      { value: 'ugandan', label: 'Ugandan', description: 'Exploring my own country', icon: <Home className="w-5 h-5" /> },
    ],
  },
  {
    id: 'group',
    title: 'Who\'s coming along?',
    subtitle: 'We\'ll match destinations to your group\'s needs',
    field: 'groupType',
    options: [
      { value: 'solo', label: 'Solo', description: 'Just me', icon: <User className="w-5 h-5" /> },
      { value: 'couple', label: 'Couple', description: 'Romantic getaway', icon: <Heart className="w-5 h-5" /> },
      { value: 'family', label: 'Family', description: 'With children', icon: <Users className="w-5 h-5" /> },
      { value: 'friends', label: 'Friends', description: 'Group adventure', icon: <Tent className="w-5 h-5" /> },
    ],
  },
  {
    id: 'duration',
    title: 'How long is your trip?',
    subtitle: 'We\'ll design an itinerary that fits your timeline',
    field: 'duration',
    options: [
      { value: 'weekend', label: 'Weekend', description: '1–2 days', icon: <Clock className="w-5 h-5" /> },
      { value: '3-5-days', label: '3–5 Days', description: 'Short break', icon: <Clock className="w-5 h-5" /> },
      { value: 'one-week', label: 'One Week', description: '6–8 days', icon: <Calendar className="w-5 h-5" /> },
      { value: 'two-weeks', label: 'Two Weeks', description: '10–14 days', icon: <Calendar className="w-5 h-5" /> },
    ],
  },
  {
    id: 'budget',
    title: 'What\'s your budget style?',
    subtitle: 'We\'ll match accommodation, transport, and activities accordingly',
    field: 'budgetStyle',
    options: [
      { value: 'budget', label: 'Budget', description: 'Camping, hostels, public transport', icon: <Backpack className="w-5 h-5" /> },
      { value: 'mid-range', label: 'Mid-Range', description: 'Comfortable lodges, private transport', icon: <Wallet className="w-5 h-5" /> },
      { value: 'premium', label: 'Premium', description: 'Luxury lodges, private guides', icon: <Crown className="w-5 h-5" /> },
    ],
  },
  {
    id: 'interests',
    title: 'What excites you most?',
    subtitle: 'Select all the experiences you\'re drawn to',
    field: 'interests',
    multiSelect: true,
    options: [
      { value: 'wildlife', label: 'Wildlife & Safari', icon: <TreePine className="w-5 h-5" /> },
      { value: 'adventure', label: 'Adventure', icon: <Mountain className="w-5 h-5" /> },
      { value: 'culture', label: 'Culture', icon: <Compass className="w-5 h-5" /> },
      { value: 'relaxation', label: 'Relaxation', icon: <Palmtree className="w-5 h-5" /> },
      { value: 'nature', label: 'Nature & Scenery', icon: <TreePine className="w-5 h-5" /> },
      { value: 'photography', label: 'Photography', icon: <Camera className="w-5 h-5" /> },
    ],
  },
  {
    id: 'month',
    title: 'When are you planning to travel?',
    subtitle: 'We\'ll check seasonal conditions and suggest the best timing',
    field: 'travelMonth',
    options: MONTHS.map((m, i) => ({ value: String(i + 1), label: m, description: '' })),
  },
  {
    id: 'style',
    title: 'What\'s your travel comfort level?',
    subtitle: 'This shapes your accommodation and activity recommendations',
    field: 'travelStyle',
    options: [
      { value: 'backpacker', label: 'Backpacker', description: 'I\'m happy roughing it', icon: <Backpack className="w-5 h-5" /> },
      { value: 'comfortable', label: 'Comfortable', description: 'Nice but not extravagant', icon: <Wallet className="w-5 h-5" /> },
      { value: 'luxury', label: 'Luxury', description: 'The best available', icon: <Crown className="w-5 h-5" /> },
    ],
  },
];

export function TripWizard() {
  const { quizAnswers, currentStep, setQuizAnswer, nextStep, prevStep, completeQuiz, setIsGenerating } = useTripStore();
  const [direction, setDirection] = useState(1);
  const totalSteps = steps.length;
  const currentConfig = steps[currentStep];

  const handleSelect = useCallback((value: string) => {
    const field = currentConfig.field;

    if (currentConfig.multiSelect) {
      const current = (quizAnswers[field] as string[] | undefined) || [];
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setQuizAnswer(field as any, updated as any);
    } else if (field === 'travelMonth') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setQuizAnswer(field as any, Number(value) as any);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setQuizAnswer(field as any, value as any);
    }
  }, [currentConfig, quizAnswers, setQuizAnswer]);

  const canProceed = () => {
    const value = quizAnswers[currentConfig.field];
    if (currentConfig.multiSelect) return Array.isArray(value) && value.length > 0;
    return value !== undefined;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      nextStep();
    } else {
      completeQuiz();
      setIsGenerating(true);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-100">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Step Counter */}
      <div className="text-center pt-6 pb-2">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center py-6">
        <AnimatePresence mode="wait" initial={false}>
          <WizardStep
            key={currentConfig.id}
            title={currentConfig.title}
            subtitle={currentConfig.subtitle}
            options={currentConfig.options}
            selected={
              currentConfig.field === 'travelMonth' && typeof quizAnswers.travelMonth === 'number'
                ? String(quizAnswers.travelMonth)
                : quizAnswers[currentConfig.field] as string | string[] | undefined
            }
            onSelect={handleSelect}
            multiSelect={currentConfig.multiSelect}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-4 py-6 max-w-2xl mx-auto w-full">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Button
          variant={currentStep === totalSteps - 1 ? 'cta' : 'primary'}
          onClick={handleNext}
          disabled={!canProceed()}
          className="gap-2"
        >
          {currentStep === totalSteps - 1 ? (
            <>
              <Sparkles className="w-4 h-4" />
              Generate My Trip
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
