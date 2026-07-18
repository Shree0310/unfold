'use client';

interface MoodPhraseCardProps {
  phrases: string[];
}

export function MoodPhraseCard({ phrases }: MoodPhraseCardProps) {
  return (
    <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0d9488', marginBottom: '10px' }}>
        Mood & Voice
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {phrases.slice(0, 3).map((phrase, index) => (
          <div key={index} style={{ fontSize: '14px', color: '#78350f', lineHeight: '1.4' }}>
            {phrase}
          </div>
        ))}
      </div>
    </div>
  );
}
