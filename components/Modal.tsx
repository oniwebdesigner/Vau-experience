'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useTranslation } from '../contexts/LanguageContext';
import { easeOut } from '../utils/motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
  /** "sheet" fills the whole screen on mobile; "dialog" slides up from the bottom. */
  variant?: 'dialog' | 'sheet';
}

export function Modal({ open, onClose, labelledBy, children, className = '', variant = 'dialog' }: ModalProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, open);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const sheet = variant === 'sheet';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-[70] flex justify-center sm:items-center sm:p-6 ${sheet ? 'items-stretch' : 'items-end'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-ink/65" onClick={onClose} aria-hidden />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={{ opacity: 0, y: sheet ? 28 : 20, scale: sheet ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: sheet ? 1 : 0.98 }}
            transition={{ duration: 0.26, ease: easeOut }}
            className={`relative flex w-full flex-col bg-sand text-ink focus:outline-hidden ${
              sheet ? 'h-[100svh] sm:h-auto sm:max-h-[94svh]' : 'max-h-[94svh]'
            } ${className}`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.common.close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-sand text-ink transition-colors duration-200 hover:bg-ink hover:text-sand"
            >
              <XIcon className="h-4 w-4" />
            </button>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
