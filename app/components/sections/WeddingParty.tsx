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
          <p className="kicker-lines label-text text-sage mb-3">With love and gratitude</p>
          <h2 className="text-engraved text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Wedding Party
          </h2>
          <p className="text-charcoal/70 text-lg">The people who made this day possible</p>
          <div className="relative mx-auto mt-5 h-px w-16 bg-gold/60">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-gold/70" />
          </div>
        </div>

        {/* Party Grid */}
        <div className="party-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wedding_party.map((member) => (
            <div
              key={member.id}
              className="party-card group relative bg-ivory rounded-lg overflow-hidden border border-sage/30 hover:border-sage transition-all duration-300 cursor-pointer opacity-0"
            >
              {/* Victorian cameo portrait frame (real photos will fill the oval) */}
              <div className="grain w-full h-64 bg-garden-mist border-b border-cream-dark flex items-center justify-center overflow-hidden">
                <div className="relative w-40 h-52 flex items-center justify-center bg-ivory/70 border border-gold/50 [border-radius:50%_50%_50%_50%/42%_42%_58%_58%]">
                  <div aria-hidden className="absolute inset-1.5 border border-gold/30 [border-radius:inherit]" />
                  <div className="text-center px-4">
                    <p className="text-sage uppercase tracking-[0.18em] text-sm font-semibold">Photo</p>
                    <p className="text-brown/50 text-xs mt-1 uppercase tracking-[0.14em]">Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-charcoal mb-1">{member.name}</h3>
                <p className="text-burgundy font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-charcoal/75 text-sm">{member.bio}</p>
              </div>

              {/* Embroidered side badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-ivory/95 rounded-full border border-gold/60 text-[10px] font-bold uppercase tracking-[0.16em] text-burgundy shadow-soft">
                {member.side === 'bride' ? "K's side" : "J's side"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
