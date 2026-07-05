'use client';

import { BaseCard } from './BaseCard';

interface FontPairCardProps {
  headingFont: string;
  bodyFont: string;
  rationale: string;
}

export function FontPairCard({ headingFont, bodyFont, rationale }: FontPairCardProps) {
  return (
    <BaseCard>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Typography
          </h3>
          <h2 className="text-2xl font-bold text-gray-900">Font Pairing</h2>
        </div>

        <div className="space-y-4 py-4 border-y border-gray-200">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Heading</p>
            <p className="text-3xl font-bold text-gray-900">{headingFont}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Body</p>
            <p className="text-xl text-gray-700">{bodyFont}</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{rationale}</p>
      </div>
    </BaseCard>
  );
}
