import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../data/site';
import type { Dictionary } from '../i18n/sq';
import type { Lang } from '../i18n/types';
import type { BookingKind } from '../types/tour';
import { formatDate, formatNumber, formatPrice } from './format';

export interface BookingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tourTitle: string;
  tourKind: BookingKind;
  date: string;
  adults: number;
  children: number;
  language: string;
  requests: string;
  total: number;
}

export interface BookingLine {
  label: string;
  value: string;
  emphasis?: boolean;
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function bookingLines(d: BookingDetails, t: Dictionary, lang: Lang): BookingLine[] {
  const L = t.booking.lines;
  return [
    { label: L.firstName, value: d.firstName },
    { label: L.lastName, value: d.lastName },
    { label: L.email, value: d.email },
    { label: L.phone, value: d.phone },
    { label: L.tour, value: d.tourKind === 'premium' ? `${d.tourTitle}${t.booking.message.premiumSuffix}` : d.tourTitle },
    { label: L.date, value: formatDate(d.date, lang) },
    { label: L.adults, value: formatNumber(d.adults, lang) },
    { label: L.children, value: formatNumber(d.children, lang) },
    { label: L.language, value: d.language },
    { label: L.requests, value: d.requests.trim() || '—' },
    { label: L.total, value: formatPrice(d.total, lang), emphasis: true },
  ];
}

export function buildBookingMessage(d: BookingDetails, t: Dictionary, lang: Lang): string {
  const m = t.booking.message;
  const lines = bookingLines(d, t, lang).map((l) => `• ${l.label}: ${l.value}`);
  return [m.greeting, m.intro, '', ...lines, '', m.thanks].join('\n');
}

export function bookingSubject(d: BookingDetails, t: Dictionary): string {
  return `${t.booking.message.subject} – ${d.tourTitle} – ${d.firstName} ${d.lastName}`.trim();
}

export function bookingWhatsappUrl(d: BookingDetails, t: Dictionary, lang: Lang): string {
  return whatsappUrl(buildBookingMessage(d, t, lang));
}

export function bookingEmailUrl(d: BookingDetails, t: Dictionary, lang: Lang): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(bookingSubject(d, t))}&body=${encodeURIComponent(
    buildBookingMessage(d, t, lang),
  )}`;
}
