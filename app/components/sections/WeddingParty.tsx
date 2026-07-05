'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { WeddingData } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface WeddingPartyProps {
  data: WeddingData;
}

export default function WeddingParty({ data }: WeddingPartyProps) {
  const { wedding_party } = data;

  useEffect(() => {
    const cards = gsap.utils.toArray('.party-card') as HTMLElement[];

    if (cards.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.party-grid',
        start: 'top center',
      },
    });

    cards.forEach((card, index) => {
      timeline.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
        },
        index * 0.1
      );
    });

    // Hover animation
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          boxShadow: '0 12px 24px rgba(43, 27, 16, 0.15)',
          duration: 0.3,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: 'none',
          duration: 0.3,
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      timeline.kill();
    };
  }, []);

  return (
    <section id="party" className="py-20 bg-garden-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="label-text text-sage mb-3">With love and gratitude</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Wedding Party
          </h2>
          <p className="text-charcoal/70 text-lg">The people who made this day possible</p>
          <div className="relative mx-auto mt-5 h-px w-16 bg-terracotta/50">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-terracotta/60" />
          </div>
        </div>

        {/* Party Grid */}
        <div className="party-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wedding_party.map((member) => (
            <div
              key={member.id}
              className="party-card group relative bg-ivory rounded-lg overflow-hidden border border-sage/30 hover:border-sage transition-all duration-300 cursor-pointer opacity-0"
            >
              {/* Image Placeholder */}
              <div className="w-full h-64 bg-garden-mist border-b border-cream-dark flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <p className="text-sage uppercase tracking-[0.18em] text-sm font-semibold">Photo</p>
                  <p className="text-brown/50 text-xs mt-1 uppercase tracking-[0.14em]">Placeholder</p>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-charcoal mb-1">{member.name}</h3>
                <p className="text-burgundy font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-charcoal/75 text-sm">{member.bio}</p>
              </div>

              {/* Side Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-burgundy rounded-full text-xs font-bold text-ivory">
                {member.side === 'bride' ? '👰' : '🤵'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
