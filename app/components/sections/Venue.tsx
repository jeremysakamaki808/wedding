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
      {/* Ivory stationery card floating over the animated venue scene */}
      <div className="relative mx-auto max-w-7xl rounded-3xl bg-ivory border border-cream-dark overflow-hidden shadow-card">
        <PalmFrond className="absolute -top-10 -right-10 w-56 h-56 md:w-72 md:h-72 text-sage opacity-[0.12] rotate-[18deg] pointer-events-none" />
        <PalmFrond className="absolute -bottom-14 -left-12 w-64 h-64 md:w-80 md:h-80 text-sage opacity-[0.12] -rotate-[24deg] -scale-x-100 pointer-events-none" />

        <div className="relative px-6 py-14 sm:px-10 md:px-14 lg:px-16 md:py-16">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="uppercase tracking-[0.3em] text-sage text-xs md:text-sm font-semibold mb-3">
              Where we say "I do"
            </p>
            <h2 className="font-serif uppercase text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.05] mb-5">
              The Venue
            </h2>
            <p className="text-charcoal/85 text-base md:text-lg leading-relaxed">
              {venue.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              {venue.images.map((image) => (
                <figure
                  key={image.id}
                  className="w-full h-64 md:h-80 rounded-2xl overflow-hidden flex items-center justify-center border border-cream-dark bg-garden-mist"
                >
                  {image.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.url}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center px-6">
                      <p className="text-sage uppercase tracking-[0.18em] text-sm font-semibold">{image.alt}</p>
                      <p className="text-brown/50 text-xs mt-2 uppercase tracking-[0.14em]">Placeholder Image</p>
                    </div>
                  )}
                </figure>
              ))}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-serif uppercase text-3xl md:text-4xl text-burgundy mb-3">
                  {venue.name}
                </h3>
                <p className="text-charcoal text-lg mb-2">{venue.address}</p>
                <p className="text-charcoal/70">{venue.parking}</p>
              </div>

              <div className="space-y-6">
                <h4 className="font-serif uppercase tracking-[0.12em] text-xl text-burgundy">
                  Day of Schedule
                </h4>

                {[
                  { entry: venue.arrival, note: 'Pre-ceremony mingling, drinks, and photos' },
                  { entry: venue.ceremony, note: 'The moment we say "I do"' },
                  { entry: venue.reception, note: 'Dinner, toasts, dancing, and celebration' },
                ].map(({ entry, note }) => {
                  // Data strings look like "2:30 PM – Shuttle pickup from ..." (en dash)
                  const [time, ...rest] = entry.split('–');
                  const label = rest.join('–').trim();
                  return (
                    <div key={entry} className="flex gap-4">
                      <div className="flex-shrink-0 w-20 md:w-24">
                        <p className="text-burgundy font-bold whitespace-nowrap">{time.trim()}</p>
                      </div>
                      <div className="flex-grow border-l-2 border-sage/40 pl-4 pb-2">
                        {label && <p className="text-charcoal font-semibold">{label}</p>}
                        <p className="text-charcoal/70">{note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <h4 className="font-serif uppercase tracking-[0.12em] text-lg text-burgundy mb-4">
                  Location Map
                </h4>
                <iframe
                  src={venue.mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
