'use client';

import React from 'react';

/** Gold hairline with a small diamond at its centre. */
export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-gold ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gold/40" />
      <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
        <path d="M0 5h9" stroke="currentColor" strokeWidth="0.75" />
        <path d="M14 1l4 4-4 4-4-4 4-4z" stroke="currentColor" strokeWidth="0.9" />
        <path d="M19 5h9" stroke="currentColor" strokeWidth="0.75" />
      </svg>
      <span className="h-px flex-1 bg-gold/40" />
    </div>
  );
}

/** Circular VAU Experience seal / monogram. */
export function PremiumSeal({ label, className = '' }: { label: string; className?: string }) {
  const ring = `${label} · ${label} · `;
  return (
    <svg viewBox="0 0 160 160" className={`text-gold ${className}`} role="img" aria-label={label}>
      <defs>
        <path id="seal-ring" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
      </defs>
      <circle cx="80" cy="80" r="77" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <circle cx="80" cy="80" r="46" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <text fill="currentColor" fontFamily="Archivo, sans-serif" fontSize="8.2" fontWeight="600" letterSpacing="2.6">
        <textPath href="#seal-ring" startOffset="0">
          {ring.toUpperCase()}
        </textPath>
      </text>
      <path d="M80 44l3 3-3 3-3-3 3-3z" fill="currentColor" />
      <path d="M80 110l3 3-3 3-3-3 3-3z" fill="currentColor" />
      <text
        x="80"
        y="88"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Archivo, sans-serif"
        fontSize="24"
        fontWeight="600"
        letterSpacing="1"
      >
        VAU
      </text>
    </svg>
  );
}
