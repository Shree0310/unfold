'use server';

import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPrompt = `You are a creative director and design AI assistant. When given a creative brief, you generate a visual moodboard by calling the appropriate tools in a thoughtful sequence.

Guidelines:
- Call tools in this order for the best reveal: palette → mood phrases → fonts → reference images
- Each brief should produce exactly 4 cards (one of each type)
- Be creative but intentional - ensure all choices support the creative direction
- For palettes: Choose 4-6 colors that work together harmoniously
- For fonts: Suggest real, web-available font names (e.g., "Playfair Display", "Inter", "Crimson Pro")
- For mood phrases: Create 3-5 short, evocative phrases that capture the vibe
- For reference images: Provide specific, descriptive search terms that would find relevant imagery

Remember: The cards will stream in progressively as you call each tool, creating an unfolding reveal experience.`;

export type MoodboardCard =
  | { type: 'palette'; name: string; colors: string[]; description: string }
  | { type: 'fontPair'; headingFont: string; bodyFont: string; rationale: string }
  | { type: 'moodPhrase'; phrases: string[] }
  | { type: 'referenceImage'; searchTerms: string[]; caption: string };

export async function generateMoodboard(userPrompt: string): Promise<MoodboardCard[]> {
  const cards: MoodboardCard[] = [];

  // Debug: Comprehensive API key logging
  const apiKey = process.env.ANTHROPIC_API_KEY;

  console.log('=== API KEY DEBUG ===');
  console.log('API Key exists:', !!apiKey);
  console.log('API Key length:', apiKey?.length);
  console.log('API Key first 20 chars:', apiKey?.substring(0, 20));
  console.log('API Key last 10 chars:', apiKey?.substring(apiKey.length - 10));
  console.log('All env vars:', Object.keys(process.env).filter(k => k.includes('ANTHROPIC')));
  console.log('====================');

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
  }

  if (apiKey === 'your_api_key_here') {
    throw new Error('ANTHROPIC_API_KEY is still set to placeholder value. Please update .env.local with your actual API key.');
  }

  try {
    await generateText({
    model: anthropic('claude-sonnet-4-5-20250929'),
    prompt: userPrompt,
    system: systemPrompt,
    tools: {
      renderPaletteCard: {
        description: 'Render a color palette card with a name, colors array (hex codes), and description explaining the mood/rationale',
        inputSchema: z.object({
          name: z.string().describe('Name of the color palette'),
          colors: z.array(z.string()).describe('Array of hex color codes (e.g., ["#FF5733", "#C70039"])'),
          description: z.string().describe('Description of the palette mood and rationale'),
        }),
        execute: async (args: { name: string; colors: string[]; description: string }) => {
          cards.push({ type: 'palette', ...args });
          return { success: true };
        },
      },
      renderFontPairCard: {
        description: 'Render a font pairing card showing heading and body font choices with rationale',
        inputSchema: z.object({
          headingFont: z.string().describe('Font name for headings'),
          bodyFont: z.string().describe('Font name for body text'),
          rationale: z.string().describe('Explanation of why this pairing works'),
        }),
        execute: async (args: { headingFont: string; bodyFont: string; rationale: string }) => {
          cards.push({ type: 'fontPair', ...args });
          return { success: true };
        },
      },
      renderMoodPhraseCard: {
        description: 'Render a card with evocative phrases that capture the creative direction',
        inputSchema: z.object({
          phrases: z.array(z.string()).describe('Array of 3-5 short evocative phrases'),
        }),
        execute: async (args: { phrases: string[] }) => {
          cards.push({ type: 'moodPhrase', ...args });
          return { success: true };
        },
      },
      renderReferenceImageCard: {
        description: 'Render a reference image card with search terms and caption',
        inputSchema: z.object({
          searchTerms: z.array(z.string()).describe('Array of search terms for finding reference images'),
          caption: z.string().describe('Caption explaining the visual reference'),
        }),
        execute: async (args: { searchTerms: string[]; caption: string }) => {
          cards.push({ type: 'referenceImage', ...args });
          return { success: true };
        },
      },
    },
  });

  console.log('AI request completed successfully');
  } catch (error: any) {
    console.error('=== ERROR DETAILS ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Status code:', error.statusCode);
    console.error('Error response:', error.responseBody);
    console.error('====================');
    throw error;
  }

  return cards;
}
