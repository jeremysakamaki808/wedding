'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WaxSeal from '@/components/ui/WaxSeal';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

/* ---- The invitation is sealed ----------------------------------------------
   The RSVP call is the couple's burgundy wax seal — the same stamp that
   closes the reply card down in the RSVP section, so pressing it here
   carries you to the card it seals. Framer Motion gives it weight: it
   presses itself onto the page on arrival, lifts under the cursor, and
   stamps down on click. */

const LABEL = (
  <>
    <span className="uppercase tracking-[0.24em] text-sm md:text-base font-bold text-gold-light [text-shadow:0_2px_8px_rgba(19,26,48,0.8)]">
      RSVP
    </span>
    <span className="uppercase tracking-[0.2em] font-semibold text-[10px] md:text-xs text-cream/80 [text-shadow:0_2px_8px_rgba(19,26,48,0.8)]">
      Kindly reply by September 16, 2026
    </span>
  </>
);

export default function HeroCTA() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className="mt-5 md:mt-6">
        <a href="#rsvp" className="group inline-flex flex-col items-center gap-2">
          <WaxSeal variant="button" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md" />
          {LABEL}
        </a>
      </div>
    );
  }

  return (
    <div className="mt-5 md:mt-6">
      <motion.a
        href="#rsvp"
        className="group inline-flex flex-col items-center gap-2"
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.45, ease: [0.2, 0.9, 0.3, 1.15] }}
        whileHover={{ y: -3, rotate: 1, scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
      >
        <WaxSeal variant="button" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md" />
        {LABEL}
      </motion.a>
    </div>
  );
}
