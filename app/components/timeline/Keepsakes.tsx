'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WaxSeal from '@/components/ui/WaxSeal';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';
import type { VenueImage } from '@/types';

/* ---- Keepsakes on the lawn -------------------------------------------------
   Ephemera from the day scattered through the timeline's quiet corners — a
   polaroid of the grounds, the shuttle ticket stub, a pressed hibiscus, the
   cocktail napkin. Each can be picked up and nudged around (Framer Motion
   drag with spring snap), a small discovery for guests who wander. Purely
   decorative: hidden below lg, aria-hidden, static under reduced motion. */

interface KeepsakeProps {
  className: string;
  rotate: number;
  constraintsRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

function Keepsake({ className, rotate, constraintsRef, children }: KeepsakeProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={`absolute ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.18}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 22 }}
      initial={{ rotate }}
      whileHover={{ scale: 1.05, rotate: 0 }}
      whileDrag={{ scale: 1.1, zIndex: 40 }}
      className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Pressed hibiscus — kept flat between the pages */
function PressedHibiscus() {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 opacity-80" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        {[0, 72, 144, 216, 288].map(a => (
          <path
            key={a}
            d="M40 40 C30 28, 30 14, 40 10 C50 14, 50 28, 40 40"
            transform={`rotate(${a} 40 40)`}
          />
        ))}
        {[36, 108, 180, 252, 324].map(a => (
          <path key={a} d="M40 40 C36 30, 37 22, 40 18" strokeWidth="0.7" transform={`rotate(${a} 40 40)`} />
        ))}
        <circle cx="40" cy="40" r="3" />
        <path d="M40 40 L46 52" strokeWidth="0.9" />
        <circle cx="47.5" cy="54" r="1.6" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

interface KeepsakesProps {
  constraintsRef: React.RefObject<HTMLDivElement>;
  venueImage?: VenueImage;
}

export default function Keepsakes({ constraintsRef, venueImage }: KeepsakesProps) {
  return (
    <div aria-hidden className="hidden lg:block absolute inset-0 pointer-events-none">
      {/* Polaroid of the grounds — morning-of, tucked by the first stop */}
      {venueImage && (
        <Keepsake className="top-[2%] left-[1%]" rotate={-5} constraintsRef={constraintsRef}>
          <div className="w-36 bg-ivory border border-cream-dark p-2 pb-6 shadow-plate">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={venueImage.url}
              alt=""
              loading="lazy"
              draggable={false}
              className="w-full h-24 object-cover select-none [filter:sepia(0.3)_saturate(0.9)]"
            />
            <p className="!text-[9px] uppercase tracking-[0.18em] text-charcoal/60 text-center mt-2 select-none">
              the grounds, 2:15 pm
            </p>
          </div>
        </Keepsake>
      )}

      {/* Shuttle ticket stub — the same ticket treatment as the Venue folio */}
      <Keepsake className="top-[22%] right-[1%]" rotate={4} constraintsRef={constraintsRef}>
        <div
          className="grain relative w-40 bg-cream/90 border border-cream-dark rounded-sm py-2.5 pl-6 pr-3 shadow-soft
            before:absolute before:-left-1.5 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:rounded-full before:bg-ivory before:border before:border-cream-dark"
        >
          <div className="absolute left-2.5 top-1.5 bottom-1.5 border-l-2 border-dotted border-charcoal/20" />
          <p className="!text-[9px] uppercase tracking-[0.2em] font-bold text-gold-dark select-none">
            <span className="mr-1.5">№ 047</span>Shuttle
          </p>
          <p className="!text-[10px] text-charcoal/70 select-none">Kahala Mall · 2:30 PM</p>
        </div>
      </Keepsake>

      {/* Pressed hibiscus — golden-hour rose against the amber sky */}
      <Keepsake className="top-[50%] right-[3%] text-rose" rotate={-9} constraintsRef={constraintsRef}>
        <PressedHibiscus />
      </Keepsake>

      {/* Cocktail napkin, sealed */}
      <Keepsake className="top-[68%] left-[2%]" rotate={7} constraintsRef={constraintsRef}>
        <div className="grain w-28 h-28 bg-ivory/95 border border-cream-dark rounded-md shadow-plate flex flex-col items-center justify-center gap-1.5">
          <WaxSeal className="w-11 h-11" />
          <p className="font-script text-lg text-charcoal/70 leading-none select-none">mahalo</p>
        </div>
      </Keepsake>
    </div>
  );
}
