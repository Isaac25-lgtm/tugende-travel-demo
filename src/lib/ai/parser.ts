import { generatedItinerarySchema, type GeneratedItineraryResponse } from './schemas';

export function parseItineraryResponse(rawText: string): GeneratedItineraryResponse | null {
  try {
    // Try to extract JSON from the response (handle markdown code blocks)
    let jsonStr = rawText.trim();

    // Remove markdown code block wrapper if present
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const parsed = JSON.parse(jsonStr);
    const validated = generatedItinerarySchema.parse(parsed);
    return validated;
  } catch (error) {
    console.error('Failed to parse itinerary response:', error);

    // Try a more aggressive extraction
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const validated = generatedItinerarySchema.parse(parsed);
        return validated;
      }
    } catch {
      // Final fallback
      console.error('All parsing attempts failed');
    }

    return null;
  }
}
