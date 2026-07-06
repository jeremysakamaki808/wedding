'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { WeddingData } from '@/types';
import Lantern from '@/components/ui/Lantern';

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
  data: WeddingData;
}

/**
 * Engraved line icons keyed by the emoji in wedding.json — the data stays
 * untouched; these are the manuscript's inked pictograms. Unknown icons
 * fall back to the emoji itself.
 */
function EventGlyph({ icon }: { icon: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const glyphs: Record<string, React.ReactNode> = {
    // Shuttle pickup — coach
    '🚗': (
      <g {...common}>
        <rect x="3" y="7" width="18" height="10" rx="2.5" />
        <path d="M3 12.5 H21 M8.5 7 V12.5 M15.5 7 V12.5" strokeWidth="1.1" />
        <circle cx="8" cy="18.5" r="1.6" />
        <circle cx="16" cy="18.5" r="1.6" />
      </g>
    ),
    // Guest arrival — garden archway
    '👋': (
      <g {...common}>
        <path d="M5 21 V10 C5 5.5 8 3 12 3 C16 3 19 5.5 19 10 V21" />
        <path d="M8 21 V11 C8 7.5 9.8 6 12 6 C14.2 6 16 7.5 16 11 V21" strokeWidth="1.1" />
        <path d="M3.5 21 H20.5" />
      </g>
    ),
    // Ceremony — interlocked rings
    '💍': (
      <g {...common}>
        <circle cx="9.5" cy="13.5" r="5.5" />
        <circle cx="14.5" cy="13.5" r="5.5" />
        <path d="M12 4.5 L10.5 6.5 H13.5 Z" strokeWidth="1.1" />
      </g>
    ),
    // Cocktail hour — clinking coupes
    '🥂': (
      <g {...common}>
        <path d="M4 4 L9 6 C9.4 9 8.4 11 6.8 11.8 L9 20 M6.8 11.8 C5.2 12 3.4 10.6 3.2 7.6 Z" strokeWidth="1.2" />
        <path d="M20 4 L15 6 C14.6 9 15.6 11 17.2 11.8 L15 20 M17.2 11.8 C18.8 12 20.6 10.6 20.8 7.6 Z" strokeWidth="1.2" />
        <path d="M7 20 H11 M13 20 H17" strokeWidth="1.1" />
        <path d="M12 2.5 V4 M10.7 3.2 L11.4 4.2 M13.3 3.2 L12.6 4.2" strokeWidth="1" />
      </g>
    ),
    // Reception — tiered cake
    '🎉': (
      <g {...common}>
        <path d="M4.5 20.5 H19.5" />
        <path d="M6 20.5 V16 C6 15.2 6.6 14.5 7.4 14.5 H16.6 C17.4 14.5 18 15.2 18 16 V20.5" strokeWidth="1.2" />
        <path d="M8 14.5 V11 C8 10.2 8.6 9.5 9.4 9.5 H14.6 C15.4 9.5 16 10.2 16 11 V14.5" strokeWidth="1.2" />
        <path d="M12 9.5 V7" strokeWidth="1.2" />
        <path d="M12 4.8 C11.2 5.8 12.8 5.8 12 7 Z" strokeWidth="1" />
      </g>
    ),
    // Evening celebration — sparkles
    '✨': (
      <g {...common}>
        <path d="M12 4 L13.6 9.4 L19 11 L13.6 12.6 L12 18 L10.4 12.6 L5 11 L10.4 9.4 Z" strokeWidth="1.2" />
        <path d="M18.5 4.5 L19 6.2 L20.7 6.7 L19 7.2 L18.5 8.9 L18 7.2 L16.3 6.7 L18 6.2 Z" strokeWidth="0.9" />
        <path d="M6 16.5 L6.4 17.8 L7.7 18.2 L6.4 18.6 L6 19.9 L5.6 18.6 L4.3 18.2 L5.6 17.8 Z" strokeWidth="0.9" />
      </g>
    ),
    // Shuttle departure — crescent moon
    '🌙': (
      <g {...common}>
        <path d="M18.5 14.8 A8 8 0 1 1 9.2 5.5 A6.5 6.5 0 0 0 18.5 14.8 Z" strokeWidth="1.3" />
        <path d="M17.5 5.5 L17.9 6.8 L19.2 7.2 L17.9 7.6 L17.5 8.9 L17.1 7.6 L15.8 7.2 L17.1 6.8 Z" strokeWidth="0.9" />
      </g>
    ),
  };
  const glyph = glyphs[icon];
  if (!glyph) return <span className="text-2xl">{icon}</span>;
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
      {glyph}
    </svg>
  );
}

export default function Timeline({ data }: TimelineProps) {
  const { timeline } = data;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.timeline-item') as HTMLElement[];

    if (items.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top center',
      },
    });

    items.forEach((item, index) => {
      timeline.fromTo(
        item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -60 : 60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
        },
        index * 0.15
      );
    });

    // ---- Lantern path: ink draws down the spine, lanterns catch flame ----
    // Same pattern as the venue route: one scrubbed trigger; passed spine
    // renders solid ink over the faint dashed road; each lantern lights as
    // the ink reaches its row. Reduced motion renders the path complete.
    const root = containerRef.current;
    let inkTrigger: ScrollTrigger | undefined;
    if (root) {
      const stops = Array.from(root.querySelectorAll('[data-tl-stop]'));
      const ink = root.querySelector<HTMLElement>('[data-tl-ink]');
      const apply = (p: number) => {
        if (ink) gsap.set(ink, { scaleY: p });
        stops.forEach((stop, i) =>
          stop.classList.toggle('lantern-lit', p >= (stops.length > 1 ? i / (stops.length - 1) : 0) * 0.92)
        );
      };
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        apply(1);
      } else {
        apply(0);
        inkTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top 70%',
          end: 'bottom 62%',
          scrub: 0.6,
          onUpdate: self => apply(self.progress),
        });
      }
    }

    return () => {
      inkTrigger?.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      timeline.kill();
    };
  }, []);

  return (
    // overflow-x-clip: items enter from x:±60, which would otherwise widen
    // the page and allow sideways panning on mobile while they wait offscreen
    <section id="timeline" className="py-20 bg-ivory overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="kicker-lines label-text text-sage mb-3">October 16, 2026</p>
          <h2 className="text-engraved text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Day Timeline
          </h2>
          <p className="text-charcoal/70 text-lg">How the celebration unfolds</p>
          <div className="relative mx-auto mt-5 h-px w-16 bg-gold/60">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-gold/70" />
          </div>
        </div>

        {/* Timeline Items */}
        <div ref={containerRef} className="timeline-container relative">
          {/* The spine: faint dashed road with ink drawing down it on scroll */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full">
            <div className="absolute inset-0 [background:repeating-linear-gradient(to_bottom,rgba(58,47,42,0.28)_0_4px,transparent_4px_9px)]" />
            <div data-tl-ink className="absolute inset-0 origin-top scale-y-0 bg-charcoal/60" />
          </div>

          {/* Timeline Items Grid */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`timeline-item flex flex-col md:flex-row gap-8 opacity-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="md:w-1/2 flex flex-col justify-center">
                  <div className="grain bg-cream p-6 rounded-lg border border-cream-dark hover:border-gold/60 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-11 h-11 rounded-full border border-gold/50 bg-ivory text-charcoal/75 flex-shrink-0">
                        <EventGlyph icon={item.icon} />
                      </span>
                      <p className="text-burgundy font-bold text-lg">{item.time}</p>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">{item.event}</h3>
                    <p className="text-charcoal/75">{item.description}</p>
                  </div>
                </div>

                {/* Route lantern on the spine */}
                <div className="hidden md:flex md:w-1/2 justify-center items-start pt-6">
                  <span
                    data-tl-stop
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-gold/50 bg-ivory text-charcoal/70"
                  >
                    <Lantern className="w-5 h-7" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
