import React from 'react';

interface KJLogoProps {
  className?: string;
}

/**
 * The couple's official laurel-wreath "K & J" monogram.
 *
 * The asset (`/images/kj-wreath.png`) is white line-art on transparent, but
 * the site tints the logo per context — cream over the hero, charcoal on the
 * scrolled navbar, gold in the footer. So rather than an <img> (which would
 * lock the color to white and vanish on light surfaces), the artwork drives a
 * CSS mask over a `currentColor` fill: the same `text-*` / `hover:text-*` +
 * `transition-colors` contract every caller already uses keeps working, and
 * the shape recolors (and transitions) for free.
 */
export default function KJLogo({ className = '' }: KJLogoProps) {
  return (
    <span
      role="img"
      aria-label="Kelsey and Jeremy laurel monogram"
      className={`inline-block bg-current ${className}`}
      style={{
        WebkitMaskImage: "url('/images/kj-wreath.png')",
        maskImage: "url('/images/kj-wreath.png')",
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}
