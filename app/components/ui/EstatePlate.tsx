'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WaxSeal from '@/components/ui/WaxSeal';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

interface EstatePlateProps {
  children: React.ReactNode;
  /** Small-caps caption engraved on the mat beneath the image */
  caption?: string;
  /** Burgundy wax-seal badge on the upper-right corner */
  seal?: boolean;
  /** Resting rotation as a COMPLETE literal class (Tailwind JIT needs the
      full string in source), e.g. 'md:-rotate-1'; hover levels it */
  tilt?: string;
  /** Skip the sepia film grade (e.g. for iframes that manage their own) */
  noGrade?: boolean;
  /** How the print is fixed to the page: kraft corner pockets or a strip
      of aged linen tape across the top edge */
  mount?: 'corners' | 'tape';
  className?: string;
}

/* Kraft photo-corner pocket — one per corner of the print. clip-path cuts
   the triangle; drop-shadow (which respects clip-path) grounds it. */
const CORNER_CLIPS: Record<string, string> = {
  tl: 'polygon(0 0, 100% 0, 0 100%)',
  tr: 'polygon(0 0, 100% 0, 100% 100%)',
  bl: 'polygon(0 0, 0 100%, 100% 100%)',
  br: 'polygon(100% 0, 100% 100%, 0 100%)',
};
const CORNER_POS: Record<string, string> = {
  tl: '-top-px -left-px',
  tr: '-top-px -right-px',
  bl: '-bottom-px -left-px',
  br: '-bottom-px -right-px',
};

function PhotoCorners() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {(['tl', 'tr', 'bl', 'br'] as const).map(c => (
        <span
          key={c}
          className={`paper-kraft absolute w-6 h-6 ${CORNER_POS[c]} [filter:drop-shadow(0_1px_1.5px_rgba(43,27,16,0.35))]`}
          style={{ clipPath: CORNER_CLIPS[c] }}
        />
      ))}
    </div>
  );
}

/* Aged linen tape across the top edge — translucent weave, torn ends */
function TapeStrip() {
  return (
    <span
      aria-hidden
      className="absolute -top-2.5 left-1/2 -translate-x-1/2 rotate-[-2deg] w-28 h-5 bg-cream/70 shadow-[0_1px_3px_rgba(43,27,16,0.22)] pointer-events-none
        [background-image:repeating-linear-gradient(90deg,rgba(58,47,42,0.06)_0_1px,transparent_1px_3px),repeating-linear-gradient(0deg,rgba(58,47,42,0.05)_0_1px,transparent_1px_3px)]"
      style={{
        clipPath:
          'polygon(0 12%, 3% 0, 97% 4%, 100% 18%, 99% 88%, 96% 100%, 4% 96%, 1% 82%)',
      }}
    />
  );
}

/**
 * "Estate plate": the site-wide frame treatment, now an album mounting — the
 * print sits on a white-bordered card fixed to the textured paper mat with
 * kraft photo corners (or a strip of linen tape), and hovering peels it
 * slightly up off the page (Framer Motion). The resting tilt stays CSS on an
 * outer wrapper so the peel transform and the tilt never fight.
 */
export default function EstatePlate({
  children,
  caption,
  seal = false,
  tilt = '',
  noGrade = false,
  mount = 'corners',
  className = '',
}: EstatePlateProps) {
  const reduced = usePrefersReducedMotion();

  const mat = (
    <>
      {/* The print: white border, subtle contact shadow, hairline gold ring */}
      <div className="relative bg-white p-1.5 shadow-[0_1px_5px_rgba(43,27,16,0.22)] ring-1 ring-gold/30">
        <div className="relative overflow-hidden">
          <div
            className={
              noGrade
                ? ''
                : '[&>img]:sepia-[.08] [&>img]:saturate-[1.05] [&>img]:transition-[filter] [&>img]:duration-500 hover:[&>img]:sepia-0'
            }
          >
            {children}
          </div>
        </div>
        {mount === 'corners' ? <PhotoCorners /> : <TapeStrip />}
      </div>

      {seal && (
        <WaxSeal className="absolute -top-3.5 -right-3.5 w-11 h-11 drop-shadow-md rotate-6" />
      )}

      {caption && (
        <figcaption className="pt-2.5 pb-0.5 text-center text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-charcoal/70 font-semibold">
          {caption}
        </figcaption>
      )}
    </>
  );

  const matClass = 'paper grain relative p-3 pb-1.5 rounded-sm shadow-soft border border-cream-dark';

  if (reduced) {
    return (
      <figure className={`relative ${tilt} ${className}`}>
        <div className={matClass}>{mat}</div>
      </figure>
    );
  }

  return (
    <figure
      className={`relative transition-transform duration-500 ease-out hover:rotate-0 ${tilt} ${className}`}
    >
      <motion.div
        className={matClass}
        style={{ transformPerspective: 800 }}
        whileHover={{
          rotateX: noGrade ? -2 : -4,
          y: -6,
          boxShadow: '0 18px 40px rgba(43, 27, 16, 0.26)',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      >
        {mat}
      </motion.div>
    </figure>
  );
}
