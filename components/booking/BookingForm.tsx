'use client';

import React from 'react';
import { MailIcon, MessageCircleIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { FormField } from '../FormField';
import { FormSection } from './FormSection';
import { NumberStepper } from './NumberStepper';
import { useTranslation } from '../../contexts/LanguageContext';
import { countryCodes, guideLanguages } from '../../data/booking';
import { todayISO, type BookingField, type BookingFormApi } from '../../hooks/useBookingForm';
import { buttonClasses, fieldClasses } from '../../utils/styles';

export type BookingChannel = 'whatsapp' | 'email';

interface BookingFormProps {
  form: BookingFormApi;
  onSend: (channel: BookingChannel) => void;
}

export function BookingForm({ form, onSend }: BookingFormProps) {
  const { values, setField, touch, touchAll, visibleError, isValid, total } = form;
  const { t, price, lang } = useTranslation();
  const b = t.booking;

  const a11y = (key: BookingField, id: string) => ({
    'aria-invalid': !!visibleError(key),
    'aria-describedby': visibleError(key) ? `${id}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()} className="space-y-12">
      <FormSection title={b.sections.personal}>
        <div className="grid gap-7 sm:grid-cols-2">
          <FormField id="bk-first" label={b.firstName} required error={visibleError('firstName')}>
            <input
              id="bk-first"
              autoComplete="given-name"
              value={values.firstName}
              onChange={(e) => setField('firstName', e.target.value)}
              onBlur={() => touch('firstName')}
              className={fieldClasses}
              aria-required
              {...a11y('firstName', 'bk-first')}
            />
          </FormField>
          <FormField id="bk-last" label={b.lastName} required error={visibleError('lastName')}>
            <input
              id="bk-last"
              autoComplete="family-name"
              value={values.lastName}
              onChange={(e) => setField('lastName', e.target.value)}
              onBlur={() => touch('lastName')}
              className={fieldClasses}
              aria-required
              {...a11y('lastName', 'bk-last')}
            />
          </FormField>
          <FormField id="bk-email" label={b.email} required error={visibleError('email')}>
            <input
              id="bk-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={b.emailPh}
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={() => touch('email')}
              className={fieldClasses}
              aria-required
              {...a11y('email', 'bk-email')}
            />
          </FormField>
          <FormField id="bk-phone" label={b.phone} required error={visibleError('phone')}>
            <div className="flex gap-3">
              <select
                aria-label={b.countryPrefix}
                value={values.countryCode}
                onChange={(e) => setField('countryCode', e.target.value)}
                className={twMerge(fieldClasses, 'w-[6.25rem] shrink-0 cursor-pointer tabular-nums')}
              >
                {countryCodes.map((c) => (
                  <option key={c.label} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                id="bk-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder={b.phonePh}
                value={values.phone}
                onChange={(e) => setField('phone', e.target.value)}
                onBlur={() => touch('phone')}
                className={twMerge(fieldClasses, 'min-w-0 tabular-nums')}
                aria-required
                {...a11y('phone', 'bk-phone')}
              />
            </div>
          </FormField>
        </div>
      </FormSection>

      <FormSection title={b.sections.details}>
        <div className="grid gap-7 sm:grid-cols-2">
          <FormField id="bk-date" label={b.date} required error={visibleError('date')} className="sm:col-span-2">
            <input
              id="bk-date"
              type="date"
              lang={lang}
              min={todayISO()}
              value={values.date}
              onChange={(e) => {
                setField('date', e.target.value);
                touch('date');
              }}
              onBlur={() => touch('date')}
              className={twMerge(fieldClasses, 'tabular-nums')}
              aria-required
              {...a11y('date', 'bk-date')}
            />
          </FormField>
          <NumberStepper
            id="bk-adults"
            label={b.adults}
            required
            value={values.adults}
            min={1}
            max={20}
            onChange={(n) => setField('adults', n)}
          />
          <NumberStepper
            id="bk-children"
            label={b.children}
            value={values.children}
            min={0}
            max={10}
            onChange={(n) => setField('children', n)}
          />
          <fieldset className="min-w-0 sm:col-span-2">
            <legend className="label text-ink-soft">{b.language}</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {guideLanguages.map((l) => (
                <label key={l} className="relative min-w-0 cursor-pointer">
                  <input
                    type="radio"
                    name="bk-language"
                    value={l}
                    checked={values.language === l}
                    onChange={() => setField('language', l)}
                    className="peer sr-only"
                  />
                  <span className="flex h-11 items-center justify-center rounded-full border border-ink/20 px-2 text-[13px] font-semibold transition-colors duration-150 hover:border-ink/50 peer-checked:border-lagoon peer-checked:bg-lagoon peer-checked:text-sand peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay">
                    {l}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </FormSection>

      <FormSection title={b.sections.other}>
        <div className="grid gap-7">
          <FormField id="bk-requests" label={b.requests} optional>
            <textarea
              id="bk-requests"
              rows={3}
              placeholder={b.requestsPh}
              value={values.requests}
              onChange={(e) => setField('requests', e.target.value)}
              className={twMerge(fieldClasses, 'resize-none')}
            />
          </FormField>
          <div>
            <label htmlFor="bk-consent" className="flex cursor-pointer items-start gap-4">
              <input
                id="bk-consent"
                type="checkbox"
                checked={values.consent}
                onChange={(e) => {
                  setField('consent', e.target.checked);
                  touch('consent');
                }}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-lagoon"
                aria-required
                {...a11y('consent', 'bk-consent')}
              />
              <span className="text-[14px] leading-relaxed text-ink/85">
                {b.consent}
                <span className="ml-1 text-clay" aria-hidden>
                  *
                </span>
              </span>
            </label>
            {visibleError('consent') && (
              <p id="bk-consent-error" role="alert" className="mt-2 pl-9 text-sm text-clay-deep">
                {visibleError('consent')}
              </p>
            )}
          </div>
        </div>
      </FormSection>

      <div className="border-t border-ink/15 pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2" aria-live="polite">
          <span className="label text-ink-soft">{b.total}</span>
          <span className="price whitespace-nowrap text-[15px] text-ink">{price(total)}</span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={!isValid}
            onClick={() => onSend('whatsapp')}
            aria-describedby={!isValid ? 'bk-hint' : undefined}
            className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-whatsapp px-5 text-[13px] font-semibold tracking-[0.04em] text-whatsapp-deep transition-colors duration-200 hover:bg-whatsapp/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <MessageCircleIcon className="h-4 w-4 shrink-0 text-whatsapp" /> {b.sendWhatsapp}
          </button>
          <button
            type="button"
            disabled={!isValid}
            onClick={() => onSend('email')}
            aria-describedby={!isValid ? 'bk-hint' : undefined}
            className={buttonClasses('primary', 'px-5 disabled:opacity-40 disabled:hover:bg-lagoon')}
          >
            <MailIcon /> {b.sendEmail}
          </button>
        </div>

        {!isValid && (
          <p id="bk-hint" className="mt-4 text-sm text-ink-soft">
            {b.missing}{' '}
            <button
              type="button"
              onClick={touchAll}
              className="font-semibold text-lagoon underline decoration-lagoon/30 underline-offset-4 transition-colors duration-200 hover:decoration-lagoon"
            >
              {b.showMissing}
            </button>
          </p>
        )}
      </div>
    </form>
  );
}
