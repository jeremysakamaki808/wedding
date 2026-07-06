import React from 'react';

/**
 * "See you in OAHU" badge with an Oʻahu island silhouette.
 * The silhouette is a hand-drawn approximation of Oʻahu (Kaʻena Point west,
 * North Shore up top, Makapuʻu east, Honolulu along the south shore) —
 * swap the <path> for a traced SVG of the island if a cleaner asset is made.
 */
export default function OahuBadge() {
  return (
    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 animate-fade-up [animation-delay:1s]">
      <div className="text-right leading-none">
        <p className="font-script text-2xl md:text-4xl text-gold-light -rotate-3 [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]">
          See you in
        </p>
        <p className="font-display uppercase text-3xl md:text-5xl text-cream tracking-[0.06em] mt-1 [text-shadow:0_2px_14px_rgba(19,26,48,0.7)]">
          Oahu
        </p>
      </div>
    </div>
  );
}
