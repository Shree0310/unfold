'use server';

import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPrompt = `You are a creative director and design AI assistant. When given a creative brief, you MUST generate a complete visual moodboard by calling ALL FOUR tools.

CRITICAL REQUIREMENTS:
- You MUST call ALL 4 tools: renderPaletteCard, renderMoodPhraseCard, renderFontPairCard, and renderReferenceImageCard
- Call them in this order: palette → mood phrases → fonts → reference images
- NEVER skip any tool - every moodboard requires all 4 card types
- Each card must be thoughtful and support the creative direction

Tool-specific guidelines:
- renderPaletteCard: Choose 4-6 harmonious hex colors (e.g., "#FF5733")
- renderMoodPhraseCard: Create 3-5 short, evocative phrases
- renderFontPairCard: Suggest real, web-available fonts (e.g., "Playfair Display", "Inter")
- renderReferenceImageCard: Provide 3-5 specific search terms for imagery

IMPORTANT: You must call all 4 tools for every request. Do not stop after calling just one or two tools.`;

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
    prompt: `${userPrompt}\n\nREMINDER: You must call ALL 4 tools (renderPaletteCard, renderMoodPhraseCard, renderFontPairCard, renderReferenceImageCard) to complete this moodboard. Do not stop until all 4 have been called.`,
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
