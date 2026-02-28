import type { QuizAnswers } from '@/types/quiz';
import type { ScoredDestination } from '@/lib/scoring/recommendation-engine';
import type { GeneratedItineraryResponse } from './schemas';
import { buildSystemPrompt, buildUserPrompt } from './prompts';
import { parseItineraryResponse } from './parser';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export async function generateItinerary(
  answers: QuizAnswers,
  rankedDestinations: ScoredDestination[]
): Promise<GeneratedItineraryResponse | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    return null;
  }

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(answers, rankedDestinations);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', response.status, await response.text());
      return null;
    }

    const data: GeminiResponse = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error('No text in Gemini response');
      return null;
    }

    return parseItineraryResponse(rawText);
  } catch (error) {
    console.error('Gemini API call failed:', error);
    return null;
  }
}
