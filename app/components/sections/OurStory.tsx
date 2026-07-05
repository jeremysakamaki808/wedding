import React from 'react';

/**
 * "Our Story" — scrolls up over the pinned, darkened hero artwork.
 * Copy is generic placeholder text; swap in the real story + photos later.
 */
export default function OurStory() {
  return (
    <section id="our-story" className="relative z-10 min-h-screen flex items-center px-5 sm:px-8 lg:px-12 py-24">
      <div data-story-content className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="font-script text-4xl md:text-5xl text-rose-light -rotate-2 mb-3 [text-shadow:0_2px_12px_rgba(19,26,48,0.6)]">
            How we got here
          </p>
          <h2 className="font-display uppercase text-6xl md:text-7xl lg:text-8xl text-cream leading-[0.9] [text-shadow:0_6px_24px_rgba(19,26,48,0.55)]">
            Our Story
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Story copy — generic placeholder */}
          <div className="space-y-5 text-cream/90 text-base md:text-lg leading-relaxed">
            <p>
              Every love story is beautiful, but ours is our favorite. From the moment we
              met, we knew there was something special between us — a spark that grew into
              laughter, adventures, and a life we can&rsquo;t wait to keep building together.
            </p>
            <p>
              Through every season, every road trip, and every quiet Sunday morning, we&rsquo;ve
              become each other&rsquo;s favorite person. And now, surrounded by the people we
              love most, we&rsquo;re ready for our biggest adventure yet.
            </p>
            <p className="font-script text-3xl md:text-4xl text-rose pt-2">
              And so, we&rsquo;re headed to the island&hellip;
            </p>
          </div>

          {/* Photo placeholders */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 h-56 md:h-64 rounded-2xl border border-rose/30 bg-navy-dark/40 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-cream text-lg font-bold">The two of us</p>
                <p className="text-cream/60 text-sm mt-1">(Placeholder Photo)</p>
              </div>
            </div>
            <div className="h-40 md:h-48 rounded-2xl border border-rose/30 bg-navy-dark/40 backdrop-blur-sm flex items-center justify-center rotate-[-1.5deg]">
              <div className="text-center px-4">
                <p className="text-cream font-bold">First trip</p>
                <p className="text-cream/60 text-xs mt-1">(Placeholder)</p>
              </div>
            </div>
            <div className="h-40 md:h-48 rounded-2xl border border-rose/30 bg-navy-dark/40 backdrop-blur-sm flex items-center justify-center rotate-[1.5deg]">
              <div className="text-center px-4">
                <p className="text-cream font-bold">The proposal</p>
                <p className="text-cream/60 text-xs mt-1">(Placeholder)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
