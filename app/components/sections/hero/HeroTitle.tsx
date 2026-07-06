import React from 'react';

export default function HeroTitle() {
  return (
    <div className="max-w-[500px] animate-fade-up">
      {/* Script intro */}
      <p className="font-script text-3xl md:text-4xl text-terracotta-light -rotate-2 mb-2 md:mb-3 [text-shadow:0_2px_12px_rgba(19,26,48,0.6)]">
        We&rsquo;re getting married!
      </p>

      {/* Names — gold-foil fill that catches the light on hover */}
      <h1 className="relative font-display text-cream uppercase leading-[0.95] tracking-tight -rotate-2 [text-shadow:0_6px_24px_rgba(19,26,48,0.55)]">
        <span className="block text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[6rem]">
          <span className="text-foil">Kelsey</span>
        </span>
        <span className="relative block text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[6rem] mt-1">
          <span
            aria-hidden="true"
            className="absolute -top-8 left-1/2 -translate-x-1/2 font-script normal-case text-4xl md:text-5xl text-terracotta-light leading-none rotate-[-6deg] z-10 [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]"
          >
            and
          </span>
          <span className="sr-only">and </span>
          <span className="text-foil">Jeremy</span>
        </span>
      </h1>

      {/* Venue subtitle */}
      <p className="mt-4 md:mt-5 uppercase tracking-[0.28em] text-cream font-semibold text-sm md:text-base [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]">
        Kaimea Estates <span className="text-terracotta-light mx-1">&bull;</span> O&#699;ahu, Hawai&#699;i
      </p>

      {/* Date */}
      <p className="mt-1.5 md:mt-2 font-script text-4xl md:text-5xl text-terracotta-light [text-shadow:0_2px_12px_rgba(19,26,48,0.6)]">
        October 16th, 2026
      </p>

      {/* Gold hairline divider with palm centerpiece */}
      <div className="flex items-center gap-3 mt-2 md:mt-2.5" aria-hidden="true">
        <span className="h-px w-10 bg-gold/60" />
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-light" fill="currentColor">
          <path d="M12 22c.3-4.4.3-8 0-11 .8-.4 2.4-.3 4 1-0.2-1.8-1.6-3-3.4-3.4 1.6-.9 3.6-.8 5.4.4-.6-2-2.8-3.2-5.2-2.7 1-1.4 2.8-2.2 5-2-1.8-1.5-4.6-1.3-6.4.4C11 3 9.4 2.2 7.2 2.5c1.6.6 2.8 1.7 3.3 3-2.2-.9-4.5-.5-5.8 1 2-.4 3.8 0 5 .9-1.8.2-3.4 1.4-3.9 3.2 1.7-1.2 3.3-1.5 4.4-1.1-.4 3.1-.4 7 .1 11.5h1.7z" />
        </svg>
        <span className="h-px w-10 bg-gold/60" />
      </div>

      {/* Tagline */}
      <p className="mt-2 md:mt-2.5 uppercase tracking-[0.22em] text-cream font-semibold text-xs md:text-sm [text-shadow:0_2px_10px_rgba(19,26,48,0.7)]">
        Elegant <span className="text-terracotta-light mx-1">&bull;</span> Relaxed{' '}
        <span className="text-terracotta-light mx-1">&bull;</span> Unforgettable
      </p>
    </div>
  );
}
