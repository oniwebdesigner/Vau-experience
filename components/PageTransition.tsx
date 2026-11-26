'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from './Footer';
import { Newsletter } from './Newsletter';

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <main>{children}</main>
      <Newsletter />
      <Footer />
    </motion.div>
  );
}
