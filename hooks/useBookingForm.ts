'use client';

import { useCallback, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useTranslation } from '../contexts/LanguageContext';
import { useTours } from '../contexts/ToursContext';
import type { Dictionary } from '../i18n/sq';
import { estimateTotal, findBookable } from '../utils/bookable';
import type { BookingDetails } from '../utils/booking';

export interface BookingValues {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  date: string;
  adults: number;
  children: number;
  language: string;
  requests: string;
  consent: boolean;
}

export type BookingField = keyof BookingValues;
export type BookingErrors = Partial<Record<BookingField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

function validate(v: BookingValues, t: Dictionary): BookingErrors {
  const msg = t.booking.errors;
  const e: BookingErrors = {};
  if (!v.firstName.trim()) e.firstName = msg.firstName;
  if (!v.lastName.trim()) e.lastName = msg.lastName;
  if (!v.email.trim()) e.email = msg.emailEmpty;
  else if (!EMAIL_RE.test(v.email.trim())) e.email = msg.emailInvalid;
  const digits = v.phone.replace(/\D/g, '');
  if (!v.phone.trim()) e.phone = msg.phoneEmpty;
  else if (!/^[\d\s-]+$/.test(v.phone.trim()) || digits.length < 6 || digits.length > 14) e.phone = msg.phoneInvalid;
  if (!v.date) e.date = msg.dateEmpty;
  else if (v.date < todayISO()) e.date = msg.datePast;
  if (v.adults < 1) e.adults = msg.adults;
  if (!v.consent) e.consent = msg.consent;
  return e;
}

export function useBookingForm(tourId: string) {
  const { t, loc } = useTranslation();
  const [values, setValues] = useState<BookingValues>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+355',
    phone: '',
    date: '',
    adults: 2,
    children: 0,
    language: 'Shqip',
    requests: '',
    consent: false,
  });
  const [touched, setTouched] = useState<Partial<Record<BookingField, boolean>>>({});

  const errors = useMemo(() => validate(values, t), [values, t]);
  const { bookableTours } = useTours();
  // BookingModal only mounts the panel when at least one tour exists.
  const tour = findBookable(bookableTours, tourId) ?? bookableTours[0];
  const total = estimateTotal(tour.pricePerPerson, values.adults, values.children);
  const isValid = Object.keys(errors).length === 0;

  const setField = useCallback(<K extends BookingField>(key: K, value: BookingValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
  }, []);

  const touch = useCallback((key: BookingField) => {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }, []);

  const touchAll = useCallback(() => {
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])) as Partial<Record<BookingField, boolean>>);
  }, [values]);

  const visibleError = (key: BookingField) => (touched[key] ? errors[key] : undefined);

  const details: BookingDetails = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    phone: `${values.countryCode} ${values.phone.trim()}`,
    tourTitle: loc(tour.title),
    tourKind: tour.kind,
    date: values.date,
    adults: values.adults,
    children: values.children,
    language: values.language,
    requests: values.requests,
    total,
  };

  return { values, setField, touch, touchAll, visibleError, errors, isValid, tour, total, details };
}

export type BookingFormApi = ReturnType<typeof useBookingForm>;
