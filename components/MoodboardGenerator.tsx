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
  const [skeletonCount, setSkeletonCount] = useState(0);

  const handleSubmit = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || input;
    if (!finalPrompt.trim() || isGenerating) return;

    setInput('');
    setIsGenerating(true);
    setSkeletonCount(4); // Show 4 skeleton placeholders

    try {
      const result = await generateMoodboard(finalPrompt);

      // Convert to positioned cards with centered grid layout
      const isMobile = window.innerWidth < 768;
      const cardSpacing = isMobile ? 360 : 450;
      const cols = isMobile ? 1 : 2;

      const positionedCards: PositionedCard[] = result.map((card, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const gridWidth = cols * cardSpacing;
        const startX = (window.innerWidth / 2) - (gridWidth / 2);
        const startY = 100;

        return {
          id: `card-${Date.now()}-${index}`,
          x: startX + (col * cardSpacing),
          y: startY + (row * 300),
          data: card,
        };
      });

      // Simulate streaming by revealing cards one-by-one
      for (let i = 0; i < positionedCards.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 400 : 550));
        setCards(prev => [...prev, positionedCards[i]]);
        setSkeletonCount(prev => Math.max(0, prev - 1));
      }

      setSkeletonCount(0);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating moodboard:', error);
      setSkeletonCount(0);
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
      <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(252,211,77,0.3)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {/* Logo and Description */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: 'clamp(24px, 6vw, 36px)', letterSpacing: '-0.02em', background: 'linear-gradient(135deg,#ea580c,#d97706,#ca8a04)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '8px' }}>
              Unfold
            </div>
            <p style={{ fontSize: 'clamp(13px, 3vw, 15px)', color: '#b45309', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', padding: '0 8px' }}>
              AI reasons, UI streams. Watch your creative vision unfold progressively as each design element arrives in real-time.
            </p>
          </div>

          {/* Input Section */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <input
              style={{ flex: 1, padding: '12px 16px', border: '1.5px solid #fde68a', background: '#fff', borderRadius: '12px', fontSize: 'clamp(14px, 3vw, 15px)', color: '#78350f', boxShadow: '0 2px 8px rgba(120,53,15,0.08)', minWidth: 0 }}
              placeholder="Describe the mood…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
            />
            <button
              onClick={() => handleSubmit()}
              disabled={isGenerating || !input.trim()}
              style={{ flex: 'none', padding: '12px 20px', border: 'none', borderRadius: '12px', background: 'linear-gradient(135deg,#f97316,#f59e0b)', color: '#fff', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 15px)', cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,0.35)', opacity: isGenerating || !input.trim() ? 0.5 : 1, transition: 'filter 0.15s', whiteSpace: 'nowrap' }}
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', textAlign: 'center', padding: '40px 16px' }}>
            <div style={{ maxWidth: '460px', padding: '0 16px' }}>
              <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(20px, 5vw, 26px)', fontWeight: 700, color: '#78350f' }}>An open board for ideas</h2>
              <p style={{ margin: 0, fontSize: 'clamp(13px, 3vw, 14px)', color: '#b45309' }}>Describe a mood or brief above, or try one of these.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '560px', padding: '0 16px' }}>
              {presetPrompts.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleSubmit(preset)}
                  disabled={isGenerating}
                  style={{ padding: '8px 14px', background: '#fff', border: '1px solid #fde68a', borderRadius: '10px', fontSize: 'clamp(12px, 2.5vw, 13px)', fontWeight: 500, color: '#78350f', cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 20px rgba(120,53,15,0.12)'; e.currentTarget.style.borderColor = '#fcd34d'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#fde68a'; }}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Skeleton Loaders */}
        {[...Array(skeletonCount)].map((_, index) => {
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const cardWidth = isMobile ? 320 : 380;
          const cardSpacing = isMobile ? 360 : 450;
          const cols = isMobile ? 1 : 2;

          const col = (cards.length + index) % cols;
          const row = Math.floor((cards.length + index) / cols);
          const gridWidth = cols * cardSpacing;
          const startX = (typeof window !== 'undefined' ? window.innerWidth / 2 : 800) - (gridWidth / 2);
          const startY = 100;
          const x = startX + (col * cardSpacing);
          const y = startY + (row * 300);

          return (
            <div
              key={`skeleton-${index}`}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: `${cardWidth}px`,
              }}
            >
              <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', minHeight: '220px' }}>
                <div style={{ height: '20px', width: '40%', borderRadius: '6px', background: 'linear-gradient(90deg,#fef3c7 25%,#fde68a 50%,#fef3c7 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: '12px' }} />
                <div style={{ height: '28px', width: '60%', borderRadius: '8px', background: 'linear-gradient(90deg,#fef3c7 25%,#fde68a 50%,#fef3c7 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: '16px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ height: '60px', borderRadius: '12px', background: 'linear-gradient(90deg,#fef3c7 25%,#fde68a 50%,#fef3c7 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                  <div style={{ height: '40px', width: '80%', borderRadius: '8px', background: 'linear-gradient(90deg,#fef3c7 25%,#fde68a 50%,#fef3c7 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                </div>
              </div>
            </div>
          );
        })}

        {/* Draggable Cards */}
        {cards.map((card) => {
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const cardWidth = isMobile ? 320 : 380;

          return (
            <DraggableCard
              key={card.id}
              id={card.id}
              initialX={card.x}
              initialY={card.y}
              onDragEnd={handleCardDragEnd}
            >
              <div style={{ width: `${cardWidth}px` }}>
                {renderCard(card.data)}
              </div>
            </DraggableCard>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @media (max-width: 768px) {
          input::placeholder {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
