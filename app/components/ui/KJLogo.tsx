import React from 'react';

interface KJLogoProps {
  className?: string;
}

/**
 * K&J monogram with botanical laurel accents, rendered inline so it inherits
 * the current text color (transparent background by design).
 *
 * TODO: Replace with the official exported logo asset (transparent PNG/SVG)
 * once available — drop it in /public/images and swap this component's body
 * for an <Image>.
 */
export default function KJLogo({ className = '' }: KJLogoProps) {
  return (
    <svg
      viewBox="0 0 200 180"
      className={className}
      fill="none"
      aria-label="K and J monogram"
      role="img"
    >
      {/* Left laurel branch */}
      <path
        d="M 38 150 Q 18 118 26 82 Q 32 56 52 38"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 30 128 Q 18 124 12 130 Q 20 138 30 134 Z" fill="currentColor" />
      <path d="M 25 106 Q 13 100 6 106 Q 14 115 25 112 Z" fill="currentColor" />
      <path d="M 25 84 Q 15 76 8 80 Q 14 90 25 90 Z" fill="currentColor" />
      <path d="M 31 63 Q 23 53 15 55 Q 20 66 31 69 Z" fill="currentColor" />
      <path d="M 44 46 Q 39 34 31 34 Q 34 46 44 52 Z" fill="currentColor" />

      {/* Right botanical sprig */}
      <path
        d="M 148 24 Q 172 34 184 58 Q 192 74 190 94"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 160 28 Q 158 16 165 10 Q 170 20 166 30 Z" fill="currentColor" />
      <path d="M 176 44 Q 178 32 186 28 Q 188 40 182 48 Z" fill="currentColor" />
      <path d="M 186 66 Q 191 55 199 54 Q 198 66 191 72 Z" fill="currentColor" />

      {/* Monogram letters */}
      <text
        x="76"
        y="88"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="78"
        fontWeight="400"
        textAnchor="middle"
        fill="currentColor"
      >
        K
      </text>
      <text
        x="100"
        y="122"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="44"
        fontStyle="italic"
        textAnchor="middle"
        fill="currentColor"
      >
        &amp;
      </text>
      <text
        x="128"
        y="150"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="78"
        fontWeight="400"
        fontStyle="italic"
        textAnchor="middle"
        fill="currentColor"
      >
        J
      </text>
    </svg>
  );
}
