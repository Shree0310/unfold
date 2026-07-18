'use client';

import { useState } from 'react';
import { generateMoodboard, type MoodboardCard } from '@/app/actions/generate-moodboard';
import { PaletteCard } from './cards/PaletteCard';
import { FontPairCard } from './cards/FontPairCard';
import { MoodPhraseCard } from './cards/MoodPhraseCard';
import { ReferenceImageCard } from './cards/ReferenceImageCard';

const presetPrompts = [
  'A boutique coffee roastery, warm and artisanal',
  'Minimalist tech startup, clean and modern',
  'Vintage jazz club, rich and elegant',
];

export function MoodboardGenerator() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [cards, setCards] = useState<MoodboardCard[]>([]);
  const [showToolCalls, setShowToolCalls] = useState(false);

  const handleSubmit = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || input;
    if (!finalPrompt.trim()) return;

    setCurrentPrompt(finalPrompt);
    setInput('');
    setIsGenerating(true);
    setCards([]); // Reset cards for new generation

    try {
      // Get all cards at once
      const result = await generateMoodboard(finalPrompt);

      // Simulate streaming by revealing cards one-by-one
      for (let i = 0; i < result.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800)); // 800ms delay
        setCards(result.slice(0, i + 1));
      }

    } catch (error) {
      console.error('Error generating moodboard:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Find specific card types
  const paletteCard = cards.find(c => c.type === 'palette');
  const fontCard = cards.find(c => c.type === 'fontPair');
  const moodCard = cards.find(c => c.type === 'moodPhrase');
  const imageCard = cards.find(c => c.type === 'referenceImage');

  // Check if we're currently generating and which cards are missing
  const needsPalette = isGenerating && !paletteCard;
  const needsFont = isGenerating && !fontCard;
  const needsMood = isGenerating && !moodCard;
  const needsImage = isGenerating && !imageCard;

  const hasAnyCards = cards.length > 0 || isGenerating;

  return (
    <div className="space-y-6">
      {/* Input Bar */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the mood you're after..."
          disabled={isGenerating}
          className="flex-1 px-4 py-3 border border-amber-200 bg-white rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent text-amber-900 placeholder:text-amber-500 disabled:opacity-50"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={isGenerating || !input.trim()}
          className="px-6 py-3 bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md whitespace-nowrap"
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {/* Preset Prompts - Only show when no cards */}
      {!hasAnyCards && (
        <div className="space-y-4">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider text-center">
            Try these examples
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {presetPrompts.map((preset, index) => (
              <button
                key={index}
                onClick={() => handleSubmit(preset)}
                disabled={isGenerating}
                className="px-5 py-3 text-sm bg-white hover:bg-amber-50 text-amber-900 rounded-xl border border-amber-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:border-amber-300"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Prompt Display */}
      {currentPrompt && hasAnyCards && (
        <div className="text-center">
          <p className="text-sm text-amber-700 italic">"{currentPrompt}"</p>
        </div>
      )}

      {/* Board Area - Grid Layout */}
      {hasAnyCards && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-lg">
          <div className="grid grid-cols-4 gap-4">
            {/* Palette Card - Spans 2 columns */}
            <div className="col-span-2">
              {paletteCard ? (
                <PaletteCard
                  name={paletteCard.name}
                  colors={paletteCard.colors}
                  description={paletteCard.description}
                />
              ) : needsPalette ? (
                <div className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-6 h-full flex items-center justify-center">
                  <p className="text-sm text-amber-600">Palette streaming in...</p>
                </div>
              ) : null}
            </div>

            {/* Font Card - Spans 2 columns */}
            <div className="col-span-2">
              {fontCard ? (
                <FontPairCard
                  headingFont={fontCard.headingFont}
                  bodyFont={fontCard.bodyFont}
                  rationale={fontCard.rationale}
                />
              ) : needsFont ? (
                <div className="rounded-xl border-2 border-dashed border-purple-300 bg-purple-50/50 p-6 h-full flex items-center justify-center">
                  <p className="text-sm text-purple-600">Typography streaming in...</p>
                </div>
              ) : null}
            </div>

            {/* Mood Card - Spans 1 column */}
            <div className="col-span-1">
              {moodCard ? (
                <MoodPhraseCard phrases={moodCard.phrases} />
              ) : needsMood ? (
                <div className="rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/50 p-6 h-full flex items-center justify-center">
                  <p className="text-sm text-teal-600 text-center">Mood streaming in...</p>
                </div>
              ) : null}
            </div>

            {/* Image Reference Card - Spans 3 columns */}
            <div className="col-span-3">
              {imageCard ? (
                <ReferenceImageCard
                  searchTerms={imageCard.searchTerms}
                  caption={imageCard.caption}
                />
              ) : needsImage ? (
                <div className="rounded-xl border-2 border-dashed border-pink-300 bg-pink-50/50 p-6 h-full flex items-center justify-center">
                  <p className="text-sm text-pink-600">Reference images streaming in...</p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Tool Call Sequence Toggle */}
          <button
            onClick={() => setShowToolCalls(!showToolCalls)}
            className="mt-4 flex items-center gap-2 text-xs text-amber-700 hover:text-amber-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>{showToolCalls ? 'hide' : 'show'} tool-call sequence</span>
          </button>

          {/* Tool Call Sequence Details */}
          {showToolCalls && (
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-xs text-amber-800 font-mono">
                Tool calls: {cards.map(c => c.type).join(' → ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
