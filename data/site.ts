import type { Localized } from '../i18n/types';

/** Booking requests and contact links are sent here — edit once, used everywhere. */
export const WHATSAPP_NUMBER = '355694127780';
export const CONTACT_EMAIL = 'info@vauexperience.al';

/**
 * PLACEHOLDER — replace with the real Gmail inbox that should receive newsletter sign-ups.
 * There is no backend yet: subscribing opens a mailto: to this address.
 */
export const NEWSLETTER_EMAIL = 'info.vauexperience@gmail.com';
export const NEWSLETTER_SUBJECT = 'Newsletter – Abonim';

/** Brand name and slogan stay identical in every language. */
export const brand = {
  name: 'VAU Experience',
  sloganLead: 'You’re',
  sloganEm: 'Our',
  sloganTail: 'Guest',
};

export const site: {
  phoneDisplay: string;
  whatsappNumber: string;
  email: string;
  newsletterEmail: string;
  instagramHandle: string;
  instagramUrl: string;
  mapUrl: string;
  mapQuery: string;
  address: Localized;
  hours: Localized;
  season: Localized;
  responseTime: Localized;
  coordinates: Localized;
} = {
  phoneDisplay: '+355 69 412 7780',
  whatsappNumber: WHATSAPP_NUMBER,
  email: CONTACT_EMAIL,
  newsletterEmail: NEWSLETTER_EMAIL,
  instagramHandle: '@vauexperience',
  instagramUrl: 'https://instagram.com/vauexperience',
  mapUrl: 'https://maps.google.com/?q=Divjak%C3%AB-Karavasta+National+Park',
  mapQuery: 'Divjakë-Karavasta National Park, Albania',
  address: {
    sq: 'Rruga e Parkut, Divjakë 9001, Shqipëri',
    en: 'Rruga e Parkut, Divjakë 9001, Albania',
    it: 'Rruga e Parkut, Divjakë 9001, Albania',
  },
  hours: {
    sq: 'Çdo ditë, 07:00 – 20:00',
    en: 'Daily, 07:00 – 20:00',
    it: 'Tutti i giorni, 07:00 – 20:00',
  },
  season: {
    sq: 'Sezoni kryesor: mars – nëntor',
    en: 'Main season: March – November',
    it: 'Alta stagione: marzo – novembre',
  },
  responseTime: {
    sq: 'Përgjigjemi brenda 2 orësh',
    en: 'We reply within 2 hours',
    it: 'Rispondiamo entro 2 ore',
  },
  coordinates: {
    sq: '40°55′ V · 19°29′ L',
    en: '40°55′ N · 19°29′ E',
    it: '40°55′ N · 19°29′ E',
  },
};

/** Alias, so the newsletter address reads as SITE.newsletterEmail. */
export const SITE = site;

export const navLinks: { to: string; label: Localized }[] = [
  { to: '/', label: { sq: 'Kreu', en: 'Home', it: 'Home' } },
  { to: '/rreth-nesh', label: { sq: 'Rreth Nesh', en: 'About us', it: 'Chi siamo' } },
  { to: '/touret', label: { sq: 'Touret', en: 'Tours', it: 'Tour' } },
  { to: '/kontakt', label: { sq: 'Kontakt', en: 'Contact', it: 'Contatti' } },
];

/** Premium stands apart from the other links in the navbar. */
export const premiumLink: { to: string; label: Localized } = {
  to: '/premium',
  label: { sq: 'Premium', en: 'Premium', it: 'Premium' },
};
