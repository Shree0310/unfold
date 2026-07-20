'use client';

import { useState } from 'react';

interface FontPairCardProps {
  headingFont: string;
  bodyFont: string;
  rationale: string;
}

export function FontPairCard({ headingFont, bodyFont, rationale }: FontPairCardProps) {
  const [copied, setCopied] = useState(false);

  const copyFontPair = async () => {
    try {
      const text = `Heading: ${headingFont}\nBody: ${bodyFont}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy fonts:', err);
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9333ea' }}>
          Typography
        </div>
        <button
          onClick={copyFontPair}
          style={{
            padding: '4px 8px',
            background: copied ? '#9333ea' : '#fff',
            border: '1px solid #e9d5ff',
            borderRadius: '6px',
            fontSize: '10px',
            fontWeight: 500,
            color: copied ? '#fff' : '#9333ea',
            cursor: 'pointer',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onMouseEnter={(e) => !copied && (e.currentTarget.style.background = '#faf5ff')}
          onMouseLeave={(e) => !copied && (e.currentTarget.style.background = '#fff')}
        >
          {copied ? (
            <>
              <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
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
