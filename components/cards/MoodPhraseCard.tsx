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
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Mood & Voice
          </h3>
          <h2 className="text-2xl font-bold text-gray-900">Key Phrases</h2>
        </div>

        <div className="space-y-3">
          {phrases.map((phrase, index) => (
            <div
              key={index}
              className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
            >
              <p className="text-lg italic text-gray-800">&ldquo;{phrase}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </BaseCard>
  );
}
