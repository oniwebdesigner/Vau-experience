'use client';

import React from 'react';

interface RichTextProps {
  /** Text where *words between asterisks* become emphasised. */
  text: string;
  emClassName?: string;
}

export function RichText({ text, emClassName }: RichTextProps) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
          <em key={i} className={emClassName}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}
