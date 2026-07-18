'use client';

import { BaseCard } from './BaseCard';

interface ReferenceImageCardProps {
  searchTerms: string[];
  caption: string;
}

export function ReferenceImageCard({ searchTerms, caption }: ReferenceImageCardProps) {
  return (
    <BaseCard>
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-violet-500 uppercase tracking-wider mb-1">
            Visual Reference
          </h3>
          <h2 className="text-xl font-bold text-slate-800">Inspiration</h2>
        </div>

        <div className="bg-slate-50 rounded-lg p-8 flex items-center justify-center min-h-[200px] border border-slate-200">
          <div className="text-center space-y-3">
            <svg
              className="w-14 h-14 mx-auto text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="flex flex-wrap gap-2 justify-center">
              {searchTerms.map((term, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-xs text-slate-600 rounded-full border border-slate-200"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed italic text-sm">{caption}</p>
      </div>
    </BaseCard>
  );
}
