import { z } from 'zod';
import { PaletteCard } from '@/components/cards/PaletteCard';
import { FontPairCard } from '@/components/cards/FontPairCard';
import { MoodPhraseCard } from '@/components/cards/MoodPhraseCard';
import { ReferenceImageCard } from '@/components/cards/ReferenceImageCard';

// Tool definitions for generative UI streaming
export const tools = {
  renderPaletteCard: {
    description: 'Render a color palette card with a name, colors array (hex codes), and description explaining the mood/rationale',
    parameters: z.object({
      name: z.string().describe('Name of the color palette'),
      colors: z.array(z.string()).describe('Array of hex color codes (e.g., ["#FF5733", "#C70039"])'),
      description: z.string().describe('Description of the palette mood and rationale'),
    }),
    execute: async ({ name, colors, description }: { name: string; colors: string[]; description: string }) => {
      return {
        component: <PaletteCard name={name} colors={colors} description={description} />,
      };
    },
  },

  renderFontPairCard: {
    description: 'Render a font pairing card showing heading and body font choices with rationale',
    parameters: z.object({
      headingFont: z.string().describe('Font name for headings'),
      bodyFont: z.string().describe('Font name for body text'),
      rationale: z.string().describe('Explanation of why this pairing works'),
    }),
    execute: async ({ headingFont, bodyFont, rationale }: { headingFont: string; bodyFont: string; rationale: string }) => {
      return {
        component: <FontPairCard headingFont={headingFont} bodyFont={bodyFont} rationale={rationale} />,
      };
    },
  },

  renderMoodPhraseCard: {
    description: 'Render a card with evocative phrases that capture the creative direction',
    parameters: z.object({
      phrases: z.array(z.string()).describe('Array of 3-5 short evocative phrases'),
    }),
    execute: async ({ phrases }: { phrases: string[] }) => {
      return {
        component: <MoodPhraseCard phrases={phrases} />,
      };
    },
  },

  renderReferenceImageCard: {
    description: 'Render a reference image card with search terms and caption',
    parameters: z.object({
      searchTerms: z.array(z.string()).describe('Array of search terms for finding reference images'),
      caption: z.string().describe('Caption explaining the visual reference'),
    }),
    execute: async ({ searchTerms, caption }: { searchTerms: string[]; caption: string }) => {
      return {
        component: <ReferenceImageCard searchTerms={searchTerms} caption={caption} />,
      };
    },
  },
};
