import React from 'react';

interface WaxSealProps {
  className?: string;
  /** 'badge' = decorative stamp on plates/cards; 'button' = interactive press */
  variant?: 'badge' | 'button';
}

/**
 * Burgundy wax seal bearing the K&J monogram (letterforms match KJLogo.tsx).
 * The edge is a hand-poured irregular blob, not a perfect circle; the rim is
 * embossed by a light-from-above gradient pair. Inherits size from className.
 *
 * 'button' variant adds hover glow/rotate and an active "stamp press" — wrap
 * it in the actual <button>/<a>; this component stays presentational.
 */
export default function WaxSeal({ className = '', variant = 'badge' }: WaxSealProps) {
  const interactive =
    variant === 'button'
      ? 'transition-transform duration-300 group-hover:rotate-1 group-hover:drop-shadow-[0_0_14px_rgba(201,166,107,0.45)] group-active:scale-[0.94]'
      : '';

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${interactive} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="waxBody" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#7a2338" />
          <stop offset="55%" stopColor="#560216" />
          <stop offset="100%" stopColor="#3d010f" />
        </radialGradient>
      </defs>

      {/* Hand-poured wax blob — deliberately irregular */}
      <path
        d="M50 3
           C 62 2 72 8 79 15
           C 88 23 97 32 96 46
           C 95 57 92 66 85 74
           C 77 84 66 97 51 96
           C 38 95 28 90 20 82
           C 11 73 3 63 4 49
           C 5 37 9 26 18 17
           C 27 8 38 4 50 3 Z"
        fill="url(#waxBody)"
      />
      {/* Embossed rim: light catches the top-left, shadow pools bottom-right */}
      <path
        d="M50 10 C 60 9 69 14 75 20 C 83 27 90 35 89 46 C 88 56 85 63 79 70 C 72 79 62 90 51 89 C 40 88 31 84 24 77 C 16 69 10 60 11 49 C 12 38 15 29 23 21 C 30 14 40 11 50 10 Z"
        fill="none"
        stroke="rgba(231,207,159,0.35)"
        strokeWidth="1.4"
      />
      <path
        d="M50 14 C 59 13 67 18 72 23 C 79 30 85 37 84 46 C 83 55 81 61 75 67 C 69 75 60 85 51 84 C 42 83 34 80 28 74 C 21 67 15 59 16 49 C 17 40 20 31 27 24 C 33 18 42 15 50 14 Z"
        fill="none"
        stroke="rgba(0,0,0,0.28)"
        strokeWidth="1"
      />
      {/* Pressed highlight — the sheen of cooled wax */}
      <ellipse cx="38" cy="28" rx="18" ry="9" fill="rgba(255,255,255,0.10)" transform="rotate(-24 38 28)" />

      {/* Monogram — same letterforms as KJLogo */}
      <text
        x="40"
        y="52"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontWeight="400"
        textAnchor="middle"
        fill="rgba(239,231,216,0.92)"
      >
        K
      </text>
      <text
        x="50"
        y="64"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="19"
        fontStyle="italic"
        textAnchor="middle"
        fill="rgba(239,231,216,0.75)"
      >
        &amp;
      </text>
      <text
        x="62"
        y="78"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontStyle="italic"
        textAnchor="middle"
        fill="rgba(239,231,216,0.92)"
      >
        J
      </text>
    </svg>
  );
}
