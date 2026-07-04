'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { WeddingData } from '@/types';
import GradientText from '@/components/animation/GradientText';
import ParallaxElement from '@/components/animation/ParallaxElement';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  data: WeddingData;
}

export default function Hero({ data }: HeroProps) {
  const { couple, tagline } = data.event;
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const eventDate = new Date(couple.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const timeline = gsap.timeline();

    // Subtitle fade-in + slide up
    if (subtitleRef.current) {
      timeline.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3 },
        0
      );
    }

    // Date fade-in + scale
    if (dateRef.current) {
      timeline.fromTo(
        dateRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 },
        0.5
      );
    }

    // Button entrance + hover animation
    if (buttonRef.current) {
      timeline.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.7
      );

      // Hover animation
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          boxShadow: '0 0 30px rgba(200, 90, 124, 0.7)',
          duration: 0.3,
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: '0 0 20px rgba(200, 90, 124, 0.5)',
          duration: 0.3,
        });
      });
    }

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-gradient-hero overflow-hidden flex items-center justify-center">
      {/* Hero Background - Parallax */}
      <ParallaxElement
        className="absolute inset-0 opacity-30 -z-10"
        offset={150}
        scale={false}
        opacity={false}
      >
        <div className="absolute inset-0 bg-gradient-neon"></div>
      </ParallaxElement>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Main Title - Gradient Reveal */}
        <GradientText className="text-5xl md:text-7xl font-bold mb-6 leading-tight" scrub={1}>
          {couple.names.join(' & ')}
        </GradientText>

        {/* Tagline */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-8 font-light opacity-0"
        >
          {tagline}
        </p>

        {/* Date and Time */}
        <div ref={dateRef} className="space-y-2 mb-12 opacity-0">
          <p className="text-lg text-neon-cyan font-semibold">{formattedDate}</p>
          <p className="text-lg text-neon-orange font-semibold">
            {couple.time} {couple.timezone}
          </p>
        </div>

        {/* CTA Button */}
        <a
          ref={buttonRef}
          href="#rsvp"
          className="inline-block px-8 py-4 bg-neon-pink text-white text-lg font-bold rounded-lg transition-all duration-300 opacity-0"
          style={{
            boxShadow: '0 0 20px rgba(200, 90, 124, 0.5)',
          }}
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
