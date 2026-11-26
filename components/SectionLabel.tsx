'use client';

import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/** Plain-word eyebrow label: no numbers, no dashes. */
export function SectionLabel({ children, className = 'text-ink-soft' }: SectionLabelProps) {
  return <p className={`label ${className}`}>{children}</p>;
}
