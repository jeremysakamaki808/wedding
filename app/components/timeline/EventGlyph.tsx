import React from 'react';

/**
 * Engraved line icons keyed by the emoji in wedding.json — the data stays
 * untouched; these are the manuscript's inked pictograms. Unknown icons
 * fall back to the emoji itself.
 */
export default function EventGlyph({ icon }: { icon: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const glyphs: Record<string, React.ReactNode> = {
    // Shuttle pickup — coach
    '🚗': (
      <g {...common}>
        <rect x="3" y="7" width="18" height="10" rx="2.5" />
        <path d="M3 12.5 H21 M8.5 7 V12.5 M15.5 7 V12.5" strokeWidth="1.1" />
        <circle cx="8" cy="18.5" r="1.6" />
        <circle cx="16" cy="18.5" r="1.6" />
      </g>
    ),
    // Guest arrival — garden archway
    '👋': (
      <g {...common}>
        <path d="M5 21 V10 C5 5.5 8 3 12 3 C16 3 19 5.5 19 10 V21" />
        <path d="M8 21 V11 C8 7.5 9.8 6 12 6 C14.2 6 16 7.5 16 11 V21" strokeWidth="1.1" />
        <path d="M3.5 21 H20.5" />
      </g>
    ),
    // Ceremony — interlocked rings
    '💍': (
      <g {...common}>
        <circle cx="9.5" cy="13.5" r="5.5" />
        <circle cx="14.5" cy="13.5" r="5.5" />
        <path d="M12 4.5 L10.5 6.5 H13.5 Z" strokeWidth="1.1" />
      </g>
    ),
    // Cocktail hour — clinking coupes
    '🥂': (
      <g {...common}>
        <path d="M4 4 L9 6 C9.4 9 8.4 11 6.8 11.8 L9 20 M6.8 11.8 C5.2 12 3.4 10.6 3.2 7.6 Z" strokeWidth="1.2" />
        <path d="M20 4 L15 6 C14.6 9 15.6 11 17.2 11.8 L15 20 M17.2 11.8 C18.8 12 20.6 10.6 20.8 7.6 Z" strokeWidth="1.2" />
        <path d="M7 20 H11 M13 20 H17" strokeWidth="1.1" />
        <path d="M12 2.5 V4 M10.7 3.2 L11.4 4.2 M13.3 3.2 L12.6 4.2" strokeWidth="1" />
      </g>
    ),
    // Reception — tiered cake
    '🎉': (
      <g {...common}>
        <path d="M4.5 20.5 H19.5" />
        <path d="M6 20.5 V16 C6 15.2 6.6 14.5 7.4 14.5 H16.6 C17.4 14.5 18 15.2 18 16 V20.5" strokeWidth="1.2" />
        <path d="M8 14.5 V11 C8 10.2 8.6 9.5 9.4 9.5 H14.6 C15.4 9.5 16 10.2 16 11 V14.5" strokeWidth="1.2" />
        <path d="M12 9.5 V7" strokeWidth="1.2" />
        <path d="M12 4.8 C11.2 5.8 12.8 5.8 12 7 Z" strokeWidth="1" />
      </g>
    ),
    // Evening celebration — sparkles
    '✨': (
      <g {...common}>
        <path d="M12 4 L13.6 9.4 L19 11 L13.6 12.6 L12 18 L10.4 12.6 L5 11 L10.4 9.4 Z" strokeWidth="1.2" />
        <path d="M18.5 4.5 L19 6.2 L20.7 6.7 L19 7.2 L18.5 8.9 L18 7.2 L16.3 6.7 L18 6.2 Z" strokeWidth="0.9" />
        <path d="M6 16.5 L6.4 17.8 L7.7 18.2 L6.4 18.6 L6 19.9 L5.6 18.6 L4.3 18.2 L5.6 17.8 Z" strokeWidth="0.9" />
      </g>
    ),
    // Shuttle departure — crescent moon
    '🌙': (
      <g {...common}>
        <path d="M18.5 14.8 A8 8 0 1 1 9.2 5.5 A6.5 6.5 0 0 0 18.5 14.8 Z" strokeWidth="1.3" />
        <path d="M17.5 5.5 L17.9 6.8 L19.2 7.2 L17.9 7.6 L17.5 8.9 L17.1 7.6 L15.8 7.2 L17.1 6.8 Z" strokeWidth="0.9" />
      </g>
    ),
  };
  const glyph = glyphs[icon];
  if (!glyph) return <span className="text-2xl">{icon}</span>;
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
      {glyph}
    </svg>
  );
}
