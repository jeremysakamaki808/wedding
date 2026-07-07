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

      {/* Venue subtitle */}
      <p className="mt-4 md:mt-5 uppercase tracking-[0.28em] text-cream font-semibold text-sm md:text-base [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]">
        Kaimea Estates <span className="text-gold-light mx-1">&bull;</span> O&#699;ahu, Hawai&#699;i
      </p>

      {/* The date, set like an invitation line — engraved small caps between
          gold hairlines (the manuscript language, not holiday script) */}
      <p
        className="mt-2.5 md:mt-3 flex items-center gap-3 font-serif uppercase tracking-[0.3em] text-cream text-lg md:text-xl [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]"
        aria-label="October 16, 2026"
      >
        <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
        October 16, 2026
        <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
      </p>

      {/* Gold hairline divider with palm centerpiece */}
      <div className="flex items-center gap-3 mt-2.5 md:mt-3" aria-hidden="true">
        <span className="h-px w-10 bg-gold/60" />
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-light" fill="currentColor">
          <path d="M12 22c.3-4.4.3-8 0-11 .8-.4 2.4-.3 4 1-0.2-1.8-1.6-3-3.4-3.4 1.6-.9 3.6-.8 5.4.4-.6-2-2.8-3.2-5.2-2.7 1-1.4 2.8-2.2 5-2-1.8-1.5-4.6-1.3-6.4.4C11 3 9.4 2.2 7.2 2.5c1.6.6 2.8 1.7 3.3 3-2.2-.9-4.5-.5-5.8 1 2-.4 3.8 0 5 .9-1.8.2-3.4 1.4-3.9 3.2 1.7-1.2 3.3-1.5 4.4-1.1-.4 3.1-.4 7 .1 11.5h1.7z" />
        </svg>
        <span className="h-px w-10 bg-gold/60" />
      </div>

      {/* Tagline */}
      <p className="mt-2 md:mt-2.5 uppercase tracking-[0.22em] text-cream font-semibold text-xs md:text-sm [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]">
        Elegant <span className="text-gold-light mx-1">&bull;</span> Relaxed{' '}
        <span className="text-gold-light mx-1">&bull;</span> Unforgettable
      </p>
    </div>
  );
}
