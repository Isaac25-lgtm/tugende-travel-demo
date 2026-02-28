import { z } from 'zod';

// Flexible: accept string or array of strings, normalize to string
const flexibleString = z.union([z.string(), z.array(z.string())]).transform((val) =>
  Array.isArray(val) ? val.join(', ') : val
);

// Flexible: accept string or array, normalize to array
const flexibleStringArray = z.union([z.string(), z.array(z.string())]).transform((val) =>
  Array.isArray(val) ? val : [val]
);

export const itineraryDaySchema = z.object({
  dayNumber: z.number(),
  destinationId: z.string(),
  title: z.string(),
  activities: z.array(z.string()),
  estimatedCostUSD: z.object({
    min: z.number(),
    max: z.number(),
  }),
  travelNotes: z.string().nullable().optional(),
  whyThisFitsYou: z.string(),
  meals: flexibleString.nullable().optional(),
  accommodation: z.string().nullable().optional(),
  highlights: z.array(z.string()).nullable().optional(),
});

export const tripSummarySchema = z.object({
  totalBudgetUSD: z.object({
    min: z.number(),
    max: z.number(),
  }),
  totalDays: z.number(),
  bestValueHighlights: flexibleStringArray,
  bookingPriorities: flexibleStringArray,
  seasonalWarnings: flexibleStringArray.nullable().optional(),
  overallWhyThisTrip: z.string(),
});

export const alternativeSchema = z.object({
  type: z.enum(['budget', 'premium', 'short']),
  title: z.string(),
  description: z.string(),
  estimatedBudgetUSD: z.object({
    min: z.number(),
    max: z.number(),
  }),
  durationDays: z.number(),
  keyDifferences: flexibleStringArray,
  destinations: z.array(z.string()),
});

export const generatedItinerarySchema = z.object({
  days: z.array(itineraryDaySchema),
  summary: tripSummarySchema,
  alternatives: z.array(alternativeSchema),
});

export type GeneratedItineraryResponse = z.infer<typeof generatedItinerarySchema>;
