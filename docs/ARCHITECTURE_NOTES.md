# Tugende — Architecture Notes

## Data Flow
User Quiz → Zustand Store → Recommendation Engine (scoring) → Top 5-7 destinations → Gemini API (narration) → Itinerary UI + Map

## Recommendation Engine
- Deterministic scoring: traveler type (25%), budget (20%), duration (15%), season (15%), interests (15%), score alignment (10%)
- Produces ranked destinations + 3 alternatives (budget/premium/short)
- AI never selects destinations — only narrates pre-scored results

## AI Route Contract
- POST /api/itinerary
- Input: { preferences, rankedDestinations, seasonContext }
- Output: { days[], summary, budget, alternatives[] } — validated by Zod
- Fallback: cached → rule-based → static

## DB Schema
- destinations, activities, seasons, packages (Prisma + Supabase PostgreSQL)
- 18 seed destinations

## State Management
- Zustand: trip-store (quiz answers, itinerary), ui-store (persona toggle, mobile menu)
