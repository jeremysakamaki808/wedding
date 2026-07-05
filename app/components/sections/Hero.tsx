import React from 'react';
import HeroTitle from '@/components/sections/hero/HeroTitle';
import HeroCards from '@/components/sections/hero/HeroCards';
import HeroCTA from '@/components/sections/hero/HeroCTA';
import OahuBadge from '@/components/sections/hero/OahuBadge';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-hero-art bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      {/* Subtle dark overlays: stronger behind the left text column, light elsewhere */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/50 via-navy-dark/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/35 via-transparent to-navy-dark/25" />

      {/* Left-aligned hero content */}
      <div className="relative z-10 min-h-screen px-5 sm:px-8 md:pl-[6vw] pt-24 md:pt-[8vh] pb-24 md:pb-14">
        <HeroTitle />
        <HeroCards />
        <HeroCTA />
      </div>

      <OahuBadge />
    </section>
  );
}
