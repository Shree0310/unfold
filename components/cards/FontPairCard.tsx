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
      <div className="space-y-5">
        <div>
          <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Typography
          </h3>
          <h2 className="text-2xl font-bold text-amber-900">Font Pairing</h2>
        </div>

        <div className="space-y-5 py-5 border-y border-amber-200">
          <div>
            <p className="text-xs text-amber-700 uppercase tracking-wider mb-3 font-semibold">Heading</p>
            <p className="text-3xl font-bold text-amber-900">{headingFont}</p>
          </div>

          <div>
            <p className="text-xs text-amber-700 uppercase tracking-wider mb-3 font-semibold">Body</p>
            <p className="text-xl text-amber-800">{bodyFont}</p>
          </div>
        </div>

        <p className="text-amber-900 leading-relaxed text-sm">{rationale}</p>
      </div>
    </BaseCard>
  );
}
