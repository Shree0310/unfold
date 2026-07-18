'use client';

import { BaseCard } from './BaseCard';

interface ReferenceImageCardProps {
  searchTerms: string[];
  caption: string;
}

export function ReferenceImageCard({ searchTerms, caption }: ReferenceImageCardProps) {
  return (
    <BaseCard>
      <div className="space-y-5">
        <div>
          <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Visual Reference
          </h3>
          <h2 className="text-2xl font-bold text-amber-900">Inspiration</h2>
        </div>

        <div className="bg-amber-50 rounded-xl p-10 flex items-center justify-center min-h-[200px] border border-amber-200">
          <div className="text-center space-y-4">
            <svg
              className="w-16 h-16 mx-auto text-amber-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="flex flex-wrap gap-2 justify-center">
              {searchTerms.map((term, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white text-xs text-amber-800 rounded-full border border-amber-300 font-semibold"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-amber-900 leading-relaxed italic text-sm font-medium">{caption}</p>
      </div>
    </BaseCard>
  );
}
