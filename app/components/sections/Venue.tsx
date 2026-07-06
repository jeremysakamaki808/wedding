'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { WeddingData } from '@/types';
import EstatePlate from '@/components/ui/EstatePlate';
import Lantern from '@/components/ui/Lantern';
import CornerFlourish from '@/components/ui/CornerFlourish';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

/** Tiny cartographer's compass rose for the map plate corner */
function CompassRose({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
      <path d="M20 3 L22.5 17.5 L20 20 L17.5 17.5 Z" fill="currentColor" />
      <path d="M20 37 L22.5 22.5 L20 20 L17.5 22.5 Z" fill="currentColor" opacity="0.45" />
      <path d="M3 20 L17.5 17.5 L20 20 L17.5 22.5 Z" fill="currentColor" opacity="0.45" />
      <path d="M37 20 L22.5 17.5 L20 20 L22.5 22.5 Z" fill="currentColor" opacity="0.45" />
      <text x="20" y="1.5" textAnchor="middle" dominantBaseline="hanging" fontSize="6" fontFamily="Georgia, serif" fill="currentColor">
        N
      </text>
    </svg>
  );
}

/** Plate tilts as complete literal classes (Tailwind JIT scans source) */
const PLATE_TILTS = ['md:-rotate-1', 'md:rotate-[0.75deg]', 'md:-rotate-[0.5deg]'];

export default function Venue({ data }: VenueProps) {
  const { venue } = data;
  const routeRef = useRef<HTMLDivElement>(null);

  // ---- The Lantern Route -------------------------------------------------
  // One scrubbed trigger over the schedule: progress draws the solid ink
  // line over the faint dashed road, and each lantern catches flame the
  // moment the ink reaches it. Reduced motion renders the route complete.
  useGSAP(
    () => {
      const root = routeRef.current;
      if (!root) return;
      const stops = Array.from(root.querySelectorAll('[data-route-stop]'));
      const inks = gsap.utils.toArray<HTMLElement>('[data-route-ink]', root);

      const apply = (p: number) => {
        stops.forEach((stop, i) => stop.classList.toggle('lantern-lit', p >= i * 0.45));
        inks.forEach((ink, i) =>
          gsap.set(ink, { scaleY: gsap.utils.clamp(0, 1, p * inks.length - i) })
        );
      };

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        apply(1);
        return;
      }

      apply(0);
      ScrollTrigger.create({
        trigger: root,
        start: 'top 78%',
        end: 'bottom 45%',
        scrub: 0.6,
        onUpdate: self => apply(self.progress),
      });
    },
    { scope: routeRef }
  );

  const scheduleRows = [
    { entry: venue.arrival, note: 'Pre-ceremony mingling, drinks, and photos' },
    { entry: venue.ceremony, note: 'The moment we say "I do"' },
    { entry: venue.reception, note: 'Dinner, toasts, dancing, and celebration' },
  ];

  return (
    <section id="venue" className="relative z-30 px-4 sm:px-6 lg:px-8 pb-24">
      {/* Parchment folio floating over the animated venue scene */}
      <div className="parchment grain relative mx-auto max-w-7xl rounded-3xl border border-cream-dark overflow-hidden shadow-card">
        <PalmFrond className="absolute -top-10 -right-10 w-56 h-56 md:w-72 md:h-72 text-sage opacity-[0.12] rotate-[18deg] pointer-events-none" />
        <PalmFrond className="absolute -bottom-14 -left-12 w-64 h-64 md:w-80 md:h-80 text-sage opacity-[0.12] -rotate-[24deg] -scale-x-100 pointer-events-none" />

        {/* Botanical linework drawing in at the folio corners */}
        <CornerFlourish className="absolute top-5 left-5 w-20 h-20 md:w-28 md:h-28 text-gold-dark/35 pointer-events-none" />
        <CornerFlourish flip className="absolute bottom-5 right-5 w-20 h-20 md:w-28 md:h-28 rotate-180 -scale-y-100 text-gold-dark/35 pointer-events-none" />

        <div className="relative px-6 py-14 sm:px-10 md:px-14 lg:px-16 md:py-16">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="kicker-lines uppercase tracking-[0.3em] text-sage text-xs md:text-sm font-semibold mb-3">
              Where we say &ldquo;I do&rdquo;
            </p>
            <h2 className="text-engraved font-serif uppercase text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.05] mb-5">
              The Venue
            </h2>
            <p className="text-charcoal/85 text-base md:text-lg leading-relaxed">
              {venue.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Estate plates: the venue photographs, mounted and captioned */}
            <div className="space-y-7">
              {venue.images.map((image, i) => (
                <EstatePlate
                  key={image.id}
                  caption={image.alt}
                  seal={i === 0}
                  tilt={PLATE_TILTS[i % PLATE_TILTS.length]}
                >
                  {image.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.url}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-60 md:h-72 object-cover"
                    />
                  ) : (
                    <div className="w-full h-60 md:h-72 bg-garden-mist flex items-center justify-center">
                      <div className="text-center px-6">
                        <p className="text-sage uppercase tracking-[0.18em] text-sm font-semibold">{image.alt}</p>
                        <p className="text-brown/50 text-xs mt-2 uppercase tracking-[0.14em]">Placeholder Image</p>
                      </div>
                    </div>
                  )}
                </EstatePlate>
              ))}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-engraved font-serif uppercase text-3xl md:text-4xl text-burgundy mb-3">
                  {venue.name}
                </h3>
                <p className="text-charcoal text-lg mb-2">{venue.address}</p>

                {/* Complimentary shuttle — the estate ticket */}
                <div className="grain relative mt-4 bg-cream/70 border border-cream-dark rounded-sm py-3 pl-7 pr-4
                  before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full before:bg-ivory before:border before:border-cream-dark">
                  {/* Perforated edge */}
                  <div aria-hidden className="absolute left-3 top-2 bottom-2 border-l-2 border-dotted border-charcoal/20" />
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] font-bold text-gold-dark mb-1">
                    <span className="mr-2">№</span>Complimentary Shuttle
                  </p>
                  <p className="text-charcoal/75 text-sm md:text-base">{venue.parking}</p>
                </div>
              </div>

              {/* The Lantern Route: the day's journey through the estate */}
              <div>
                <h4 className="text-engraved font-serif uppercase tracking-[0.12em] text-xl text-burgundy mb-6">
                  Day of Schedule
                </h4>

                <div ref={routeRef} className="space-y-1">
                  {scheduleRows.map(({ entry, note }, i) => {
                    // Data strings look like "2:30 PM – Shuttle pickup from ..." (en dash)
                    const [time, ...rest] = entry.split('–');
                    const label = rest.join('–').trim();
                    const isLast = i === scheduleRows.length - 1;
                    return (
                      <div key={entry} className="flex gap-4">
                        <div className="flex-shrink-0 w-20 md:w-24 pt-1.5">
                          <p className="text-burgundy font-bold whitespace-nowrap">{time.trim()}</p>
                        </div>

                        {/* Route marker: lantern in a gold ring + ink segment */}
                        <div className="flex-shrink-0 w-9 flex flex-col items-center">
                          <span
                            data-route-stop
                            className="flex items-center justify-center w-9 h-9 rounded-full border border-gold/50 bg-ivory/80 text-charcoal/70"
                          >
                            <Lantern className="w-5 h-7" />
                          </span>
                          {!isLast && (
                            <div className="relative w-px flex-1 mt-1.5 mb-1 min-h-[2rem]">
                              {/* Faint dashed road ahead */}
                              <div className="absolute inset-0 [background:repeating-linear-gradient(to_bottom,rgba(58,47,42,0.3)_0_4px,transparent_4px_9px)]" />
                              {/* Solid ink drawn behind you */}
                              <div data-route-ink className="absolute inset-0 origin-top scale-y-0 bg-charcoal/70" />
                            </div>
                          )}
                        </div>

                        <div className="flex-grow pb-7 pt-1.5">
                          {label && <p className="text-charcoal font-semibold">{label}</p>}
                          <p className="text-charcoal/70">{note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* The cartographer's plate */}
              <div className="mt-8">
                <h4 className="text-engraved font-serif uppercase tracking-[0.12em] text-lg text-burgundy mb-4">
                  Location Map
                </h4>
                <EstatePlate
                  noGrade
                  caption="ʻĀina Haina, Oʻahu — surveyed for the sixteenth of October"
                >
                  {/* Sepia survey wash lifts on hover/focus so the map stays usable */}
                  <div className="group relative">
                    <iframe
                      src={venue.mapEmbed}
                      width="100%"
                      height="300"
                      style={{ border: 0, display: 'block' }}
                      className="transition-[filter] duration-500 [filter:sepia(0.25)_saturate(0.85)] group-hover:filter-none group-focus-within:filter-none"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <CompassRose className="absolute top-2.5 right-2.5 w-9 h-9 text-gold-dark/80 pointer-events-none drop-shadow-sm" />
                  </div>
                </EstatePlate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
