'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, LoaderIcon } from 'lucide-react';
import { FormField } from '../FormField';
import { RichText } from '../RichText';
import { useTranslation } from '../../contexts/LanguageContext';
import { useTours } from '../../contexts/ToursContext';
import { getCategory } from '../../utils/bookable';
import { buttonClasses, fieldClasses } from '../../utils/styles';
import { easeOut } from '../../utils/motion';

interface FormState {
  name: string;
  email: string;
  tour: string;
  date: string;
  guests: string;
  message: string;
}

type ErrorKey = 'errName' | 'errEmail' | 'errMessage';
type Errors = Partial<Record<keyof FormState, ErrorKey>>;

const EMPTY: FormState = { name: '', email: '', tour: '', date: '', guests: '2', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { t, loc, lang } = useTranslation();
  const { tours } = useTours();
  const f = t.contactForm;
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'errName';
    if (!EMAIL_RE.test(form.email.trim())) next.email = 'errEmail';
    if (form.message.trim().length < 10) next.message = 'errMessage';
    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus('submitting');
    try {
      const honeypot = String(new FormData(e.currentTarget).get('website') ?? '');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang, website: honeypot }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const errorFor = (key: keyof FormState) => (errors[key] ? f[errors[key] as ErrorKey] : undefined);
  const describedBy = (key: keyof FormState) => (errors[key] ? `cf-${key}-error` : undefined);

  return (
    <div className="border border-ink/10 bg-sand-paper p-6 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="py-10"
            role="status"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lagoon text-sand">
              <CheckIcon className="h-5 w-5" />
            </span>
            <h3 className="mt-8 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em]">
              <RichText text={f.thanks(form.name.split(' ')[0])} emClassName="text-lagoon" />
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">{f.thanksBody(form.email)}</p>
            <button
              type="button"
              onClick={() => {
                setForm(EMPTY);
                setStatus('idle');
              }}
              className={buttonClasses('outline', 'mt-8')}
            >
              {f.again}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            noValidate
            className="grid gap-8 sm:grid-cols-2"
          >
            <FormField id="cf-name" label={f.name} error={errorFor('name')}>
              <input
                id="cf-name"
                autoComplete="name"
                value={form.name}
                onChange={update('name')}
                placeholder={f.namePh}
                className={fieldClasses}
                aria-invalid={!!errors.name}
                aria-describedby={describedBy('name')}
              />
            </FormField>
            <FormField id="cf-email" label={f.email} error={errorFor('email')}>
              <input
                id="cf-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={update('email')}
                placeholder={f.emailPh}
                className={fieldClasses}
                aria-invalid={!!errors.email}
                aria-describedby={describedBy('email')}
              />
            </FormField>
            <FormField id="cf-tour" label={f.tour} optional className="sm:col-span-2">
              <select id="cf-tour" value={form.tour} onChange={update('tour')} className={`${fieldClasses} cursor-pointer`}>
                <option value="">{f.tourUnsure}</option>
                {tours.map((tour) => (
                  <option key={tour.id} value={loc(tour.title)}>
                    {loc(tour.title)} · {loc(getCategory(tour.category).label)}
                  </option>
                ))}
                <option value={f.tourBikes}>{f.tourBikes}</option>
                <option value={f.tourPrivate}>{f.tourPrivate}</option>
              </select>
            </FormField>
            <FormField id="cf-date" label={f.date} optional>
              <input id="cf-date" type="date" lang={lang} value={form.date} onChange={update('date')} className={fieldClasses} />
            </FormField>
            <FormField id="cf-guests" label={f.guests}>
              <input
                id="cf-guests"
                type="number"
                min={1}
                max={30}
                value={form.guests}
                onChange={update('guests')}
                className={fieldClasses}
              />
            </FormField>
            <FormField id="cf-message" label={f.message} error={errorFor('message')} className="sm:col-span-2">
              <textarea
                id="cf-message"
                rows={4}
                value={form.message}
                onChange={update('message')}
                placeholder={f.messagePh}
                className={`${fieldClasses} resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={describedBy('message')}
              />
            </FormField>
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            {status === 'error' && (
              <p role="alert" className="text-sm font-medium text-clay sm:col-span-2">
                {f.errSend}
              </p>
            )}
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-soft">{f.responseNote}</p>
              <button type="submit" disabled={status === 'submitting'} className={buttonClasses('primary')}>
                {status === 'submitting' ? (
                  <>
                    <LoaderIcon className="animate-spin" /> {f.sending}
                  </>
                ) : (
                  <>
                    {f.send} <ArrowRightIcon />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
