'use client';

import { useState, useEffect } from 'react';
import { generateMoodboard, type MoodboardCard, type ToolCallEvent } from '@/app/actions/generate-moodboard';
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

const loadingMessages = [
  'Analyzing your creative brief...',
  'Thinking about color harmonies...',
  'Exploring typographic pairings...',
  'Curating visual references...',
  'Crafting the perfect palette...',
  'Considering mood and tone...',
  'Selecting complementary fonts...',
  'Finding inspiration images...',
];

export function MoodboardGenerator() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cards, setCards] = useState<PositionedCard[]>([]);
  const [skeletonCount, setSkeletonCount] = useState(0);
  const [toolCalls, setToolCalls] = useState<ToolCallEvent[]>([]);
  const [showToolCalls, setShowToolCalls] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Rotate loading messages every 1.5 seconds while generating
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setLoadingMessageIndex(0);
    }
  }, [isGenerating]);

  const handleSubmit = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || input;
    if (!finalPrompt.trim() || isGenerating) return;

    setInput('');
    setIsGenerating(true);
    setSkeletonCount(4); // Show 4 skeleton placeholders

    try {
      const result = await generateMoodboard(finalPrompt);

      // Store tool calls for the sequence panel
      setToolCalls(result.toolCalls);

      // Convert to positioned cards with centered grid layout
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 320 : 380;
      const cardSpacing = isMobile ? cardWidth + 40 : 450;
      const cols = isMobile ? 1 : 2;

      const positionedCards: PositionedCard[] = result.cards.map((card, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        if (isMobile) {
          // Mobile: center cards vertically, one after another
          const startX = (window.innerWidth - cardWidth) / 2;
          const startY = 50;

          return {
            id: `card-${Date.now()}-${index}`,
            x: startX,
            y: startY + (index * 280),
            data: card,
          };
        } else {
          // Desktop: 2-column grid
          const gridWidth = cols * cardSpacing;
          const startX = (window.innerWidth / 2) - (gridWidth / 2);
          const startY = 100;

          return {
            id: `card-${Date.now()}-${index}`,
            x: startX + (col * cardSpacing),
            y: startY + (row * 300),
            data: card,
          };
        }
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
            <div style={{ fontWeight: 700, fontSize: 'clamp(24px, 6vw, 36px)', letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(135deg,#ea580c,#d97706,#ca8a04)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '8px' }}>
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

      {/* Tool Call Sequence Panel */}
      {toolCalls.length > 0 && (
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(252,211,77,0.3)', background: 'rgba(255,255,255,0.95)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setShowToolCalls(!showToolCalls)}
              style={{ padding: '6px 12px', background: '#fff', border: '1px solid #fde68a', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#78350f', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'box-shadow 0.15s' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(120,53,15,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}
            >
              <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showToolCalls ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
              {showToolCalls ? 'Hide' : 'Show'} Tool Call Sequence
            </button>
            {showToolCalls && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
                {toolCalls.map((call, index) => (
                  <div
                    key={index}
                    style={{ padding: '4px 10px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace', color: '#78350f', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span style={{ fontWeight: 600 }}>{index + 1}.</span>
                    <span>{call.toolName.replace('render', '').replace('Card', '')}</span>
                    <span style={{ opacity: 0.6 }}>+{call.timestamp}ms</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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

        {/* Loading State - Single centered indicator */}
        {skeletonCount > 0 && cards.length === 0 && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            maxWidth: '400px',
            padding: '0 20px'
          }}>
            {/* Animated dots */}
            <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                    animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`
                  }}
                />
              ))}
            </div>

            {/* Status text */}
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#78350f',
              marginBottom: '8px'
            }}>
              AI is designing your moodboard
            </div>
            <div style={{
              fontSize: '14px',
              color: '#b45309',
              lineHeight: '1.5'
            }}>
              {loadingMessages[loadingMessageIndex]}
            </div>

            {/* Progress bar */}
            <div style={{
              marginTop: '20px',
              height: '4px',
              background: '#fde68a',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #f97316, #f59e0b)',
                animation: 'progress 2s ease-in-out infinite',
                borderRadius: '2px'
              }} />
            </div>
          </div>
        )}

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
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
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
