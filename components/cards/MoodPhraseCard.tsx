'use client';

import { BaseCard } from './BaseCard';

interface MoodPhraseCardProps {
  phrases: string[];
}

export function MoodPhraseCard({ phrases }: MoodPhraseCardProps) {
  return (
    <BaseCard>
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">
            Mood & Voice
          </h3>
          <h2 className="text-xl font-bold text-slate-800">Key Phrases</h2>
        </div>

        <div className="space-y-3">
          {phrases.map((phrase, index) => (
            <div
              key={index}
              className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-100"
            >
              <p className="text-base italic text-slate-700">&ldquo;{phrase}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </BaseCard>
  );
}
