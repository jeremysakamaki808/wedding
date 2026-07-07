'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { WeddingData } from '@/types';
import Lantern from '@/components/ui/Lantern';
import Vignette from '@/components/timeline/Vignettes';
import Keepsakes from '@/components/timeline/Keepsakes';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
  data: WeddingData;
}

/* ---- Daylight to Lanternlight --------------------------------------------
   The section background is the wedding day itself: scrolling the schedule
   scrolls the sky, from October-afternoon ivory through golden hour and an
   ember dusk into starlit navy by the last shuttle. Each row is staged by
   its hour — rows after sunset (~6:07 PM on Oʻahu that evening) become
   lantern-lit, their parchment cards glowing like paper held to a flame. */
type Phase = 'day' | 'golden' | 'night';
const SUNSET_MIN = 18 * 60 + 7; // 6:07 PM HST — Oct 16, 2026 sunset
const GOLDEN_MIN = 16 * 60; // golden hour begins ~4:00 PM

function timePhase(time: string): Phase {
  const m = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 'day';
  let mins = (parseInt(m[1], 10) % 12) * 60 + parseInt(m[2], 10);
  if (/pm/i.test(m[3])) mins += 12 * 60;
  if (mins >= SUNSET_MIN) return 'night';
  if (mins >= GOLDEN_MIN) return 'golden';
  return 'day';
}

/* Card dressing per hour: daylight rows stay plain parchment, golden-hour
   rows warm at the edges, night rows carry a candle glow that deepens on
   hover (the lanterns have taken over from the sun). */
const CARD_PHASE: Record<Phase, string> = {
  day: 'border-cream-dark hover:border-gold/60',
  golden: 'border-gold/30 hover:border-gold/60 shadow-[0_10px_28px_rgba(212,149,107,0.13)]',
  night:
    'border-gold/40 hover:border-gold/75 shadow-[0_0_34px_rgba(201,166,107,0.24)] hover:shadow-[0_0_46px_rgba(201,166,107,0.34)]',
};

/* Stars over the evening rows — box-shadow constellations like the hero's
   (x in vw so the sky breathes with the viewport; y in px within the fixed-
   height layer anchored to the section's night end). Second layer is warmer
   gold and twinkles out of phase. */
const STARS_TL = [
  [4, 40], [11, 150], [17, 60], [24, 210], [31, 95], [38, 25], [45, 170],
  [52, 60], [59, 230], [66, 120], [72, 30], [79, 190], [86, 80], [93, 150],
  [97, 40], [8, 300], [48, 320], [88, 290],
]
  .map(([x, y]) => `${x}vw ${y}px 0 0.6px rgba(248,245,239,0.75)`)
  .join(', ');

const STARS_TL_B = [
  [7, 90], [21, 260], [35, 140], [42, 55], [56, 300], [63, 180], [76, 100],
  [83, 250], [90, 200], [15, 20], [69, 20], [96, 330],
]
  .map(([x, y]) => `${x}vw ${y}px 0 0.85px rgba(231,207,159,0.8)`)
  .join(', ');

/* Pre-dawn stars over the section's dark cap — the night the venue scene
   left off in continues across the seam, dissolving as first light comes */
const STARS_DAWN = [
  [6, 24], [14, 90], [22, 40], [30, 130], [37, 18], [44, 74], [52, 120],
  [60, 36], [67, 96], [75, 22], [83, 110], [90, 58], [96, 140], [26, 200],
  [58, 180], [88, 205],
]
  .map(([x, y]) => `${x}vw ${y}px 0 0.6px rgba(248,245,239,0.7)`)
  .join(', ');

const STARS_DAWN_B = [
  [10, 150], [34, 60], [48, 20], [70, 160], [80, 44], [93, 92], [18, 170],
]
  .map(([x, y]) => `${x}vw ${y}px 0 0.85px rgba(231,207,159,0.75)`)
  .join(', ');

/* Firefly motes over the dusk rows: [left %, drift duration s, delay s] */
const TL_MOTES: Array<[number, number, number]> = [
  [16, 17, 0],
  [50, 20, 6],
  [82, 15, 3],
];

/** Engraved sun medallion that rides the ink down the spine until sunset */
function SunMedallion({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.3" />
      <path d="M12 2.6 V5.1 M12 18.9 V21.4 M2.6 12 H5.1 M18.9 12 H21.4 M5.3 5.3 L7.1 7.1 M16.9 16.9 L18.7 18.7 M18.7 5.3 L16.9 7.1 M7.1 16.9 L5.3 18.7" />
    </svg>
  );
}

/** Engraved crescent (same linework as the shuttle-departure glyph) */
function MoonMedallion({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18.5 14.8 A8 8 0 1 1 9.2 5.5 A6.5 6.5 0 0 0 18.5 14.8 Z" />
      <path d="M17.5 5.5 L17.9 6.8 L19.2 7.2 L17.9 7.6 L17.5 8.9 L17.1 7.6 L15.8 7.2 L17.1 6.8 Z" strokeWidth={0.9} />
    </svg>
  );
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
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // First light breaking at the dawn horizon as the section scrolls in —
  // the glow swells up out of the dark band that ties us to the venue scene
  const { scrollYProgress: dawnProgress } = useScroll({
    target: sectionRef,
    offset: ['start 95%', 'start 25%'],
  });
  const glowOpacity = useTransform(dawnProgress, [0, 1], [0, 0.9]);
  const glowY = useTransform(dawnProgress, [0, 1], [56, 0]);

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

    // ---- Lantern path + the traveling sun --------------------------------
    // One scrubbed trigger: ink draws down the spine (aging from charcoal to
    // lantern-gold via the masked layers below), lanterns catch flame as the
    // ink reaches them, and the sun medallion rides the ink tip — arcing off
    // the road and slipping behind the horizon hairline, where the moon
    // fades up to finish the journey. Reduced motion renders the completed
    // night: path drawn, lanterns lit, moon out.
    const root = containerRef.current;
    let inkTrigger: ScrollTrigger | undefined;
    if (root) {
      const stops = Array.from(root.querySelectorAll('[data-tl-stop]'));
      const inks = Array.from(root.querySelectorAll<HTMLElement>('[data-tl-ink]'));
      const sun = root.querySelector<HTMLElement>('[data-tl-sun]');
      const moon = root.querySelector<HTMLElement>('[data-tl-moon]');
      const sunClip = root.querySelector<HTMLElement>('[data-tl-sun-clip]');
      const horizon = root.querySelector<HTMLElement>('[data-tl-horizon]');

      // The horizon sits midway between the last golden row and the first
      // night row — measured, so it tracks real card heights across
      // breakpoints. The sun's clip ends there: crossing it, it "sets".
      let H = 1;
      let horizonY = 1;
      const measure = () => {
        H = Math.max(1, root.offsetHeight);
        const rows = Array.from(root.querySelectorAll<HTMLElement>('.timeline-item'));
        const firstNight = rows.findIndex(r => r.dataset.phase === 'night');
        if (firstNight > 0) {
          const rootTop = root.getBoundingClientRect().top;
          const above = rows[firstNight - 1].getBoundingClientRect().bottom;
          const below = rows[firstNight].getBoundingClientRect().top;
          horizonY = (above + below) / 2 - rootTop;
        } else {
          horizonY = 0.66 * H;
        }
        if (horizon) horizon.style.top = `${horizonY}px`;
        if (sunClip) sunClip.style.height = `${horizonY}px`;
      };

      const apply = (p: number) => {
        inks.forEach(ink => gsap.set(ink, { scaleY: p }));
        stops.forEach((stop, i) =>
          stop.classList.toggle('lantern-lit', p >= (stops.length > 1 ? i / (stops.length - 1) : 0) * 0.92)
        );
        const y = p * H;
        if (sun) {
          gsap.set(sun, { y, x: Math.sin(Math.min(y / horizonY, 1) * Math.PI) * 76 });
        }
        if (moon) {
          const pm = gsap.utils.clamp(0, 1, (y - horizonY) / Math.max(1, H - horizonY));
          gsap.set(moon, {
            y,
            x: -Math.sin(pm * Math.PI) * 44,
            opacity: gsap.utils.clamp(0, 1, (y - horizonY) / 70),
          });
        }
      };

      measure();
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
          onRefresh: self => {
            measure();
            apply(self.progress);
          },
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
    <section ref={sectionRef} id="timeline" className="relative pb-20 overflow-x-clip">
      {/* The sky, part one — the day begins before dawn. The cap's top edge
          is the exact navy of the venue stage above (#172243), so there is
          no seam at all: the ocean night simply carries on, then first
          light breaks — plum, rose, sunrise gold — into the afternoon. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[34vh] md:h-[52vh] [background:linear-gradient(to_bottom,#172243_0%,#1F2B4D_16%,#2A1B3D_34%,#5C3A5C_50%,#8B4A6B_63%,#C98B72_77%,#EFDFC6_90%,#F8F5EF_100%)]"
      />
      {/* Photographic pre-dawn sky (Jeremy's Luma render) laid over the CSS
          dawn cap, which stays underneath as the fallback if the image can't
          load. Anchored to the top so the render's deep-navy crown is flush
          with the venue night above (no seam); masked at both ends so it melts
          into that navy and dissolves into the morning ivory below. The stars
          and first-light glow layer on top of it. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[34vh] md:h-[52vh] bg-cover bg-no-repeat bg-[position:center_top] [mask-image:linear-gradient(to_bottom,transparent_0%,black_7%,black_68%,transparent_97%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_7%,black_68%,transparent_97%)]"
        style={{ backgroundImage: "url('/textures/dawn-sky.jpg')" }}
      />
      {/* The sky, part two: October-afternoon ivory through golden hour and
          ember dusk into starlit navy — scrolling the schedule scrolls the day */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 top-[34vh] md:top-[52vh] [background:linear-gradient(to_bottom,#F8F5EF_0%,#F5EDDD_24%,#EDDBB2_42%,#DFAF83_56%,#B06A5E_67%,#5C3A5C_76%,#28304F_86%,#172243_100%)]"
      />

      {/* Last stars of the night before, dissolving as dawn comes */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[26vh] md:h-[34vh] hidden sm:block motion-reduce:!hidden pointer-events-none [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
      >
        <span
          className="absolute top-0 left-0 w-px h-px rounded-full [animation:twinkle_5.8s_ease-in-out_infinite]"
          style={{ boxShadow: STARS_DAWN }}
        />
        <span
          className="absolute top-0 left-0 w-px h-px rounded-full [animation:twinkle_7.8s_ease-in-out_1.4s_infinite]"
          style={{ boxShadow: STARS_DAWN_B }}
        />
      </div>

      {/* First light: a warm glow swelling up from the dawn horizon,
          scroll-driven so morning arrives as you do */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 mx-auto top-[calc(34vh-110px)] md:top-[calc(52vh-130px)] w-[130vw] sm:w-[80vw] h-44 rounded-[100%] pointer-events-none blur-2xl [background:radial-gradient(ellipse_at_center,rgba(212,149,107,0.5)_0%,rgba(212,149,107,0.16)_45%,transparent_70%)]"
        style={reducedMotion ? { opacity: 0.9 } : { opacity: glowOpacity, y: glowY }}
      />

      {/* Stars settle over the evening rows (masked in from nothing so the
          dusk band stays clean). Hidden for reduced motion, like the hero's. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-4 h-[400px] hidden sm:block motion-reduce:!hidden pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
      >
        <span
          className="absolute top-0 left-0 w-px h-px rounded-full [animation:twinkle_5.2s_ease-in-out_infinite]"
          style={{ boxShadow: STARS_TL }}
        />
        <span
          className="absolute top-0 left-0 w-px h-px rounded-full [animation:twinkle_7.4s_ease-in-out_2s_infinite]"
          style={{ boxShadow: STARS_TL_B }}
        />
      </div>

      {/* Fireflies drifting up through the dusk rows (desktop only) */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[30%] hidden md:block motion-reduce:!hidden pointer-events-none">
        {TL_MOTES.map(([left, dur, delay]) => (
          <span
            key={left}
            className="absolute bottom-[6%] w-1 h-1 rounded-full bg-gold-light/70 blur-[1px]"
            style={{ left: `${left}%`, animation: `mote-drift ${dur}s linear ${delay}s infinite` }}
          />
        ))}
      </div>

      {/* Content sits below the dawn: the header greets you in the morning
          ivory, right where the first light settles */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[30vh] md:pt-[46vh]">
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
          {/* The spine: dashed road + drawn ink, each in two masked layers so
              the linework ages from charcoal in daylight to lantern-gold in
              the night sky (a single charcoal line would vanish on navy) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full">
            <div className="absolute inset-0 [background:repeating-linear-gradient(to_bottom,rgba(58,47,42,0.28)_0_4px,transparent_4px_9px)] [mask-image:linear-gradient(to_bottom,black_55%,transparent_78%)]" />
            <div className="absolute inset-0 [background:repeating-linear-gradient(to_bottom,rgba(231,207,159,0.45)_0_4px,transparent_4px_9px)] [mask-image:linear-gradient(to_bottom,transparent_55%,black_78%)]" />
            <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent_78%)]">
              <div data-tl-ink className="absolute inset-0 origin-top scale-y-0 bg-charcoal/60" />
            </div>
            <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_55%,black_78%)]">
              <div data-tl-ink className="absolute inset-0 origin-top scale-y-0 bg-gold-light/70" />
            </div>
          </div>

          {/* The heavens: sun rides the ink tip, arcs off the road, and slips
              behind the horizon hairline; the moon fades up below it.
              Positions are driven from the ink trigger's apply(). */}
          <div aria-hidden className="hidden md:block absolute inset-0 pointer-events-none">
            <div
              data-tl-horizon
              className="absolute inset-x-6 top-[66%] h-px [background:linear-gradient(to_right,transparent,rgba(201,166,107,0.45)_18%,rgba(201,166,107,0.45)_82%,transparent)]"
            />
            <div data-tl-sun-clip className="absolute inset-x-0 top-0 overflow-hidden">
              <span
                data-tl-sun
                className="absolute left-[calc(50%-1rem)] -top-4 w-8 h-8 text-gold-dark [filter:drop-shadow(0_0_10px_rgba(201,166,107,0.55))]"
              >
                <SunMedallion className="w-8 h-8" />
              </span>
            </div>
            <span
              data-tl-moon
              className="absolute left-[calc(50%-0.875rem)] -top-3.5 w-7 h-7 text-gold-light opacity-0 [filter:drop-shadow(0_0_9px_rgba(231,207,159,0.5))]"
            >
              <MoonMedallion className="w-7 h-7" />
            </span>
          </div>

          {/* Timeline Items Grid */}
          <div className="space-y-12">
            {timeline.map((item, index) => {
              const phase = timePhase(item.time);
              return (
                <div
                  key={index}
                  data-phase={phase}
                  className={`timeline-item flex flex-col md:flex-row gap-8 opacity-0 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <div
                      className={`grain bg-cream p-6 rounded-lg border transition-[border-color,box-shadow] duration-300 ${CARD_PHASE[phase]}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-11 h-11 rounded-full border border-gold/50 bg-ivory text-charcoal/75 flex-shrink-0">
                          <EventGlyph icon={item.icon} />
                        </span>
                        <p className="text-burgundy font-bold text-lg">{item.time}</p>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">{item.event}</h3>
                      <p className="text-charcoal/75">{item.description}</p>
                      {/* The field note rides inside the card on mobile,
                          where the vignette half doesn't render */}
                      {item.note && (
                        <p className="md:hidden !text-sm italic font-body text-charcoal/60 mt-3">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Route lantern + the stop's engraved vignette */}
                  <div className="hidden md:flex md:w-1/2 flex-col items-center gap-5 pt-6">
                    <span
                      data-tl-stop
                      className={`flex items-center justify-center w-9 h-9 rounded-full border border-gold/50 bg-ivory text-charcoal/70 transition-[border-color,box-shadow] duration-700 flex-shrink-0 ${
                        phase === 'night' ? 'lantern-night' : ''
                      }`}
                    >
                      <Lantern className="w-5 h-7" />
                    </span>
                    <Vignette index={index} phase={phase} note={item.note} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Keepsakes from the day, scattered through the quiet corners —
              pick one up and move it if you like */}
          <Keepsakes constraintsRef={containerRef} venueImage={data.venue.images[0]} />
        </div>
      </div>
    </section>
  );
}
