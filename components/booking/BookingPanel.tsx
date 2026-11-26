'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookingSummary } from './BookingSummary';
import { BookingForm, type BookingChannel } from './BookingForm';
import { BookingConfirmation } from './BookingConfirmation';
import { RichText } from '../RichText';
import { useTranslation } from '../../contexts/LanguageContext';
import { useBookingForm } from '../../hooks/useBookingForm';
import { bookingEmailUrl, bookingWhatsappUrl } from '../../utils/booking';
import { easeOut } from '../../utils/motion';

interface BookingPanelProps {
  initialTourId: string;
  onClose: () => void;
}

export function BookingPanel({ initialTourId, onClose }: BookingPanelProps) {
  const form = useBookingForm(initialTourId);
  const { t, lang } = useTranslation();
  const [sentVia, setSentVia] = useState<BookingChannel | null>(null);

  const send = (channel: BookingChannel) => {
    if (!form.isValid) {
      form.touchAll();
      return;
    }
    if (channel === 'whatsapp') {
      window.open(bookingWhatsappUrl(form.details, t, lang), '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = bookingEmailUrl(form.details, t, lang);
    }
    setSentVia(channel);
  };

  return (
    <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <BookingSummary tour={form.tour} adults={form.values.adults} children={form.values.children} total={form.total} />

      <div className="min-w-0 px-6 pb-12 pt-10 sm:px-10 md:pt-16">
        <AnimatePresence mode="wait" initial={false}>
          {sentVia ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26, ease: easeOut }}
            >
              <BookingConfirmation details={form.details} channel={sentVia} onClose={onClose} onResend={() => send(sentVia)} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <p className="label text-clay">{t.booking.eyebrow}</p>
              <h2 id="booking-title" className="mt-3 pr-12 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-5xl">
                <RichText text={t.booking.title} emClassName="text-lagoon" />
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
                {t.booking.introBefore} <span className="text-clay">*</span> {t.booking.introAfter}
              </p>
              <div className="mt-10">
                <BookingForm form={form} onSend={send} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
