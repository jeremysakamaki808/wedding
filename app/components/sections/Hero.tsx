import React from 'react';
import HeroTitle from '@/components/sections/hero/HeroTitle';
import HeroCards from '@/components/sections/hero/HeroCards';
import HeroCTA from '@/components/sections/hero/HeroCTA';
import OahuBadge from '@/components/sections/hero/OahuBadge';
import VenueBackdrop from '@/components/sections/VenueBackdrop';
import Lantern from '@/components/ui/Lantern';
import CornerFlourish from '@/components/ui/CornerFlourish';
import { heroVideo } from '@/app/config/heroVideo';

/* Night-sky starfields as box-shadow constellations (vw/vh units keep them
   responsive). Two layers twinkle out of phase; the whole sky settles in
   over ~4s after first paint. */
const STARS_A = [
  [5, 4], [12, 9], [19, 3], [26, 11], [33, 6], [41, 13], [48, 4], [55, 9],
  [62, 15], [69, 5], [75, 12], [81, 7], [88, 14], [93, 5], [36, 18], [58, 20],
  [15, 16], [84, 19],
]
  .map(([x, y]) => `${x}vw ${y}vh 0 0.5px rgba(248,245,239,0.7)`)
  .join(', ');

const STARS_B = [
  [8, 13], [22, 7], [30, 16], [45, 8], [52, 14], [60, 3], [67, 10], [73, 17],
  [79, 4], [90, 9], [38, 2], [96, 15],
]
  .map(([x, y]) => `${x}vw ${y}vh 0 0.8px rgba(248,245,239,0.9)`)
  .join(', ');

/* Firefly motes: [left %, drift duration s, delay s] */
const MOTES: Array<[number, number, number]> = [
  [12, 16, 0], [28, 19, 5], [44, 15, 9], [61, 21, 2], [76, 17, 7], [89, 20, 12],
];

export default function Hero() {
  return (
    <section id="home" className="sticky top-0 h-screen overflow-hidden">
      {/* Background layer — scaled by HeroScrollStage on scroll. The artwork
          is a seamless ~9s cinemagraph (locked camera, ambient motion) that
          autoplays muted on a loop; it runs on its own clock while the GSAP
          zoom/pan transform lands on this wrapper — scroll drives only the
          push-in, never the playback. The first frame stays as the wrapper's
          CSS background: it paints instantly, matches the clip, and is the
          fallback if the video can't load or autoplay is blocked.
          Portrait phones crop to 62% 38% — the couple's faces, the same point
          the scroll zoom anchors to, so the push-in stays locked on them.
          Landscape/desktop keeps the full centered composition; the
          object/background-position transition reframes rotation smoothly. */}
      <div
        data-hero-bg
        className="absolute inset-0 bg-hero-art bg-cover bg-no-repeat will-change-transform bg-[position:62%_38%] landscape:bg-center transition-[background-position] duration-500 ease-out"
      >
        <video
          data-hero-video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroVideo.poster}
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover object-[62%_38%] landscape:object-center transition-[object-position] duration-500 ease-out select-none pointer-events-none motion-reduce:hidden"
        >
          {heroVideo.sources.map(s => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      </div>

      {/* Subtle dark overlays: stronger behind the left text column, light elsewhere */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/50 via-navy-dark/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/35 via-transparent to-navy-dark/25" />

      {/* Night settling in: two starfield layers fade up after first paint and
          twinkle out of phase across the top third of the sky. Under the veil
          and venue layers so the dissolve carries them away with the artwork. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[32%] pointer-events-none hidden sm:block motion-reduce:!hidden [animation:stars-settle_4s_ease-out_1.2s_both]"
      >
        <span
          className="absolute top-0 left-0 w-px h-px rounded-full [animation:twinkle_5.2s_ease-in-out_infinite]"
          style={{ boxShadow: STARS_A }}
        />
        <span
          className="absolute top-0 left-0 w-px h-px rounded-full [animation:twinkle_7.4s_ease-in-out_2s_infinite]"
          style={{ boxShadow: STARS_B }}
        />
      </div>

      {/* Candle-grade: a barely-there warm radial that breathes on a slow
          cycle — the whole frame flickers like it's lantern-lit. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none [background:radial-gradient(90%_70%_at_50%_62%,rgba(212,149,107,0.10),transparent_72%)] [animation:ember-breathe_7s_ease-in-out_infinite]"
      />

      {/* Firefly motes drifting up through the lower frame (desktop only) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none hidden md:block motion-reduce:!hidden">
        {MOTES.map(([left, dur, delay]) => (
          <span
            key={left}
            className="absolute bottom-[8%] w-1 h-1 rounded-full bg-gold-light/70 blur-[1px]"
            style={{ left: `${left}%`, animation: `mote-drift ${dur}s linear ${delay}s infinite` }}
          />
        ))}
      </div>

      {/* Animated venue scene — dissolves in through the color overlay below */}
      <VenueBackdrop />

      {/* GTA-style color overlay — deepens to near-solid, then thins out to reveal the venue scene */}
      <div data-hero-overlay className="absolute inset-0 bg-gta-overlay opacity-0 pointer-events-none" />

      {/* Botanical linework drawing in at the upper corners (fades with the UI) */}
      <div data-hero-content aria-hidden className="pointer-events-none">
        <CornerFlourish className="absolute top-20 left-4 md:top-24 md:left-8 w-16 h-16 md:w-24 md:h-24 text-cream/30 z-10" />
        <CornerFlourish flip className="absolute top-20 right-4 md:top-24 md:right-8 w-16 h-16 md:w-24 md:h-24 text-cream/30 z-10" />
      </div>

      {/* Left-aligned hero content */}
      <div
        data-hero-content
        className="relative z-10 h-full px-5 sm:px-8 md:pl-[6vw] pt-24 md:pt-[8vh] pb-24 md:pb-14"
      >
        <HeroTitle />
        <HeroCards />
        <HeroCTA />
      </div>

      <div data-hero-content>
        <OahuBadge />
      </div>

      {/* Scroll cue: a hanging lantern, alight and swaying */}
      <div
        data-hero-content
        className="absolute bottom-5 inset-x-0 z-10 hidden md:flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <Lantern lit className="w-6 h-9 text-cream/90 origin-top [animation:lantern-sway_3.5s_ease-in-out_infinite]" />
        <span className="uppercase tracking-[0.3em] text-[10px] font-semibold text-cream/80 [text-shadow:0_1px_8px_rgba(23,34,67,0.7)]">
          Begin
        </span>
      </div>
    </section>
  );
}
