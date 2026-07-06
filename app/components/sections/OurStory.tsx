import React from 'react';

/**
 * "Our Story" — scrolls up over the pinned, darkened hero artwork.
 * Copy is generic placeholder text; swap in the real story + photos later.
 */
export default function OurStory() {
  return (
    <section id="our-story" className="relative z-10 min-h-screen flex items-center px-5 sm:px-8 lg:px-12 py-24">
      <div data-story-content className="max-w-6xl mx-auto w-full">
        {/* Header — sits over the darkened hero artwork, so text stays light */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="font-script text-4xl md:text-5xl text-terracotta-light -rotate-2 mb-3 [text-shadow:0_2px_12px_rgba(19,26,48,0.6)]">
            How we got here
          </p>
          <h2 className="font-serif uppercase text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.05] [text-shadow:0_6px_24px_rgba(19,26,48,0.55)]">
            Our Story
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Story copy — generic placeholder */}
          <div className="space-y-5 text-cream/90 text-base md:text-lg leading-relaxed">
            {/* Illuminated drop cap opens the manuscript's first page */}
            <p className="first-letter:float-left first-letter:font-serif first-letter:font-bold first-letter:text-6xl md:first-letter:text-7xl first-letter:leading-[0.75] first-letter:mr-3 first-letter:mt-1.5 first-letter:text-foil">
              Every love story is beautiful, but ours is our favorite. From the moment we
              met, we knew there was something special between us — a spark that grew into
              laughter, adventures, and a life we can&rsquo;t wait to keep building together.
            </p>
            <p>
              Through every season, every road trip, and every quiet Sunday morning, we&rsquo;ve
              become each other&rsquo;s favorite person. And now, surrounded by the people we
              love most, we&rsquo;re ready for our biggest adventure yet.
            </p>
            <p className="font-script text-3xl md:text-4xl text-terracotta-light pt-2 [text-shadow:0_2px_12px_rgba(19,26,48,0.6)]">
              And so, we&rsquo;re headed to the island&hellip;
            </p>
            {/* Gold thread leading the eye down toward the dissolve */}
            <span aria-hidden className="hidden lg:block ml-10 h-16 w-px bg-gradient-to-b from-gold/60 to-transparent" />
          </div>

          {/* Photo placeholders — album page with corner mounts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 h-56 md:h-64 rounded-2xl border border-sage/40 bg-ivory/85 backdrop-blur-sm flex items-center justify-center">
              <span aria-hidden className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-light/60 rounded-tl-sm" />
              <span aria-hidden className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-light/60 rounded-tr-sm" />
              <span aria-hidden className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-light/60 rounded-bl-sm" />
              <span aria-hidden className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-light/60 rounded-br-sm" />
              <div className="text-center px-6">
                <p className="text-charcoal text-lg font-bold">The two of us</p>
                <p className="text-brown/60 text-sm mt-1">(Placeholder Photo)</p>
              </div>
            </div>
            <div className="relative h-40 md:h-48 rounded-2xl border border-sage/40 bg-ivory/85 backdrop-blur-sm flex items-center justify-center rotate-[-1.5deg]">
              <span aria-hidden className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-gold-light/60 rounded-tl-sm" />
              <span aria-hidden className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-gold-light/60 rounded-br-sm" />
              <div className="text-center px-4">
                <p className="text-charcoal font-bold">First trip</p>
                <p className="text-brown/60 text-xs mt-1">(Placeholder)</p>
              </div>
            </div>
            <div className="relative h-40 md:h-48 rounded-2xl border border-sage/40 bg-ivory/85 backdrop-blur-sm flex items-center justify-center rotate-[1.5deg]">
              <span aria-hidden className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-gold-light/60 rounded-tr-sm" />
              <span aria-hidden className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-gold-light/60 rounded-bl-sm" />
              <div className="text-center px-4">
                <p className="text-charcoal font-bold">The proposal</p>
                <p className="text-brown/60 text-xs mt-1">(Placeholder)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
