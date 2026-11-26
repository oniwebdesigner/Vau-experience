'use client';

import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="w-full border-b border-ink/15 pb-4">
        <span className="font-display text-xl font-semibold tracking-[-0.02em]">{title}</span>
      </legend>
      <div className="pt-7">{children}</div>
    </fieldset>
  );
}
