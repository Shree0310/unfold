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
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Visual Reference
          </h3>
          <h2 className="text-2xl font-bold text-gray-900">Inspiration</h2>
        </div>

        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
          <div className="text-center space-y-2">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
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
                  className="px-3 py-1 bg-white text-sm text-gray-700 rounded-full shadow-sm"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed italic">{caption}</p>
      </div>
    </BaseCard>
  );
}
