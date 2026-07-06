import React from 'react';
import WaxSeal from '@/components/ui/WaxSeal';

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
  className?: string;
}

/**
 * "Estate plate": the site-wide frame treatment that turns any image (or
 * iframe) into a mounted specimen plate from the estate's folio — ivory mat,
 * hairline gold frame, paper grain, warm film grade, small-caps caption.
 * Hovering lifts the plate and levels its resting tilt (CSS only, so this
 * stays a server component).
 */
export default function EstatePlate({
  children,
  caption,
  seal = false,
  tilt = '',
  noGrade = false,
  className = '',
}: EstatePlateProps) {
  return (
    <figure
      className={`grain relative bg-ivory p-2.5 pb-2 rounded-sm shadow-soft border border-cream-dark
        transition-all duration-500 ease-out
        hover:-translate-y-1.5 hover:shadow-plate hover:rotate-0
        ${tilt} ${className}`}
    >
      {/* Hairline gold frame around the imagery */}
      <div className="relative overflow-hidden rounded-[2px] ring-1 ring-gold/50">
        <div className={noGrade ? '' : '[&>img]:sepia-[.08] [&>img]:saturate-[1.05] [&>img]:transition-[filter] [&>img]:duration-500 hover:[&>img]:sepia-0'}>
          {children}
        </div>
      </div>

      {seal && (
        <WaxSeal className="absolute -top-3.5 -right-3.5 w-11 h-11 drop-shadow-md rotate-6" />
      )}

      {caption && (
        <figcaption className="pt-2 pb-0.5 text-center text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-charcoal/70 font-semibold">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
