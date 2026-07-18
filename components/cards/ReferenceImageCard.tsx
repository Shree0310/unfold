'use client';

interface ReferenceImageCardProps {
  searchTerms: string[];
  caption: string;
}

export function ReferenceImageCard({ searchTerms, caption }: ReferenceImageCardProps) {
  return (
    <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#db2777', marginBottom: '10px' }}>
        Visual Reference
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', borderRadius: '12px', minHeight: '200px' }}>
        <div style={{ textAlign: 'center', color: '#9f1239', opacity: 0.6 }}>
          <svg style={{ width: '48px', height: '48px', margin: '0 auto 8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div style={{ fontSize: '13px', fontWeight: 500 }}>{caption || searchTerms.join(', ')}</div>
        </div>
      </div>
    </div>
  );
}
