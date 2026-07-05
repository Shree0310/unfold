// Tool schemas for the AI moodboard generation

export interface PaletteCard {
  name: string;
  colors: string[];
  description: string;
}

export interface FontPairCard {
  headingFont: string;
  bodyFont: string;
  rationale: string;
}

export interface MoodPhraseCard {
  phrases: string[];
}

export interface ReferenceImageCard {
  searchTerms: string[];
  caption: string;
}

export type ToolCallResult =
  | { type: 'palette'; data: PaletteCard }
  | { type: 'fontPair'; data: FontPairCard }
  | { type: 'moodPhrase'; data: MoodPhraseCard }
  | { type: 'referenceImage'; data: ReferenceImageCard };
