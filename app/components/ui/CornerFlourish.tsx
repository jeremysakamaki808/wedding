'use client';

import React, { useEffect, useRef } from 'react';

interface CornerFlourishProps {
  className?: string;
  /** Mirror horizontally for the opposite corner */
  flip?: boolean;
}

/**
 * Fine-line botanical fern flourish that draws itself in (stroke-dashoffset
 * transition, see .flourish-path in globals.css) the first time it scrolls
 * into view. Under prefers-reduced-motion it renders fully drawn.
 * Strokes inherit currentColor.
 */
export default function CornerFlourish({ className = '', flip = false }: CornerFlourishProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          el.classList.add('flourish-drawn');
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={`${flip ? '-scale-x-100 ' : ''}${className}`}
    >
      {/* Main stem sweeping out of the corner */}
      <path
        className="flourish-path"
        d="M6 6 C 30 10 52 20 68 38 C 82 54 90 76 92 102"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Fronds along the stem */}
      <path className="flourish-path" d="M28 10 C 26 20 20 26 12 28" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path className="flourish-path" d="M48 20 C 44 30 36 35 27 36" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path className="flourish-path" d="M66 36 C 60 44 52 48 43 48" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path className="flourish-path" d="M80 56 C 72 62 64 64 56 62" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path className="flourish-path" d="M88 80 C 80 84 72 84 65 80" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      {/* Curled tip */}
      <path
        className="flourish-path"
        d="M92 102 C 94 110 100 112 104 108 C 107 104 104 99 100 100"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
