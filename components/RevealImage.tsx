'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { easeOut } from '../utils/motion';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export function RevealImage({ src, alt, className = '', imgClassName = '' }: RevealImageProps) {
  const reduce = useReducedMotion();
  return (
    <div className={`overflow-hidden bg-sand-deep ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0, scale: reduce ? 1 : 1.07 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.3, ease: easeOut }}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
