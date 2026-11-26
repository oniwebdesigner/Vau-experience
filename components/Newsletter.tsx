'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { RichText } from './RichText';
import { SectionLabel } from './SectionLabel';
import { useTranslation } from '../contexts/LanguageContext';
import { NEWSLETTER_SUBJECT, SITE } from '../data/site';
import { buttonClasses } from '../utils/styles';
import { easeOut } from '../utils/motion';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const { t } = useTranslation();
  const n = t.newsletter;
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return setError(n.errEmpty);
    if (!EMAIL_RE.test(value)) return setError(n.errInvalid);
    setError(null);
    window.location.href = `mailto:${SITE.newsletterEmail}?subject=${encodeURIComponent(
      NEWSLETTER_SUBJECT,
    )}&body=${encodeURIComponent(n.mailBody(value))}`;
    setDone(true);
  };

  return (
    <section className="border-t border-ink/10 bg-sand-deep" aria-labelledby="newsletter-title">
      <div className="mx-auto grid max-w-site gap-10 px-5 py-20 md:grid-cols-12 md:items-end md:gap-6 md:px-10 md:py-28">
        <div className="md:col-span-6">
          <SectionLabel>{n.label}</SectionLabel>
          <h2
            id="newsletter-title"
            className="mt-5 font-display text-[clamp(2.25rem,4.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
          >
            <RichText text={n.title} emClassName="text-lagoon" />
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">{n.body}</p>
        </div>

        <div className="min-w-0 md:col-span-5 md:col-start-8">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: easeOut }}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lagoon text-sand">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-[-0.03em]">{n.successTitle}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{n.successBody}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('');
                        setDone(false);
                      }}
                      className="mt-4 border-b border-ink/25 pb-0.5 text-[14px] font-medium transition-colors duration-200 hover:border-clay hover:text-clay"
                    >
                      {n.again}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="newsletter-email" className="label text-ink-soft">
                  {n.emailLabel}
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder={n.placeholder}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'newsletter-error' : 'newsletter-note'}
                    className="h-12 min-w-0 flex-1 rounded-full border border-ink/20 bg-sand-paper px-5 text-[15px] text-ink placeholder:text-ink/40 transition-colors duration-200 focus:border-lagoon focus:outline-hidden"
                  />
                  <button type="submit" className={buttonClasses('primary')}>
                    {n.subscribe} <ArrowRightIcon />
                  </button>
                </div>
                {error ? (
                  <p id="newsletter-error" role="alert" className="mt-3 text-sm text-clay-deep">
                    {error}
                  </p>
                ) : (
                  <p id="newsletter-note" className="mt-3 text-sm text-ink-soft">
                    {n.privacy}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
