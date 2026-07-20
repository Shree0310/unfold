'use client';

import { useState } from 'react';

interface PaletteCardProps {
  name: string;
  colors: string[];
  description: string;
}

export function PaletteCard({ name, colors, description }: PaletteCardProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', height: '100%' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d97706', marginBottom: '6px' }}>
        Color palette
      </div>
      <div style={{ fontSize: '21px', fontWeight: 700, color: '#78350f', marginBottom: '14px' }}>
        {name}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => copyColor(color)}
            onMouseEnter={(e) => {
              setHoveredColor(color);
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              setHoveredColor(null);
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            }}
            style={{
              flex: 1,
              height: '80px',
              borderRadius: '12px',
              backgroundColor: color,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
            title={`Click to copy ${color}`}
          >
            {/* Tooltip showing color code on hover and copied state */}
            {(hoveredColor === color || copiedColor === color) && (
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.8)',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
              }}>
                {copiedColor === color ? 'Copied!' : color}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
