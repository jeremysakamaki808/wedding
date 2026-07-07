import React from 'react';

export default function HeroTitle() {
  return (
    <div className="max-w-[500px] animate-fade-up">
      {/* Invitation eyebrow — gold hairlines flanking letterpress small caps */}
      <p className="kicker-lines label-text text-gold-light mb-3 md:mb-4 [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]">
        We&rsquo;re getting married!
      </p>

      {/* Names — upright engraved serif in cream, the same letterpress
          language as the section headers ("The Venue", "Day Timeline").
          Gold stays an accent (the ampersand + hairlines), never a foil
          surface. The layered shadow reads as pressed-in type while keeping
          the names legible over the video. */}
      <h1
        className="font-display text-cream uppercase leading-[1.05]"
        style={{
          textShadow:
            '0 1px 0 rgba(0,0,0,0.45), 0 -1px 0 rgba(231,207,159,0.18), 0 6px 24px rgba(19,26,48,0.6)',
        }}
      >
        <span className="block text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[6rem]">
          Kelsey
        </span>
        <span
          aria-hidden="true"
          className="block font-serif normal-case text-gold-light text-3xl md:text-4xl leading-none my-1 md:my-1.5"
        >
          &amp;
        </span>
        <span className="sr-only">and </span>
        <span className="block text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[6rem]">
          Jeremy
        </span>
      </h1>

      {/* Single gold hairline separating the names from the invitation lines */}
      <div className="mt-5 md:mt-6 h-px w-16 bg-gold/60" aria-hidden="true" />

      {/* Place */}
      <p className="mt-4 md:mt-5 uppercase tracking-[0.28em] text-cream font-semibold text-sm md:text-base [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]">
        Kaimea Estates <span className="text-gold-light mx-1">&bull;</span> O&#699;ahu, Hawai&#699;i
      </p>

      {/* Date — engraved small caps, the manuscript language */}
      <p className="mt-2 md:mt-2.5 font-serif uppercase tracking-[0.3em] text-cream text-lg md:text-xl [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]">
        October 16, 2026
      </p>
    </div>
  );
}
