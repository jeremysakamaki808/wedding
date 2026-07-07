'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import type { WeddingData } from '@/types';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';
import EstatePlate from '@/components/ui/EstatePlate';
import Lantern from '@/components/ui/Lantern';
import CornerFlourish from '@/components/ui/CornerFlourish';
import PalmFrond from '@/components/ui/PalmFrond';
import PreDawnSky from '@/components/ui/PreDawnSky';
import MapboxMap from '@/components/ui/MapboxMap';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface VenueProps {
  data: WeddingData;
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

/** Old Google embed, kept as the fallback when Mapbox is unavailable.
    The sepia survey wash (lifting on hover/focus) applies only here — the
    custom Mapbox style is the couple's own design and renders untinted. */
function MapEmbedFallback({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      width="100%"
      height="300"
      style={{ border: 0, display: 'block' }}
      className="transition-[filter] duration-500 [filter:sepia(0.25)_saturate(0.85)] group-hover:filter-none group-focus-within:filter-none"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Map to Kaimea Estates"
    />
  );
}

/** Plate tilts as complete literal classes (Tailwind JIT scans source) */
const PLATE_TILTS = ['md:-rotate-1', 'md:rotate-[0.75deg]', 'md:-rotate-[0.5deg]'];

/**
 * The shuttle rides as a kraft luggage tag: clipped-corner manila stock,
 * brass eyelet with a twine loop, the heading rubber-stamped at a slight
 * angle. Hovering sets it swinging gently from the eyelet.
 */
function LuggageTag({ note }: { note: string }) {
  const reduced = usePrefersReducedMotion();

  const body = (
    <div className="relative mt-5 mr-1">
      {/* twine looping away from the eyelet */}
      <svg
        viewBox="0 0 60 44"
        className="absolute -top-7 -left-6 w-16 h-12 text-charcoal/45"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M52 38 C40 28, 24 12, 11 7 C4.5 4.8, 2.5 9, 6.5 11 C14 14.5, 34 26, 48 36"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M52 40 C38 31, 22 15, 10 9"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>

      <div
        className="paper-kraft grain relative rounded-sm py-3.5 pl-12 pr-5 shadow-soft rotate-[1.5deg]"
        style={{
          clipPath:
            'polygon(16px 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
        }}
      >
        {/* printed hairline border, cut with the corners */}
        <div aria-hidden className="absolute inset-1.5 border border-[#8c6f3f]/35 rounded-[1px] pointer-events-none" />
        {/* brass eyelet + reinforcement ring */}
        <span aria-hidden className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-gold-dark/40" />
        <span aria-hidden className="absolute left-[15px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gold-dark bg-ivory shadow-[inset_0_1px_2px_rgba(43,27,16,0.35)]" />

        {/* rubber-stamped heading */}
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] font-bold text-gold-dark mb-1 rotate-[-1.5deg] opacity-90">
          <span className="mr-2">№ 047</span>Complimentary Shuttle
        </p>
        <p className="text-charcoal/80 text-sm md:text-base">{note}</p>
      </div>
    </div>
  );

  if (reduced) return body;

  return (
    <motion.div
      whileHover={{ rotate: -1.4 }}
      transition={{ type: 'spring', stiffness: 130, damping: 6 }}
      style={{ transformOrigin: '26px 45%' }}
    >
      {body}
    </motion.div>
  );
}

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
      <div className="paper grain relative mx-auto max-w-7xl rounded-3xl border border-cream-dark overflow-hidden shadow-card">
        <PalmFrond className="absolute -top-10 -right-10 w-56 h-56 md:w-72 md:h-72 text-sage opacity-[0.12] rotate-[18deg] pointer-events-none" />
        <PalmFrond className="absolute -bottom-14 -left-12 w-64 h-64 md:w-80 md:h-80 text-sage opacity-[0.12] -rotate-[24deg] -scale-x-100 pointer-events-none" />

        {/* Botanical linework drawing in at the folio corners */}
        <CornerFlourish className="absolute top-5 left-5 w-20 h-20 md:w-28 md:h-28 text-gold-dark/35 pointer-events-none" />
        <CornerFlourish flip className="absolute bottom-5 right-5 w-20 h-20 md:w-28 md:h-28 rotate-180 -scale-y-100 text-gold-dark/35 pointer-events-none" />

        <div className="relative px-6 pt-14 pb-44 sm:px-10 md:px-14 md:pt-16 md:pb-64 lg:px-16">
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
                  mount={i === 1 ? 'tape' : 'corners'}
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

                {/* Complimentary shuttle — the kraft luggage tag */}
                <LuggageTag note={venue.parking} />
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
                  {/* The couple's custom "Midnight Aloha 3D" Mapbox style; the
                      old Google embed stays behind it as the no-token /
                      style-failure fallback. */}
                  <div className="group relative">
                    {venue.mapbox && process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ? (
                      <MapboxMap
                        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                        username={venue.mapbox.username}
                        styleId={venue.mapbox.styleId}
                        coordinates={venue.mapbox.coordinates}
                        zoom={venue.mapbox.zoom}
                        pitch={venue.mapbox.pitch}
                        bearing={venue.mapbox.bearing}
                        fallback={<MapEmbedFallback src={venue.mapEmbed} />}
                      />
                    ) : (
                      <MapEmbedFallback src={venue.mapEmbed} />
                    )}
                    <CompassRose className="absolute top-2.5 right-2.5 w-9 h-9 text-gold-dark/80 pointer-events-none drop-shadow-sm" />
                  </div>
                </EstatePlate>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Night rises over the foot of the page: the folio's empty parchment
          tail darkens into the timeline's pre-dawn navy so the paper dissolves
          into the night with no hard edge. #172243 is the exact tone the
          Timeline's dawn cap opens on, so the two sections read continuous. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-80 md:h-[56vh] z-10 [background:linear-gradient(to_bottom,transparent_0%,rgba(23,34,67,0.1)_16%,rgba(23,34,67,0.32)_33%,rgba(23,34,67,0.55)_48%,rgba(23,34,67,0.74)_62%,rgba(23,34,67,0.88)_75%,rgba(23,34,67,0.96)_86%,#172243_96%)]"
      />
      {/* ...and the night has texture: the venue scene comes to rest on the
          SAME pre-dawn sky the Day Timeline opens on, mirrored so the section
          boundary is a mirror plane of identical crown pixels (same asset,
          same full-bleed width, same box height — bg-cover scales match, so
          flat navy never butts against textured navy). The seam disappears. */}
      <PreDawnSky
        flip
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-[34vh] md:h-[52vh] z-20"
        mask="linear-gradient(to bottom, transparent 0%, transparent 24%, rgba(0,0,0,0.08) 36%, rgba(0,0,0,0.22) 47%, rgba(0,0,0,0.42) 58%, rgba(0,0,0,0.64) 68%, rgba(0,0,0,0.84) 78%, rgba(0,0,0,0.95) 88%, black 96%)"
      />
    </section>
  );
}
