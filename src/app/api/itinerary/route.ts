import { NextResponse } from 'next/server';
import type { QuizAnswers } from '@/types/quiz';
import { destinations } from '@/data/seed-destinations';
import { rankDestinations } from '@/lib/scoring/recommendation-engine';
import { generateItinerary } from '@/lib/ai/gemini';
import { findCachedItinerary } from '@/data/cached-itineraries';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const answers: QuizAnswers = body.answers;

    if (!answers || !answers.origin || !answers.groupType) {
      return NextResponse.json({ error: 'Invalid quiz answers' }, { status: 400 });
    }

    // Step 1: Score and rank destinations
    const ranked = rankDestinations(destinations, answers, 7);

    // Step 2: Try Gemini AI generation (Level 1 fallback)
    let itinerary = await generateItinerary(answers, ranked);

    // Step 3: If AI fails, use cached itinerary (Level 2 fallback)
    if (!itinerary) {
      console.log('Gemini failed, falling back to cached itinerary');
      const profileKey = `${answers.interests?.[0] || 'adventure'}-${answers.groupType}-${answers.duration === 'one-week' ? 'week' : answers.duration}`;
      itinerary = findCachedItinerary(profileKey);
    }

    // Step 4: If cached fails, build rule-based (Level 3 fallback)
    if (!itinerary) {
      console.log('Cached fallback failed, using rule-based generation');
      itinerary = buildRuleBasedItinerary(ranked, answers);
    }

    return NextResponse.json({
      itinerary: {
        id: `trip-${Date.now()}`,
        ...itinerary,
        generatedAt: new Date().toISOString(),
        profileUsed: `${answers.groupType}-${answers.budgetStyle}-${answers.duration}`,
      },
      rankedDestinations: ranked.map(r => ({
        id: r.destination.id,
        name: r.destination.name,
        score: r.score,
      })),
    });
  } catch (error) {
    console.error('Itinerary generation error:', error);
    return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 });
  }
}

// Level 3: Rule-based itinerary from scored data
function buildRuleBasedItinerary(ranked: ReturnType<typeof rankDestinations>, answers: QuizAnswers) {
  const durationMap: Record<string, number> = {
    'weekend': 2,
    '3-5-days': 4,
    'one-week': 7,
    'two-weeks': 12,
  };
  const totalDays = durationMap[answers.duration] || 5;
  const topDestinations = ranked.slice(0, Math.min(totalDays, 5));

  let dayCounter = 1;
  const days = topDestinations.map((sd) => {
    const d = sd.destination;
    const stayDays = Math.max(1, Math.min(d.durationDays[0], totalDays - dayCounter + 1));
    const dayEntries = [];

    for (let i = 0; i < stayDays && dayCounter <= totalDays; i++) {
      dayEntries.push({
        dayNumber: dayCounter,
        destinationId: d.id,
        title: i === 0 ? `Arrive at ${d.name}` : `Explore ${d.name}`,
        activities: d.activities.slice(0, 3).map(a => a.name),
        estimatedCostUSD: {
          min: d.dailyBudget.midRange.min,
          max: d.dailyBudget.midRange.max,
        },
        travelNotes: i === 0 ? `${d.transportFromKampala.durationHours}h from previous stop` : undefined,
        whyThisFitsYou: `Based on your interest in ${answers.interests?.join(' and ') || 'exploration'}, ${d.name} is an excellent match.`,
        meals: 'Local cuisine',
        accommodation: `${answers.budgetStyle} accommodation`,
      });
      dayCounter++;
    }
    return dayEntries;
  }).flat();

  return {
    days,
    summary: {
      totalBudgetUSD: {
        min: days.reduce((sum, d) => sum + d.estimatedCostUSD.min, 0),
        max: days.reduce((sum, d) => sum + d.estimatedCostUSD.max, 0),
      },
      totalDays,
      bestValueHighlights: topDestinations.slice(0, 3).map(sd => sd.destination.whyGoHere),
      bookingPriorities: topDestinations
        .filter(sd => sd.destination.permitRequired)
        .map(sd => `Book ${sd.destination.name} permits in advance`),
      overallWhyThisTrip: `A curated ${totalDays}-day ${answers.groupType} trip through Uganda's best destinations for ${answers.interests?.join(', ') || 'diverse experiences'}.`,
    },
    alternatives: [
      {
        type: 'budget' as const,
        title: 'Budget Alternative',
        description: 'Same great destinations with budget-friendly options.',
        estimatedBudgetUSD: { min: Math.round(days.reduce((s, d) => s + d.estimatedCostUSD.min, 0) * 0.6), max: Math.round(days.reduce((s, d) => s + d.estimatedCostUSD.max, 0) * 0.6) },
        durationDays: totalDays,
        keyDifferences: ['Budget camping', 'Shared transport', 'Fewer paid activities'],
        destinations: topDestinations.map(sd => sd.destination.id),
      },
      {
        type: 'premium' as const,
        title: 'Premium Upgrade',
        description: 'Luxury lodges and private guides throughout.',
        estimatedBudgetUSD: { min: Math.round(days.reduce((s, d) => s + d.estimatedCostUSD.min, 0) * 2), max: Math.round(days.reduce((s, d) => s + d.estimatedCostUSD.max, 0) * 2.5) },
        durationDays: totalDays,
        keyDifferences: ['Premium lodges', 'Private vehicle', 'Exclusive experiences'],
        destinations: topDestinations.map(sd => sd.destination.id),
      },
      {
        type: 'short' as const,
        title: 'Quick Escape',
        description: 'A shorter version hitting the top highlights.',
        estimatedBudgetUSD: { min: Math.round(days.reduce((s, d) => s + d.estimatedCostUSD.min, 0) * 0.4), max: Math.round(days.reduce((s, d) => s + d.estimatedCostUSD.max, 0) * 0.4) },
        durationDays: Math.max(2, Math.floor(totalDays / 2)),
        keyDifferences: ['Fewer destinations', 'Less driving', 'More focused'],
        destinations: topDestinations.slice(0, 2).map(sd => sd.destination.id),
      },
    ],
  };
}
