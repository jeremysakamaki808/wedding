'use client';

import React from 'react';
import type { WeddingData } from '@/types';

interface HeroProps {
  data: WeddingData;
}

export default function Hero({ data }: HeroProps) {
  const { couple, tagline } = data.event;
  const eventDate = new Date(couple.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="relative w-full h-screen bg-gradient-hero overflow-hidden flex items-center justify-center">
      {/* Hero Background - Placeholder */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-neon animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Main Title */}
        <h1 className="gradient-text text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {couple.names.join(' & ')}
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          {tagline}
        </p>

        {/* Date and Time */}
        <div className="space-y-2 mb-12">
          <p className="text-lg text-neon-cyan font-semibold">{formattedDate}</p>
          <p className="text-lg text-neon-orange font-semibold">
            {couple.time} {couple.timezone}
          </p>
        </div>

        {/* CTA Button */}
        <a
          href="#rsvp"
          className="inline-block px-8 py-4 bg-neon-pink text-white text-lg font-bold rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
        >
          ↓ RSVP Now ↓
        </a>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-neon-cyan"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
