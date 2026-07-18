'use client';

import { useState, useRef, useEffect } from 'react';
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

type Message = {
  role: 'user' | 'assistant';
  content: string;
  cards?: MoodboardCard[];
};

export function MoodboardGenerator() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (customPrompt?: string) => {
  const finalPrompt = customPrompt || input;
  if (!finalPrompt.trim()) return;

  // Add user message
  const userMessage: Message = { role: 'user', content: finalPrompt };
  setMessages((prev) => [...prev, userMessage]);
  setInput('');
  setIsGenerating(true);

  try {
    // Get all cards at once (existing behavior)
    const result = await generateMoodboard(finalPrompt);

    // Add EMPTY assistant message first (this creates the container)
    setMessages((prev) => [...prev, { 
      role: 'assistant', 
      content: '', 
      cards: [] 
    }]);

    // Now simulate streaming the cards in one-by-one
    await simulateStreaming(result);

  } catch (error) {
    console.error('Error generating moodboard:', error);

    // Add error message
    const errorMessage: Message = {
      role: 'assistant',
      content: 'Sorry, I encountered an error generating your moodboard. Please try again.',
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsGenerating(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const simulateStreaming = async (cards: MoodboardCard[]) => {
  for (let i = 0; i < cards.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 800)); // 800ms delay
    
    setMessages((prev) => {
      const lastMsg = prev[prev.length - 1];
      return [
        ...prev.slice(0, -1),
        { 
          ...lastMsg, 
          cards: cards.slice(0, i + 1) // Add one more card
        }
      ];
    });
  }
};

  const renderCard = (card: MoodboardCard, index: number) => {
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
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Messages Area */}
      <div className={`flex-1 space-y-6 pb-4 ${messages.length > 0 ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-center px-4">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Start creating</h2>
              <p className="text-slate-600 max-w-md text-base">
                Describe your creative vision and watch as your moodboard unfolds
              </p>
            </div>

            {/* Preset Prompts */}
            <div className="space-y-4 max-w-2xl">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Try these examples
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {presetPrompts.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubmit(preset)}
                    disabled={isGenerating}
                    className="px-5 py-3 text-sm bg-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 text-slate-700 rounded-xl border border-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:border-indigo-200"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message, messageIndex) => (
          <div
            key={messageIndex}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'user' ? (
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-2xl max-w-2xl shadow-lg shadow-indigo-200">
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            ) : (
              <div className="space-y-4 max-w-full w-full">
                {message.cards && message.cards.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {message.cards.map((card, cardIndex) => renderCard(card, cardIndex))}
                  </div>
                ) : (
                  <div className="bg-slate-50 px-5 py-3 rounded-2xl max-w-2xl border border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed">{message.content}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-slate-50 px-5 py-4 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-600" />
                <p className="text-sm text-slate-600">Creating your moodboard...</p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t border-slate-200 pt-4">
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your creative vision..."
            className="flex-1 px-4 py-3 border border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-slate-300 focus:border-transparent resize-none min-h-[3rem] max-h-32 text-slate-700 placeholder:text-slate-400"
            rows={1}
            disabled={isGenerating}
          />
          <button
            onClick={() => handleSubmit()}
            disabled={isGenerating || !input.trim()}
            className="px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed h-12 flex items-center justify-center min-w-[5rem] shadow-lg shadow-indigo-200"
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
