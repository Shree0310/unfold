'use client';

import { useState, useEffect } from 'react';

interface ReferenceImageCardProps {
  searchTerms: string[];
  caption: string;
}

export function ReferenceImageCard({ searchTerms, caption }: ReferenceImageCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch image from Picsum (Lorem Picsum - reliable placeholder images)
    const fetchImage = async () => {
      try {
        const query = searchTerms[0] || 'design';
        // Use Picsum with a seed based on the query for consistent images
        const seed = query.toLowerCase().replace(/\s+/g, '-');
        const url = `https://picsum.photos/seed/${seed}/600/400`;

        // Preload the image to check if it loads successfully
        const img = new Image();
        img.onload = () => {
          setImageUrl(url);
          setIsLoading(false);
        };
        img.onerror = () => {
          console.error('Error loading image');
          setIsLoading(false);
        };
        img.src = url;
      } catch (error) {
        console.error('Error loading image:', error);
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [searchTerms]);

  return (
    <div style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: '20px', padding: '22px', boxShadow: '0 8px 24px rgba(120,53,15,0.10)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#db2777', marginBottom: '10px' }}>
        Visual Reference
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', borderRadius: '12px', minHeight: '200px', overflow: 'hidden', position: 'relative' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', color: '#9f1239', opacity: 0.4 }}>
            <svg style={{ width: '48px', height: '48px', margin: '0 auto 8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div style={{ fontSize: '13px', fontWeight: 500 }}>Loading...</div>
          </div>
        ) : imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={caption || searchTerms.join(', ')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              onError={() => setImageUrl(null)}
            />
            {caption && (
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(255,255,255,0.95)', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', color: '#78350f', fontWeight: 500 }}>
                {caption}
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', color: '#9f1239', opacity: 0.6 }}>
            <svg style={{ width: '48px', height: '48px', margin: '0 auto 8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div style={{ fontSize: '13px', fontWeight: 500 }}>{searchTerms.join(', ')}</div>
          </div>
        )}
      </div>
    </div>
  );
}
