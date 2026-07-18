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
          <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-1">
            Typography
          </h3>
          <h2 className="text-xl font-bold text-slate-800">Font Pairing</h2>
        </div>

        <div className="space-y-4 py-4 border-y border-slate-200">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Heading</p>
            <p className="text-2xl font-bold text-slate-800">{headingFont}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Body</p>
            <p className="text-lg text-slate-600">{bodyFont}</p>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed text-sm">{rationale}</p>
      </div>
    </BaseCard>
  );
}
