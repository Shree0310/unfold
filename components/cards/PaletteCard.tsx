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
          <h3 className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            Color Palette
          </h3>
          <h2 className="text-xl font-bold text-slate-800">{name}</h2>
        </div>

        <div className="flex gap-2">
          {colors.map((color, index) => (
            <div key={index} className="flex-1 space-y-2">
              <div
                className="w-full h-20 rounded-lg border border-slate-200"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs font-mono text-slate-500 text-center">
                {color.toUpperCase()}
              </p>
            </div>
          ))}
        </div>

        <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
      </div>
    </BaseCard>
  );
}
