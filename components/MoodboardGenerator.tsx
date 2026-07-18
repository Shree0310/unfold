'use client';

import { useState } from 'react';
import { generateMoodboard, type MoodboardCard } from '@/app/actions/generate-moodboard';
import { PaletteCard } from './cards/PaletteCard';
import { FontPairCard } from './cards/FontPairCard';
import { MoodPhraseCard } from './cards/MoodPhraseCard';
import { ReferenceImageCard } from './cards/ReferenceImageCard';

const presetPrompts = [
  'Coastal minimalist branding',
  'Retro arcade poster',
  'Botanical apothecary',
  'Brutalist tech startup',
  'Warm editorial cookbook',
  'Neo-noir short film',
];

export function MoodboardGenerator() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cards, setCards] = useState<MoodboardCard[]>([]);

  const handleSubmit = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || input;
    if (!finalPrompt.trim() || isGenerating) return;

    setInput('');
    setIsGenerating(true);

    try {
      const result = await generateMoodboard(finalPrompt);

      // Simulate streaming by revealing cards one-by-one
      for (let i = 0; i < result.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 400 : 550));
        setCards(result.slice(0, i + 1));
      }
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating moodboard:', error);
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

  const hasAnyCards = cards.length > 0 || isGenerating;

  return (
    <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
      {/* Input Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
        <input
          style={{ flex: 1, maxWidth: '540px', padding: '12px 18px', border: '1.5px solid #fde68a', background: '#fff', borderRadius: '14px', fontSize: '15px', color: '#78350f', boxShadow: '0 2px 8px rgba(120,53,15,0.08)' }}
          placeholder="Describe the mood you're after…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isGenerating}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={isGenerating || !input.trim()}
          style={{ flex: 'none', padding: '12px 26px', border: 'none', borderRadius: '14px', background: 'linear-gradient(135deg,#f97316,#f59e0b)', color: '#fff', fontWeight: 600, fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,0.35)', opacity: isGenerating || !input.trim() ? 0.5 : 1, transition: 'filter 0.15s' }}
          onMouseEnter={(e) => !isGenerating && input.trim() && (e.currentTarget.style.filter = 'brightness(1.05)')}
          onMouseLeave={(e) => e.currentTarget.style.filter = ''}
        >
          {isGenerating ? 'Generating…' : 'Generate'}
        </button>
      </div>

      {/* Board Area */}
      <div style={{ position: 'relative', minHeight: '600px', background: 'radial-gradient(circle,rgba(180,83,9,0.12) 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', borderRadius: '20px', padding: '40px 24px' }}>

        {/* Empty State */}
        {!hasAnyCards && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ maxWidth: '460px' }}>
              <h2 style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: 700, color: '#78350f' }}>An open board for ideas</h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#b45309' }}>Describe a mood or brief above, or try one of these.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', maxWidth: '560px' }}>
              {presetPrompts.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleSubmit(preset)}
                  disabled={isGenerating}
                  style={{ padding: '10px 18px', background: '#fff', border: '1px solid #fde68a', borderRadius: '12px', fontSize: '13px', fontWeight: 500, color: '#78350f', cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 20px rgba(120,53,15,0.12)'; e.currentTarget.style.borderColor = '#fcd34d'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#fde68a'; }}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cards Grid */}
        {hasAnyCards && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Palette - spans 2 columns */}
            <div style={{ gridColumn: 'span 2' }}>
              {paletteCard ? (
                <PaletteCard
                  name={paletteCard.name}
                  colors={paletteCard.colors}
                  description={paletteCard.description}
                />
              ) : isGenerating ? (
                <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d97706', marginBottom: '6px' }}>Palette</div>
                  <div style={{ fontSize: '21px', fontWeight: 700, color: '#78350f', marginBottom: '14px' }}>Loading...</div>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} style={{ flex: 1, height: '80px', borderRadius: '12px', background: 'linear-gradient(90deg,#fef3c7 25%,#fde68a 50%,#fef3c7 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Font - spans 2 columns */}
            <div style={{ gridColumn: 'span 2' }}>
              {fontCard ? (
                <FontPairCard
                  headingFont={fontCard.headingFont}
                  bodyFont={fontCard.bodyFont}
                  rationale={fontCard.rationale}
                />
              ) : isGenerating ? (
                <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', minHeight: '200px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9333ea', marginBottom: '6px' }}>Typography</div>
                  <div style={{ fontSize: '21px', fontWeight: 700, color: '#78350f', marginBottom: '14px' }}>Font Pairing</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ height: '40px', borderRadius: '8px', background: 'linear-gradient(90deg,#fef3c7 25%,#fde68a 50%,#fef3c7 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                    <div style={{ height: '24px', borderRadius: '8px', background: 'linear-gradient(90deg,#fef3c7 25%,#fde68a 50%,#fef3c7 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', width: '70%' }} />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Mood - spans 1 column */}
            <div style={{ gridColumn: 'span 1' }}>
              {moodCard ? (
                <MoodPhraseCard phrases={moodCard.phrases} />
              ) : isGenerating ? (
                <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', minHeight: '200px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0d9488', marginBottom: '6px' }}>Mood & Voice</div>
                  <div style={{ fontSize: '21px', fontWeight: 700, color: '#78350f', marginBottom: '14px' }}>Key Phrases</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} style={{ height: '20px', borderRadius: '6px', background: 'linear-gradient(90deg,#fef3c7 25%,#fde68a 50%,#fef3c7 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Reference Image - spans 3 columns */}
            <div style={{ gridColumn: 'span 3' }}>
              {imageCard ? (
                <ReferenceImageCard
                  searchTerms={imageCard.searchTerms}
                  caption={imageCard.caption}
                />
              ) : isGenerating ? (
                <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', minHeight: '200px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#db2777', marginBottom: '6px' }}>Visual Reference</div>
                  <div style={{ fontSize: '21px', fontWeight: 700, color: '#78350f', marginBottom: '14px' }}>Inspiration</div>
                  <div style={{ width: '100%', height: '180px', borderRadius: '12px', background: 'linear-gradient(90deg,#fef3c7 25%,#fde68a 50%,#fef3c7 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
