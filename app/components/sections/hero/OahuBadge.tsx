import React from 'react';

/**
 * "See you in OAHU" badge with an Oʻahu island silhouette.
 * The silhouette is a hand-drawn approximation of Oʻahu (Kaʻena Point west,
 * North Shore up top, Makapuʻu east, Honolulu along the south shore) —
 * swap the <path> for a traced SVG of the island if a cleaner asset is made.
 */
export default function OahuBadge() {
  return (
    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex items-end gap-3 animate-fade-up [animation-delay:1s]">
      <div className="text-right leading-none">
        <p className="font-script text-2xl md:text-4xl text-rose -rotate-3 [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]">
          See you in
        </p>
        <p className="font-display uppercase text-4xl md:text-6xl text-rose tracking-[0.06em] mt-1 [text-shadow:0_2px_14px_rgba(19,26,48,0.7)]">
          Oahu
        </p>
      </div>

      {/* Oʻahu island silhouette */}
      <svg
        viewBox="0 0 110 85"
        className="w-16 h-12 md:w-24 md:h-[4.5rem] text-rose drop-shadow-[0_2px_10px_rgba(19,26,48,0.7)]"
        fill="currentColor"
        aria-label="Island of Oʻahu"
        role="img"
      >
        <path d="M 8 52 C 6 44 12 34 20 28 C 28 22 38 14 50 10 C 58 7 66 8 72 13 C 80 19 88 28 94 38 C 99 46 102 52 99 57 C 96 61 90 60 85 63 C 80 67 78 72 71 74 C 63 77 55 73 47 70 C 38 67 28 66 20 62 C 14 59 10 57 8 52 Z" />
        {/* Palm accents inside the island, knocked out in navy */}
        <path
          d="M52 58c.2-3 .2-5.4 0-7.4.5-.3 1.6-.2 2.7.7-.1-1.2-1.1-2-2.3-2.3 1.1-.6 2.4-.5 3.6.3-.4-1.3-1.9-2.1-3.5-1.8.7-1 1.9-1.5 3.4-1.4-1.2-1-3.1-.9-4.3.3-.7-1-1.7-1.5-3.2-1.3 1.1.4 1.9 1.1 2.2 2-1.5-.6-3-.3-3.9.7 1.3-.3 2.6 0 3.4.6-1.2.1-2.3.9-2.6 2.1 1.1-.8 2.2-1 3-.7-.3 2.1-.3 4.7.1 7.7l1.4.5z"
          fill="#131A30"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
