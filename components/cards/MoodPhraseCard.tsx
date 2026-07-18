'use client';

import { BaseCard } from './BaseCard';

interface MoodPhraseCardProps {
  phrases: string[];
}

export function MoodPhraseCard({ phrases }: MoodPhraseCardProps) {
  return (
    <BaseCard>
      <div className="space-y-5">
        <div>
          <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Mood & Voice
          </h3>
          <h2 className="text-2xl font-bold text-amber-900">Key Phrases</h2>
        </div>

        <div className="space-y-3">
          {phrases.map((phrase, index) => (
            <div
              key={index}
              className="px-5 py-4 bg-amber-50 rounded-xl border border-amber-200"
            >
              <p className="text-base italic text-amber-900 font-medium">&ldquo;{phrase}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </BaseCard>
  );
}
