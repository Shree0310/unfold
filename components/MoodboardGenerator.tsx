'use client';

import { useState } from 'react';
import { generateMoodboard, type MoodboardCard } from '@/app/actions/generate-moodboard';
import { DraggableCard } from './cards/DraggableCard';
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

// Card with position data
interface PositionedCard {
  id: string;
  x: number;
  y: number;
  data: MoodboardCard;
}

export function MoodboardGenerator() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cards, setCards] = useState<PositionedCard[]>([]);

  const handleSubmit = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || input;
    if (!finalPrompt.trim() || isGenerating) return;

    setInput('');
    setIsGenerating(true);

    try {
      const result = await generateMoodboard(finalPrompt);

      // Convert to positioned cards with staggered grid layout
      const positionedCards: PositionedCard[] = result.map((card, index) => {
        // Create a nice grid layout with some offset
        const col = index % 2;
        const row = Math.floor(index / 2);
        return {
          id: `card-${Date.now()}-${index}`,
          x: col * 450 + 50,
          y: row * 300 + 50,
          data: card,
        };
      });

      // Simulate streaming by revealing cards one-by-one
      for (let i = 0; i < positionedCards.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 400 : 550));
        setCards(prev => [...prev, positionedCards[i]]);
      }
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating moodboard:', error);
      setIsGenerating(false);
    }
  };

  const handleCardDragEnd = (id: string, x: number, y: number) => {
    setCards(prev => prev.map(card =>
      card.id === id ? { ...card, x, y } : card
    ));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const hasAnyCards = cards.length > 0 || isGenerating;

  const renderCard = (cardData: MoodboardCard) => {
    switch (cardData.type) {
      case 'palette':
        return (
          <PaletteCard
            name={cardData.name}
            colors={cardData.colors}
            description={cardData.description}
          />
        );
      case 'fontPair':
        return (
          <FontPairCard
            headingFont={cardData.headingFont}
            bodyFont={cardData.bodyFont}
            rationale={cardData.rationale}
          />
        );
      case 'moodPhrase':
        return <MoodPhraseCard phrases={cardData.phrases} />;
      case 'referenceImage':
        return (
          <ReferenceImageCard
            searchTerms={cardData.searchTerms}
            caption={cardData.caption}
          />
        );
    }
  };

  return (
    <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Title and Input */}
      <div style={{ padding: '32px 48px', borderBottom: '1px solid rgba(252,211,77,0.3)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {/* Logo and Description */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontWeight: 700, fontSize: '36px', letterSpacing: '-0.02em', background: 'linear-gradient(135deg,#ea580c,#d97706,#ca8a04)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '8px' }}>
              Unfold
            </div>
            <p style={{ fontSize: '15px', color: '#b45309', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              AI reasons, UI streams. Watch your creative vision unfold progressively as each design element arrives in real-time.
            </p>
          </div>

          {/* Input Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <input
              style={{ flex: 1, padding: '14px 20px', border: '1.5px solid #fde68a', background: '#fff', borderRadius: '14px', fontSize: '15px', color: '#78350f', boxShadow: '0 2px 8px rgba(120,53,15,0.08)' }}
              placeholder="Describe the mood you're after…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
            />
            <button
              onClick={() => handleSubmit()}
              disabled={isGenerating || !input.trim()}
              style={{ flex: 'none', padding: '14px 28px', border: 'none', borderRadius: '14px', background: 'linear-gradient(135deg,#f97316,#f59e0b)', color: '#fff', fontWeight: 600, fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,0.35)', opacity: isGenerating || !input.trim() ? 0.5 : 1, transition: 'filter 0.15s' }}
              onMouseEnter={(e) => !isGenerating && input.trim() && (e.currentTarget.style.filter = 'brightness(1.05)')}
              onMouseLeave={(e) => e.currentTarget.style.filter = ''}
            >
              {isGenerating ? 'Generating…' : 'Generate'}
            </button>
          </div>
        </div>
      </div>

      {/* Board Area - Milanote-style canvas */}
      <div style={{ position: 'relative', flex: 1, background: 'radial-gradient(circle,rgba(180,83,9,0.12) 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', overflow: 'auto' }}>

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

        {/* Draggable Cards */}
        {cards.map((card) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            initialX={card.x}
            initialY={card.y}
            onDragEnd={handleCardDragEnd}
          >
            <div style={{ width: '380px' }}>
              {renderCard(card.data)}
            </div>
          </DraggableCard>
        ))}
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
