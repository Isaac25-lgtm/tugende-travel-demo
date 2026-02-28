import type { QuizAnswers } from '@/types/quiz';
import type { ScoredDestination } from '@/lib/scoring/recommendation-engine';

export function buildSystemPrompt(): string {
  return `You are Tugende, an expert AI Uganda travel planner. You create personalized trip itineraries based on traveler preferences and a curated database of Uganda destinations.

CRITICAL RULES:
1. ONLY reference destinations that are provided in the shortlist. Never invent destinations.
2. Return ONLY valid JSON matching the exact schema provided. No markdown, no explanations outside JSON.
3. Budget estimates must be realistic ranges, clearly labeled as approximate.
4. Sequence destinations logically based on geography to minimize travel time.
5. Include honest travel time estimates between stops.
6. Mention difficulty levels and physical requirements where relevant.
7. Personalize the "whyThisFitsYou" notes based on the traveler's stated preferences.
8. If a destination requires permits, mention it in travelNotes.

OUTPUT FORMAT:
Return a single JSON object with this structure:
{
  "days": [{ dayNumber, destinationId, title, activities, estimatedCostUSD: {min, max}, travelNotes, whyThisFitsYou, meals, accommodation, highlights }],
  "summary": { totalBudgetUSD: {min, max}, totalDays, bestValueHighlights, bookingPriorities, seasonalWarnings, overallWhyThisTrip },
  "alternatives": [{ type: "budget"|"premium"|"short", title, description, estimatedBudgetUSD: {min, max}, durationDays, keyDifferences, destinations }]
}`;
}

export function buildUserPrompt(answers: QuizAnswers, rankedDestinations: ScoredDestination[]): string {
  const destList = rankedDestinations.map((sd, i) => {
    const d = sd.destination;
    return `${i + 1}. ${d.name} (ID: ${d.id})
   Region: ${d.region} | Score: ${sd.score}/100
   Categories: ${d.categories.join(', ')}
   Duration: ${d.durationDays[0]}-${d.durationDays[1]} days
   Price Band: ${d.priceBand}
   Best Months: ${d.bestMonths.join(', ')}
   Key Activities: ${d.activities.map(a => a.name).join(', ')}
   Transport from Kampala: ${d.transportFromKampala.durationHours}h
   Summary: ${d.summary}
   Daily Budget: $${d.dailyBudget.midRange.min}-$${d.dailyBudget.midRange.max}/day mid-range
   Permit Required: ${d.permitRequired ? 'Yes' : 'No'}`;
  }).join('\n\n');

  const durationMap: Record<string, string> = {
    'weekend': '2 days',
    '3-5-days': '4 days',
    'one-week': '7 days',
    'two-weeks': '12 days',
  };

  return `TRAVELER PROFILE:
- Origin: ${answers.origin}
- Group: ${answers.groupType}
- Duration: ${durationMap[answers.duration] || answers.duration}
- Budget Style: ${answers.budgetStyle}
- Interests: ${answers.interests.join(', ')}
- Travel Month: ${answers.travelMonth ? `Month ${answers.travelMonth}` : 'Flexible'}
- Style: ${answers.travelStyle}

RANKED DESTINATION SHORTLIST (use these only):
${destList}

Create a personalized ${durationMap[answers.duration] || answers.duration} itinerary for this ${answers.groupType} traveler.
Include 3 alternatives: one budget option, one premium upgrade, and one shorter option.
Make the "whyThisFitsYou" deeply personal to their stated preferences.
Return ONLY the JSON object, no other text.`;
}
