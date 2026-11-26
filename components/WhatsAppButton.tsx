'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircleIcon, XIcon } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { whatsappUrl } from '../utils/booking';
import { easeOut } from '../utils/motion';

const DISMISS_KEY = 'vau-wa-tip-dismissed';
const FIRST_DELAY = 4000;
const EVERY = 10000;
const VISIBLE_FOR = 5000;

function readDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

export function WhatsAppButton() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [tip, setTip] = useState(false);
  const [dismissed, setDismissed] = useState(readDismissed);

  useEffect(() => {
    if (dismissed) {
      setTip(false);
      return;
    }
    let hide: number | undefined;
    let every: number | undefined;
    const show = () => {
      setTip(true);
      hide = window.setTimeout(() => setTip(false), VISIBLE_FOR);
    };
    const first = window.setTimeout(() => {
      show();
      every = window.setInterval(show, EVERY);
    }, FIRST_DELAY);
    return () => {
      window.clearTimeout(first);
      if (every) window.clearInterval(every);
      if (hide) window.clearTimeout(hide);
    };
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8">
      <AnimatePresence>
        {tip && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: easeOut }}
            style={{ transformOrigin: 'bottom right' }}
            className="absolute bottom-full right-0 mb-4 flex items-center gap-2 rounded-[10px] bg-sand-paper py-2.5 pl-4 pr-2 text-ink shadow-[0_10px_30px_-12px_rgba(27,31,30,0.45)] ring-1 ring-ink/10"
          >
            <a
              href={whatsappUrl(t.common.whatsappDefault)}
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap text-[13px] font-semibold"
            >
              {t.whatsappTip.bubble}
            </a>
            <button
              type="button"
              onClick={dismiss}
              aria-label={t.whatsappTip.dismiss}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors duration-150 hover:bg-ink/5 hover:text-ink"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
            <span
              aria-hidden
              className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-sand-paper ring-1 ring-ink/10 [clip-path:polygon(100%_0,100%_100%,0_100%)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl(t.common.whatsappDefault)}
        target="_blank"
        rel="noreferrer"
        aria-label={t.common.whatsappAria}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6, ease: easeOut }}
        className="relative inline-flex h-14 items-center gap-2 rounded-full bg-clay px-[18px] text-sand shadow-[0_8px_24px_-12px_rgba(27,31,30,0.6)] transition-colors duration-200 hover:bg-clay-deep md:pr-6"
      >
        {!reduce && (
          <>
            {[0, 1.2].map((delay) => (
              <motion.span
                key={delay}
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border-2 border-clay"
                initial={{ opacity: 0.45, scale: 1 }}
                animate={{ opacity: 0, scale: 1.55 }}
                transition={{ duration: 2.4, delay, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
        <motion.span
          className="relative flex"
          animate={reduce ? undefined : { rotate: [0, -14, 11, -7, 4, 0], y: [0, -2, 0, -1, 0, 0] }}
          transition={reduce ? undefined : { duration: 0.7, repeat: Infinity, repeatDelay: 5.3, ease: 'easeInOut' }}
        >
          <MessageCircleIcon className="h-5 w-5" />
        </motion.span>
        <span className="relative hidden text-[13px] font-medium md:inline">WhatsApp</span>
      </motion.a>
    </div>
  );
}
