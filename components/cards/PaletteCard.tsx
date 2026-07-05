'use client';

import { BaseCard } from './BaseCard';

interface PaletteCardProps {
  name: string;
  colors: string[];
  description: string;
}

export function PaletteCard({ name, colors, description }: PaletteCardProps) {
  return (
    <BaseCard>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Color Palette
          </h3>
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        </div>

        <div className="flex gap-2">
          {colors.map((color, index) => (
            <div key={index} className="flex-1 space-y-2">
              <div
                className="w-full h-20 rounded-lg shadow-sm"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs font-mono text-gray-600 text-center">
                {color.toUpperCase()}
              </p>
            </div>
          ))}
        </div>

        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </BaseCard>
  );
}
