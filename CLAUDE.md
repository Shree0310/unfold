# Unfold Project

## Stack
- Next.js 16 App Router with RSC streaming
- TypeScript strict mode
- Tailwind CSS v4
- Framer Motion for card animations
- Vercel AI SDK v7 (`streamUI` for server-driven streaming)
- Anthropic API (Claude) for AI reasoning and tool calls
- Zod for schema validation

## Animation Standards
- Use Framer Motion for all animations
- Spring physics for card entrance: { type: "spring", stiffness: 300, damping: 30 }
- Progressive reveal as cards stream in
- BaseCard component handles shared animation logic

## Code Conventions
- Server actions in app/actions/
- Components in components/
- Tool definitions in lib/tools.tsx
- Type definitions in lib/types/
- Always use "use client" for interactive components
- Server-driven streaming via streamUI pattern