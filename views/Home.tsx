'use client';

import React from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { HomeIntro } from '../components/home/HomeIntro';
import { QuoteBand } from '../components/home/QuoteBand';
import { FeaturedTours } from '../components/home/FeaturedTours';
import { CategoryIndex } from '../components/home/CategoryIndex';
import { BikeRental } from '../components/home/BikeRental';
import { PremiumTeaser } from '../components/home/PremiumTeaser';
import { CustomRequest } from '../components/home/CustomRequest';
import { TaglineBand } from '../components/home/TaglineBand';
import { usePageMeta } from '../hooks/usePageMeta';

export function Home() {
  usePageMeta('home');
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <QuoteBand />
      <FeaturedTours />
      <CategoryIndex />
      <BikeRental />
      <PremiumTeaser />
      <CustomRequest />
      <TaglineBand />
    </>
  );
}
