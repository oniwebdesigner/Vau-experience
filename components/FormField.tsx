'use client';

import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ id, label, error, optional, required, hint, className = '', children }: FormFieldProps) {
  const { t } = useTranslation();
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="label flex justify-between gap-4 text-ink-soft">
        <span>
          {label}
          {required && (
            <span className="ml-1 text-clay" aria-hidden>
              *
            </span>
          )}
        </span>
        {optional && <span className="shrink-0 font-medium normal-case tracking-normal text-ink/45">{t.common.optional}</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-xs text-ink-soft">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-clay-deep">
          {error}
        </p>
      )}
    </div>
  );
}
