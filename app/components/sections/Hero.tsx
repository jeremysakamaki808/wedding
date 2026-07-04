'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { WeddingData } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  data: WeddingData;
}

export default function Hero({ data }: HeroProps) {
  const { couple, tagline } = data.event;
  const { venue } = data;
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const eventDate = new Date(couple.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const timeline = gsap.timeline();

    // Logo fade-in + scale
    if (logoRef.current) {
      timeline.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 },
        0
      );
    }

    // Title fade-in + slide up
    if (titleRef.current) {
      timeline.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2
      );
    }

    // Cards stagger entrance
    const cards = document.querySelectorAll('.info-card');
    if (cards.length > 0) {
      cards.forEach((card, index) => {
        timeline.fromTo(
          card,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.4 + index * 0.15
        );
      });
    }

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-dark-navy overflow-hidden flex flex-col items-center justify-center pt-32 pb-20"
      style={{
        backgroundImage: `url('/images/hero-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center">
        {/* K&J Monogram Logo */}
        <div ref={logoRef} className="mb-8 opacity-0">
          <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-neon-pink"
              fill="currentColor"
            >
              <text
                x="50"
                y="65"
                fontSize="48"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="serif"
              >
                K&J
              </text>
            </svg>
          </div>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 md:mb-8 tracking-wider uppercase opacity-0"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            color: '#FF69B4',
            textShadow: '0 4px 20px rgba(255, 105, 180, 0.4)',
            letterSpacing: '0.15em',
          }}
        >
          {couple.names.join(' & ')}
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-200 text-center mb-12 md:mb-16 max-w-2xl">
          {tagline}
        </p>

        {/* Info Cards Container */}
        <div
          ref={cardContainerRef}
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {/* Venue Card */}
          <div className="info-card bg-dark-navy/80 backdrop-blur-md rounded-lg p-6 border border-neon-pink/30 hover:border-neon-pink transition-all duration-300 opacity-0">
            <div className="text-3xl md:text-4xl mb-3">📍</div>
            <h3 className="text-xl md:text-2xl font-bold text-neon-pink mb-2 uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              The Venue
            </h3>
            <p className="text-gray-300 text-sm md:text-base">{venue.name}</p>
            <p className="text-gray-400 text-xs md:text-sm mt-1">{venue.address}</p>
          </div>

          {/* Date & Time Card */}
          <div className="info-card bg-dark-navy/80 backdrop-blur-md rounded-lg p-6 border border-neon-pink/30 hover:border-neon-pink transition-all duration-300 opacity-0">
            <div className="text-3xl md:text-4xl mb-3">📅</div>
            <h3 className="text-xl md:text-2xl font-bold text-neon-pink mb-2 uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              The Date
            </h3>
            <p className="text-gray-300 text-sm md:text-base">{formattedDate}</p>
            <p className="text-neon-cyan text-sm md:text-base font-semibold mt-1">
              {couple.time} {couple.timezone}
            </p>
          </div>

          {/* Shuttle Locations Card */}
          <div className="info-card bg-dark-navy/80 backdrop-blur-md rounded-lg p-6 border border-neon-pink/30 hover:border-neon-pink transition-all duration-300 opacity-0">
            <div className="text-3xl md:text-4xl mb-3">🚗</div>
            <h3 className="text-xl md:text-2xl font-bold text-neon-pink mb-3 uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Shuttle
            </h3>
            <ul className="text-gray-300 text-xs md:text-sm space-y-1">
              <li>• Kahala Mall</li>
              <li>• Mānoa Marketplace</li>
              <li>• Ala Moana Center</li>
            </ul>
          </div>
        </div>

        {/* RSVP Button */}
        <a
          href="#rsvp"
          className="px-8 md:px-12 py-4 md:py-5 bg-neon-pink text-white font-bold text-lg md:text-xl rounded-lg transition-all duration-300 uppercase tracking-widest hover:scale-105 hover:shadow-lg"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            boxShadow: '0 0 30px rgba(255, 105, 180, 0.5)',
          }}
        >
          RSVP Now
        </a>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-neon-cyan">
          <svg
            className="w-6 h-6"
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
