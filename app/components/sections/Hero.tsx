import React from 'react';
import HeroTitle from '@/components/sections/hero/HeroTitle';
import HeroCards from '@/components/sections/hero/HeroCards';
import HeroCTA from '@/components/sections/hero/HeroCTA';
import OahuBadge from '@/components/sections/hero/OahuBadge';
import VenueBackdrop from '@/components/sections/VenueBackdrop';
import { heroVideo } from '@/app/config/heroVideo';

export default function Hero() {
  return (
    <section id="home" className="sticky top-0 h-screen overflow-hidden">
      {/* Background layer — scaled by HeroScrollStage on scroll. The artwork
          is a 6s cinemagraph (locked camera, ambient motion) that HeroScrollStage
          scrubs GTA VI-style: scroll progress maps straight to the video's
          currentTime, locked to the zoom across the whole hero->story->dissolve
          journey. The GSAP zoom/pan transform lands on this wrapper; the
          currentTime scrub lands on the child video. The original artwork stays
          as the wrapper's CSS background: it paints instantly, matches the
          clip's first frame, and is the fallback if the video can't load.
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

      {/* Animated venue scene — dissolves in through the color overlay below */}
      <VenueBackdrop />

      {/* GTA-style color overlay — deepens to near-solid, then thins out to reveal the venue scene */}
      <div data-hero-overlay className="absolute inset-0 bg-gta-overlay opacity-0 pointer-events-none" />

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
    </section>
  );
}
