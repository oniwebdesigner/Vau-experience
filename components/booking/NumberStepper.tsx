'use client';

import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

interface NumberStepperProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  hint?: string;
  required?: boolean;
  onChange: (value: number) => void;
}

const stepButton =
  'flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-150 hover:border-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/20';

export function NumberStepper({ id, label, value, min, max, hint, required, onChange }: NumberStepperProps) {
  const { t, number } = useTranslation();
  return (
    <div className="min-w-0">
      <p id={`${id}-label`} className="label text-ink-soft">
        {label}
        {required && (
          <span className="ml-1 text-clay" aria-hidden>
            *
          </span>
        )}
      </p>
      <div role="group" aria-labelledby={`${id}-label`} className="mt-1 flex h-14 items-center justify-between border-b border-ink/25">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={t.booking.decrease(label)}
          className={stepButton}
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <output aria-live="polite" className="figure min-w-[2ch] text-center text-2xl">
          {number(value)}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={t.booking.increase(label)}
          className={stepButton}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
      {hint && <p className="mt-2 text-xs text-ink-soft">{hint}</p>}
    </div>
  );
}
