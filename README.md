# Unfold

**AI reasons, UI streams.** A portfolio POC demonstrating generative UI via server-driven streaming.

## What is Unfold?

Unfold is a visual moodboard generator that showcases **React Server Components (RSC) + server-driven streaming** architecture. Unlike traditional client-side AI implementations that fetch-then-render, Unfold progressively streams UI components as each AI tool call resolves, creating a dynamic "unfolding" experience.

### Key Differentiators

- **Progressive Streaming**: Cards appear one at a time as the AI generates them, not all at once
- **Server-Driven UI**: Components are streamed from the server via RSC
- **Real-time Reasoning**: Watch the AI's creative process unfold in real-time

## Tech Stack

- **Next.js 16** (App Router) - Required for RSC streaming
- **Vercel AI SDK** (`ai` package) - `streamUI` for orchestrating streamed tool calls
- **Anthropic API** (Claude) - AI reasoning and tool-call generation
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Card entrance animations with spring physics
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

- Node.js 18+
- An Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your environment variables:

Copy `.env.local` and add your Anthropic API key:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

### Core Concept

The server decides which component to stream based on AI tool calls. Each tool execution becomes its own RSC that streams to the client the moment it resolves, enabling progressive reveal.

### Tool Schema

```ts
renderPaletteCard: { name: string; colors: string[]; description: string }
renderFontPairCard: { headingFont: string; bodyFont: string; rationale: string }
renderMoodPhraseCard: { phrases: string[] }
renderReferenceImageCard: { searchTerms: string[]; caption: string }
```

The system prompt instructs Claude to call tools in a sensible order (palette → mood phrase → fonts → images) for an intentional reveal experience.

## Project Structure

```
unfold/
├── app/
│   ├── actions/
│   │   └── generate-moodboard.tsx   # Server action with streamUI
│   ├── globals.css
│   └── page.tsx                     # Main page
├── components/
│   ├── cards/
│   │   ├── BaseCard.tsx            # Shared card component with animations
│   │   ├── PaletteCard.tsx         # Color palette display
│   │   ├── FontPairCard.tsx        # Typography pairing
│   │   ├── MoodPhraseCard.tsx      # Evocative phrases
│   │   └── ReferenceImageCard.tsx  # Visual references
│   └── MoodboardGenerator.tsx       # Client component with input UI
├── lib/
│   ├── tools.tsx                    # AI SDK tool definitions
│   └── types/
│       └── tools.ts                 # TypeScript interfaces
└── .env.local                       # Environment variables
```

## Development Roadmap

### ✅ Milestone 1 - Skeleton streaming (prove the architecture)
- Wire up Next.js App Router + Vercel AI SDK + Anthropic API
- Single tool: `renderPaletteCard`
- Text input → server action → single streamed card

### 🚧 Milestone 2 - Multi-card sequence
- Add remaining three tools
- Each card renders in its own RSC boundary
- Progressive streaming of 4 card types

### 📋 Milestone 3 - Design polish
- Port MorphCard skeleton→populated animation
- Framer Motion stagger/spring effects
- Masonry/grid layout optimization
- Optional: ambient motion or shader background

### 📋 Milestone 4 - Portfolio polish
- Landing/hero section
- 2-3 preset prompt chips ✅
- "How it works" toggle panel
- Deploy on Vercel: `unfold.sourashreeart.com`

## Related Projects

Part of a portfolio demonstrating different AI architectures:

- **Achievr** ([achievr.sourashreeart.com](https://achievr.sourashreeart.com)) - Client-side AI with Zustand chat UI
- **Unfold** (this project) - Server-driven streaming with RSC

## License

MIT

---

Built with ❤️ by Sourashree | [Portfolio](https://hello.sourashreeart.com)
