'use client';

import React from 'react';
import type { WeddingData } from '@/types';

interface VenueProps {
  data: WeddingData;
}

function PalmFrond({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 22c.3-4.4.3-8 0-11 .8-.4 2.4-.3 4 1-0.2-1.8-1.6-3-3.4-3.4 1.6-.9 3.6-.8 5.4.4-.6-2-2.8-3.2-5.2-2.7 1-1.4 2.8-2.2 5-2-1.8-1.5-4.6-1.3-6.4.4C11 3 9.4 2.2 7.2 2.5c1.6.6 2.8 1.7 3.3 3-2.2-.9-4.5-.5-5.8 1 2-.4 3.8 0 5 .9-1.8.2-3.4 1.4-3.9 3.2 1.7-1.2 3.3-1.5 4.4-1.1-.4 3.1-.4 7 .1 11.5h1.7z" />
    </svg>
  );
}

export default function Venue({ data }: VenueProps) {
  const { venue } = data;

  return (
    <section id="venue" className="relative z-30 px-4 sm:px-6 lg:px-8 pb-24">
      {/* GTA-style rounded card floating over the pinned hero artwork */}
      <div className="relative max-w-7xl mx-auto rounded-3xl bg-gradient-venue-card overflow-hidden shadow-[0_24px_80px_rgba(19,26,48,0.6)]">
        {/* Palm silhouette accents */}
        <PalmFrond className="absolute -top-10 -right-10 w-56 h-56 md:w-72 md:h-72 text-plum-light opacity-30 rotate-[18deg] pointer-events-none" />
        <PalmFrond className="absolute -bottom-14 -left-12 w-64 h-64 md:w-80 md:h-80 text-plum-light opacity-25 -rotate-[24deg] -scale-x-100 pointer-events-none" />

        <div className="relative px-6 py-14 sm:px-10 md:px-14 lg:px-16 md:py-16">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="uppercase tracking-[0.3em] text-rose-light text-xs md:text-sm font-semibold mb-3">
              Where we say &ldquo;I do&rdquo;
            </p>
            <h2 className="font-display uppercase text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.9] mb-5">
              The Venue
            </h2>
            <p className="text-cream/85 text-base md:text-lg leading-relaxed">{venue.description}</p>
          </div>

          {/* Venue Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images - Placeholder */}
            <div className="space-y-4">
              {venue.images.map(image => (
                <div
                  key={image.id}
                  className="w-full h-64 md:h-80 rounded-2xl overflow-hidden flex items-center justify-center border border-rose/25 bg-navy-dark/40 backdrop-blur-sm"
                >
                  <div className="text-center px-6">
                    <p className="text-cream text-lg font-bold">{image.alt}</p>
                    <p className="text-cream/60 text-sm mt-2">(Placeholder Image)</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Venue Details */}
            <div className="space-y-8">
              {/* Venue Name & Address */}
              <div>
                <h3 className="font-display uppercase text-3xl md:text-4xl text-rose mb-3">{venue.name}</h3>
                <p className="text-cream text-lg mb-2">{venue.address}</p>
                <p className="text-cream/70">{venue.parking}</p>
              </div>

              {/* Timeline Details */}
              <div className="space-y-6">
                <h4 className="font-display uppercase tracking-[0.12em] text-xl text-terracotta-light">
                  Day of Schedule
                </h4>

                {[
                  { entry: venue.arrival, note: 'Pre-ceremony mingling, drinks, and photos' },
                  { entry: venue.ceremony, note: 'The moment we say “I do”' },
                  { entry: venue.reception, note: 'Dinner, toasts, dancing, and celebration' },
                ].map(({ entry, note }) => {
                  // Data strings look like "2:30 PM – Shuttle pickup from ..."
                  const [time, ...rest] = entry.split('–');
                  const label = rest.join('–').trim();
                  return (
                    <div key={entry} className="flex gap-4">
                      <div className="flex-shrink-0 w-20 md:w-24">
                        <p className="text-rose font-bold whitespace-nowrap">{time.trim()}</p>
                      </div>
                      <div className="flex-grow border-l-2 border-rose/50 pl-4 pb-2">
                        {label && <p className="text-cream font-semibold">{label}</p>}
                        <p className="text-cream/70">{note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Embed */}
              <div className="mt-8">
                <h4 className="font-display uppercase tracking-[0.12em] text-lg text-terracotta-light mb-4">
                  Location Map
                </h4>
                <iframe
                  src={venue.mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
