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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        signal: controller.signal,
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
    clearTimeout(timeoutId);

    if (!response.ok) {
      const status = response.status;
      const errorText = await response.text();
      if (status === 429) {
        console.error('Gemini API rate limited');
      } else {
        console.error('Gemini API error:', status, errorText);
      }
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
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Gemini API timed out after 30s');
    } else {
      console.error('Gemini API call failed:', error);
    }
    return null;
  }
}
