'use client';

import React, { useEffect, useRef } from 'react';
import { CheckIcon } from 'lucide-react';
import { RichText } from '../RichText';
import type { BookingChannel } from './BookingForm';
import { useTranslation } from '../../contexts/LanguageContext';
import { bookingLines, type BookingDetails } from '../../utils/booking';
import { buttonClasses } from '../../utils/styles';

interface BookingConfirmationProps {
  details: BookingDetails;
  channel: BookingChannel;
  onClose: () => void;
  onResend: () => void;
}

export function BookingConfirmation({ details, channel, onClose, onResend }: BookingConfirmationProps) {
  const { t, lang } = useTranslation();
  const c = t.booking.confirmation;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const channelName = channel === 'whatsapp' ? 'WhatsApp' : 'Email';

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div role="status">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lagoon text-sand">
        <CheckIcon className="h-5 w-5" />
      </span>
      <p className="label mt-8 text-clay">{c.eyebrow(channelName)}</p>
      <h2
        id="booking-title"
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 break-words font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] focus:outline-hidden md:text-5xl"
      >
        <RichText text={c.thanks(details.firstName)} emClassName="text-lagoon" />
      </h2>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
        {channel === 'whatsapp' ? c.bodyWhatsapp : c.bodyEmail}
      </p>

      <dl className="mt-10 border-t border-ink/15">
        {bookingLines(details, t, lang).map((line) => (
          <div
            key={line.label}
            className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] gap-4 border-b border-ink/15 py-3 sm:grid-cols-[11rem_minmax(0,1fr)]"
          >
            <dt className="label pt-0.5 text-ink-soft">{line.label}</dt>
            <dd className={`break-words text-[15px] tabular-nums ${line.emphasis ? 'font-semibold' : ''}`}>{line.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={onClose} className={buttonClasses('primary', 'sm:flex-1')}>
          {c.close}
        </button>
        <button type="button" onClick={onResend} className={buttonClasses('outline', 'sm:flex-1')}>
          {c.reopen(channelName)}
        </button>
      </div>
    </div>
  );
}
