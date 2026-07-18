'use client';

interface PaletteCardProps {
  name: string;
  colors: string[];
  description: string;
}

export function PaletteCard({ name, colors, description }: PaletteCardProps) {
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
            style={{ flex: 1, height: '80px', borderRadius: '12px', backgroundColor: color, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
