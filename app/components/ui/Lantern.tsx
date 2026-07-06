import React from 'react';

interface LanternProps {
  className?: string;
  /** Force the flame alight (route lanterns are lit via a parent .lantern-lit class instead) */
  lit?: boolean;
}

/**
 * Fine-line hanging lantern. The flame + glow layers carry the classes
 * `lantern-flame` / `lantern-glow`, which rest at opacity 0 until either
 * this component gets `lit`, or an ancestor gains the `lantern-lit` class
 * (how the venue route lights lanterns as the ink path reaches them).
 * Strokes inherit currentColor; the flame is always candle-gold.
 */
export default function Lantern({ className = '', lit = false }: LanternProps) {
  return (
    <span className={`${lit ? 'lantern-lit ' : ''}relative inline-block ${className}`} aria-hidden="true">
      {/* Warm glow bloom behind the lantern body */}
      <span
        className="lantern-glow absolute inset-[-40%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(201,166,107,0.45) 0%, rgba(201,166,107,0.12) 45%, transparent 70%)',
        }}
      />
      <svg viewBox="0 0 24 34" fill="none" className="relative w-full h-full">
        {/* Hanging ring + cap */}
        <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 8 L12 5 L16 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        {/* Glass body */}
        <path
          d="M7.5 8.5 H16.5 L18 14 C18.4 18 18.4 20 18 23 L16.5 27.5 H7.5 L6 23 C5.6 20 5.6 18 6 14 Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Panes */}
        <path d="M9.6 8.5 L9 27.5 M14.4 8.5 L15 27.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        {/* Base */}
        <path d="M8 30.5 H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M10 27.5 L10 30.5 M14 27.5 L14 30.5" stroke="currentColor" strokeWidth="1" />
        {/* Flame */}
        <path
          className="lantern-flame"
          d="M12 21.5 C 10.6 20 10.4 18.4 12 16.2 C 13.6 18.4 13.4 20 12 21.5 Z"
          fill="#E7CF9F"
          stroke="#C9A66B"
          strokeWidth="0.5"
        />
      </svg>
    </span>
  );
}
