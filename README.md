<div align="center">

# 🌍 Tugende — AI Travel Companion for Uganda

**"Tugende"** — *Let's Go* in Luganda

An intelligent, AI-powered travel planning platform that helps tourists and locals discover the Pearl of Africa like never before.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI_Powered-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render)](https://render.com/)

[Live Demo →](#) · [Report Bug](https://github.com/Isaac25-lgtm/tugende-travel-demo/issues) · [Request Feature](https://github.com/Isaac25-lgtm/tugende-travel-demo/issues)

</div>

---

## 🧭 The Problem

Uganda attracts over **1.5 million tourists annually**, yet trip planning remains fragmented — scattered blog posts, outdated guides, and zero personalization. Travelers miss hidden gems, overpay for experiences, and struggle with logistics in a country where **the best adventures are off the beaten path**.

Meanwhile, **Ugandans themselves** rarely have a single platform that curates affordable weekend getaways — pricing is always in dollars, itineraries assume international budgets, and local favorites like Sipi Falls or Ssese Islands get buried under gorilla trekking results.

## 💡 The Solution

**Tugende** is an AI-native travel companion that understands Uganda deeply — its national parks, cultural heritage, local cuisine, safety considerations, and seasonal patterns — and turns that knowledge into **personalized, day-by-day itineraries** in seconds.

It serves two personas with a single toggle:

- **International Visitors** — Safari circuits, gorilla trekking, adventure tourism with USD pricing
- **Ugandan Explorers** — Weekend getaways, budget-friendly escapes with UGX pricing

### What Makes It Different

| Feature | Traditional Guides | Tugende |
|---|---|---|
| Personalization | ❌ One-size-fits-all | ✅ Adapts to budget, interests, group size, pace |
| Intelligence | ❌ Static content | ✅ AI-generated itineraries via Gemini Flash |
| Local context | ❌ Tourist-facing only | ✅ Dual persona — tourists AND locals |
| Trip planning | ❌ DIY research across 10 tabs | ✅ Complete day-by-day plan in under 30 seconds |
| Seasonal awareness | ❌ Generic "best time" advice | ✅ Month-by-month scores for 6 activity types |
| Budget clarity | ❌ Vague price ranges | ✅ Interactive calculator with per-person breakdowns |

---

## ✨ Key Features

### 🗺️ AI Trip Planner
A 7-step guided wizard captures your travel profile — origin, group type, duration, budget style, interests, travel month, and pace — then generates a **personalized day-by-day itinerary** powered by Gemini Flash AI with intelligent fallbacks.

### 🧠 Recommendation Engine
A deterministic scoring system ranks all 18 destinations across 6 weighted factors (traveler match, budget fit, duration fit, season suitability, interest overlap, difficulty alignment) to surface the **best matches before AI even runs**.

### 🔄 4-Level Fallback Hierarchy
Never shows a blank screen. If Gemini is unavailable, it cascades through:
1. **Live AI** → Gemini Flash structured JSON
2. **Cached** → Pre-built golden-path itineraries
3. **Rule-based** → Algorithmic generation from scored destinations
4. **Static** → Curated editorial fallback

### 🏔️ Explore 18 Curated Destinations
Filterable grid with category, region, and budget chips — from Bwindi's gorillas to Kampala's nightlife. Each destination has editorial summaries, daily budget tiers, difficulty scores, and seasonal overrides.

### 📊 Interactive Budget Calculator
Sliders for accommodation, meals, activities, and transport with real-time animated breakdowns. Supports per-person and group totals with budget/mid-range/luxury presets.

### 📅 Best Time Calendar
12-month seasonal matrix with 6 activity toggles — overall, gorilla trekking, safari, white-water rafting, birding, and trekking. Color-coded scores (great / good / fair / poor) with destination-specific overrides.

### 🗾 Interactive Map
Mapbox GL JS with categorized pins, fly-to animations, and a bottom-sheet detail panel. Filter by wildlife, adventure, culture, nature, and relaxation.

### 🎭 Persona-Adaptive UI
One toggle switches the entire experience — featured destinations, pricing currency, recommended durations, and content tone shift between international and local audiences.

---

## 🏗️ Tech Stack

```
Frontend          → Next.js 14 (App Router) · React 19 · TypeScript
Styling           → Tailwind CSS v4 (@theme inline) · Framer Motion
AI Engine         → Gemini 2.0 Flash · Structured JSON Output · Zod Validation
State             → Zustand (client) · Server Components (data)
Maps              → Mapbox GL JS
Database          → Prisma ORM · PostgreSQL (optional — works with static data)
Deployment        → Render (standalone output) · render.yaml
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **Gemini API Key** ([get one here](https://aistudio.google.com/apikey))
- **Mapbox Token** (optional — [get one here](https://www.mapbox.com/))

### Setup

```bash
# Clone the repo
git clone https://github.com/Isaac25-lgtm/tugende-travel-demo.git
cd tugende-travel-demo

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# → Add your GEMINI_API_KEY (required)
# → Add NEXT_PUBLIC_MAPBOX_TOKEN (optional — map shows fallback UI without it)

# Launch
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start exploring Uganda 🇺🇬

---

## 📁 Project Structure

```
tugende/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage — hero, persona toggle, featured destinations
│   │   ├── planner/            # AI trip wizard → loading → itinerary reveal
│   │   ├── explore/            # Filterable destination grid
│   │   ├── map/                # Interactive Mapbox map
│   │   ├── budget/             # Budget calculator
│   │   ├── best-time/          # Seasonal calendar
│   │   └── api/itinerary/      # AI generation endpoint with fallback chain
│   ├── components/
│   │   ├── home/               # Hero, persona toggle, CTA cards, featured, social proof
│   │   ├── planner/            # Trip wizard, loading, itinerary cards, summary
│   │   ├── budget/             # Budget calculator component
│   │   ├── destinations/       # Destination card
│   │   ├── layout/             # Navbar, Footer
│   │   └── ui/                 # Button, Card, Badge, Chip, Input, Slider, etc.
│   ├── data/                   # 18 destinations, seasons, cached itineraries
│   ├── lib/
│   │   ├── ai/                 # Gemini client, prompts, schemas, parser
│   │   ├── scoring/            # Recommendation engine, alternatives, weights
│   │   ├── budget/             # Calculator logic
│   │   └── utils/              # cn, formatters, constants, motion variants
│   ├── store/                  # Zustand stores (trip, UI)
│   └── types/                  # TypeScript definitions
├── docs/                       # Architecture notes, changelog, open tasks
├── prisma/                     # Database schema (optional)
├── render.yaml                 # Render deployment config
└── .env.example                # Environment variable template
```

---

## 🌟 Use Cases

- **Solo backpackers** planning a 2-week Uganda adventure on a budget
- **Safari enthusiasts** optimizing gorilla trekking + wildlife circuits
- **Couples** looking for a romantic weekend at Lake Bunyonyi or Ssese Islands
- **Ugandan families** finding affordable weekend getaways from Kampala
- **Adventure groups** building rafting + bungee + hiking itineraries around Jinja
- **Tour operators** using AI to draft custom client itineraries faster

---

## 🗺️ Roadmap

- [x] 7-step AI trip planner with Gemini Flash
- [x] Recommendation engine with 6-factor scoring
- [x] 4-level AI fallback hierarchy
- [x] 18 curated destinations with editorial content
- [x] Interactive budget calculator
- [x] Seasonal best-time calendar
- [x] Interactive Mapbox map
- [x] Persona-adaptive UI (International / Ugandan)
- [x] Render deployment pipeline
- [ ] Destination detail modal with photo gallery
- [ ] Share trip card generation (social media)
- [ ] Google sign-in & saved trips dashboard
- [ ] WhatsApp Business link for booking inquiries
- [ ] Multi-language support (Luganda, Swahili, French)
- [ ] Offline mode for in-country use
- [ ] Community-contributed local tips & reviews
- [ ] Integration with booking APIs (hotels, flights, activities)
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions make this project better. Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Whether it's fixing a typo, adding a Uganda travel tip to the dataset, or building a new feature — **all contributions are welcome**.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 🙏 Acknowledgments

- **Google AI** — Gemini Flash powers the intelligent itinerary generation
- **Uganda Tourism Board** — Inspiration and destination data
- **Next.js & Vercel** — World-class React framework
- **Mapbox** — Beautiful interactive maps
- The vibrant **Ugandan tech community** 🇺🇬

---

<div align="center">

**Built with ❤️ for Uganda by [Isaac](https://github.com/Isaac25-lgtm)**

*Tugende — because the Pearl of Africa deserves a world-class travel companion.*

If this project helped you, consider giving it a ⭐ — it helps others discover it too.

[⬆ Back to Top](#-tugende--ai-travel-companion-for-uganda)

</div>
