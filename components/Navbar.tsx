'use client';

import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from '@/lib/router';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Wordmark } from './Wordmark';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PremiumNavLink } from './PremiumNavLink';
import { useTranslation } from '../contexts/LanguageContext';
import { navLinks } from '../data/site';
import { easeOut } from '../utils/motion';

export function Navbar() {
  const { pathname } = useLocation();
  const { t, loc } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isDarkPage = pathname === '/premium';
  const overHero = pathname === '/' && !scrolled && !menuOpen;
  const lightText = (overHero || isDarkPage) && !menuOpen;

  const shell = menuOpen
    ? 'bg-sand text-ink border-b border-transparent'
    : overHero
      ? 'bg-transparent text-sand border-b border-transparent'
      : isDarkPage
        ? `${scrolled ? 'bg-jade-deep border-gold/20' : 'bg-transparent border-transparent'} text-sand border-b`
        : `${scrolled ? 'border-ink/10' : 'border-transparent'} bg-sand text-ink border-b`;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-out ${shell}`}>
        <div className="mx-auto flex h-20 max-w-site items-center justify-between gap-4 px-5 md:px-10">
          <Wordmark />

          <nav aria-label={t.nav.mainAria} className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-9">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `relative whitespace-nowrap py-2 text-[13px] tracking-[0.02em] transition-opacity duration-200 hover:opacity-100 ${
                        isActive ? 'opacity-100' : 'opacity-70'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {loc(link.label)}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-0 -bottom-0.5 h-px bg-current"
                            transition={{ duration: 0.25, ease: easeOut }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
              <li aria-hidden className={`h-6 w-px ${lightText ? 'bg-sand/30' : 'bg-ink/15'}`} />
              <li>
                <PremiumNavLink onDark={lightText} />
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="-mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-sand px-5 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label={t.nav.mobileAria}>
              <ul className="border-t border-ink/10">
                {navLinks.map((link) => (
                  <li key={link.to} className="border-b border-ink/10">
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block py-4 font-display text-4xl font-semibold tracking-[-0.035em] ${isActive ? 'text-lagoon' : 'text-ink'}`
                      }
                    >
                      {loc(link.label)}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PremiumNavLink onDark={false} size="menu" />
              </div>
            </nav>
            <div className="mt-auto pt-10">
              <p className="label mb-3 text-ink-soft">{t.language.label}</p>
              <LanguageSwitcher variant="tiles" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
