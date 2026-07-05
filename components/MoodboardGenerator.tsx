'use client';

import { useState } from 'react';
import { generateMoodboard, type MoodboardCard } from '@/app/actions/generate-moodboard';
import { PaletteCard } from './cards/PaletteCard';
import { FontPairCard } from './cards/FontPairCard';
import { MoodPhraseCard } from './cards/MoodPhraseCard';
import { ReferenceImageCard } from './cards/ReferenceImageCard';

const presetPrompts = [
  'Cozy indie bookstore, warm autumn palette, editorial typography',
  'Minimalist tech startup, clean blues and whites, modern sans-serif',
  'Vintage jazz club, rich burgundy and gold, elegant serif fonts',
];

export function MoodboardGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cards, setCards] = useState<MoodboardCard[]>([]);

  const handleGenerate = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setIsGenerating(true);
    setCards([]);

    try {
      const result = await generateMoodboard(finalPrompt);
      setCards(result);
    } catch (error) {
      console.error('Error generating moodboard:', error);
      alert('Failed to generate moodboard. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-2">
            Creative Brief
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your creative vision... (e.g., 'Cozy indie bookstore, warm autumn palette, editorial typography')"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            disabled={isGenerating}
          />
        </div>

        {/* Preset Prompts */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Quick Start
          </p>
          <div className="flex flex-wrap gap-2">
            {presetPrompts.map((preset, index) => (
              <button
                key={index}
                onClick={() => {
                  setPrompt(preset);
                  handleGenerate(preset);
                }}
                disabled={isGenerating}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={() => handleGenerate()}
          disabled={isGenerating || !prompt.trim()}
          className="w-full px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Moodboard'}
        </button>
      </div>

      {/* Moodboard Display */}
      {(isGenerating || cards.length > 0) && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Moodboard</h2>

          {isGenerating && cards.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
                <p className="text-gray-600">Creating your moodboard...</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => {
              if (card.type === 'palette') {
                return (
                  <PaletteCard
                    key={index}
                    name={card.name}
                    colors={card.colors}
                    description={card.description}
                  />
                );
              } else if (card.type === 'fontPair') {
                return (
                  <FontPairCard
                    key={index}
                    headingFont={card.headingFont}
                    bodyFont={card.bodyFont}
                    rationale={card.rationale}
                  />
                );
              } else if (card.type === 'moodPhrase') {
                return <MoodPhraseCard key={index} phrases={card.phrases} />;
              } else if (card.type === 'referenceImage') {
                return (
                  <ReferenceImageCard
                    key={index}
                    searchTerms={card.searchTerms}
                    caption={card.caption}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
