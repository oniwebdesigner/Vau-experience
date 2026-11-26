'use client';

import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { ContactForm } from '../components/contact/ContactForm';
import { MapEmbed } from '../components/contact/MapEmbed';
import { useTranslation } from '../contexts/LanguageContext';
import { site } from '../data/site';
import { bikeRental } from '../data/bikes';
import { usePageMeta } from '../hooks/usePageMeta';
import { whatsappUrl } from '../utils/booking';

export function Contact() {
  usePageMeta('contact');
  const { t, loc } = useTranslation();
  const c = t.contactPage;

  const channels = [
    { label: 'WhatsApp', value: site.phoneDisplay, href: whatsappUrl(t.common.whatsappDefault), note: c.notes.whatsapp },
    { label: 'Email', value: site.email, href: `mailto:${site.email}`, note: c.notes.email },
    { label: 'Instagram', value: site.instagramHandle, href: site.instagramUrl, note: c.notes.instagram },
  ];

  return (
    <>
      <PageHeader label={c.label} title={c.title} intro={c.intro} />

      <section className="mx-auto max-w-site px-5 pb-20 md:px-10 md:pb-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="min-w-0 md:col-span-5">
            <ul className="border-t border-ink/15">
              {channels.map((ch) => (
                <li key={ch.label} className="border-b border-ink/15">
                  <a
                    href={ch.href}
                    target={ch.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 py-6 sm:gap-6"
                  >
                    <span className="w-20 shrink-0 sm:w-24">
                      <span className="label block text-ink-soft">{ch.label}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block break-all font-display text-2xl font-semibold tracking-[-0.025em] transition-colors duration-200 group-hover:text-clay md:text-[1.75rem]">
                        {ch.value}
                      </span>
                      <span className="mt-1 block text-sm text-ink-soft">{ch.note}</span>
                    </span>
                    <ArrowUpRightIcon className="ml-auto h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay" />
                  </a>
                </li>
              ))}
            </ul>

            <dl className="mt-12 grid grid-cols-2 gap-8">
              <div className="min-w-0">
                <dt className="label text-ink-soft">{c.hours}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed">
                  {loc(site.hours)}
                  <br />
                  <span className="text-ink-soft">{loc(site.season)}</span>
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="label text-ink-soft">{c.response}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed">
                  {loc(site.responseTime)}
                  <br />
                  <span className="text-ink-soft">{c.languages}</span>
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="label text-ink-soft">{c.address}</dt>
                <dd className="mt-2 text-[15px]">{loc(site.address)}</dd>
              </div>
            </dl>

            <div className="mt-12 border-t border-ink/15 pt-8">
              <p className="label text-ink-soft">{t.bikesSection.contactTitle}</p>
              <p className="mt-2 text-[15px] leading-relaxed">{loc(bikeRental.noteBody)}</p>
              <p className="price mt-1 text-ink-soft">{loc(bikeRental.priceNote)}</p>
              <a
                href={whatsappUrl(loc(bikeRental.whatsappMessage))}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[14px] font-medium transition-colors duration-200 hover:border-clay hover:text-clay"
              >
                {loc(bikeRental.cta)} <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0 md:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-site px-5 pb-24 md:px-10 md:pb-36">
        <Reveal>
          <MapEmbed />
        </Reveal>
      </section>
    </>
  );
}
