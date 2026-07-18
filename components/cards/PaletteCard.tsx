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
      <div className="space-y-5">
        <div>
          <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Palette
          </h3>
          <h2 className="text-2xl font-bold text-amber-900">{name}</h2>
        </div>

        <div className="flex gap-3">
          {colors.map((color, index) => (
            <div key={index} className="flex-1 space-y-3">
              <div
                className="w-full h-24 rounded-xl shadow-sm"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs font-mono text-amber-800 text-center font-semibold">
                {color.toUpperCase()}
              </p>
            </div>
          ))}
        </div>

        <p className="text-amber-900 leading-relaxed text-sm">{description}</p>
      </div>
    </BaseCard>
  );
}
