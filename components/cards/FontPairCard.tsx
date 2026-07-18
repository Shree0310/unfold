'use client';

interface FontPairCardProps {
  headingFont: string;
  bodyFont: string;
  rationale: string;
}

export function FontPairCard({ headingFont, bodyFont, rationale }: FontPairCardProps) {
  return (
    <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9333ea', marginBottom: '6px' }}>
        Typography
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: '#78350f', marginBottom: '8px', fontFamily: headingFont }}>
        {headingFont}
      </div>
      <div style={{ fontSize: '16px', color: '#b45309', fontFamily: bodyFont }}>
        {bodyFont}
      </div>
      {rationale && (
        <div style={{ fontSize: '13px', color: '#92400e', marginTop: '12px', lineHeight: '1.5' }}>
          {rationale}
        </div>
      )}
    </div>
  );
}
