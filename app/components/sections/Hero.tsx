import React from 'react';
import HeroTitle from '@/components/sections/hero/HeroTitle';
import HeroCards from '@/components/sections/hero/HeroCards';
import HeroCTA from '@/components/sections/hero/HeroCTA';
import OahuBadge from '@/components/sections/hero/OahuBadge';
import VenueBackdrop from '@/components/sections/VenueBackdrop';

export default function Hero() {
  return (
    <section id="home" className="sticky top-0 h-screen overflow-hidden">
      {/* Background artwork layer — scaled by HeroScrollStage on scroll.
          A transformable layer (not bg-fixed) so the zoom works everywhere, incl. iOS. */}
      <div
        data-hero-bg
        className="absolute inset-0 bg-hero-art bg-cover bg-center bg-no-repeat will-change-transform"
      />

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
