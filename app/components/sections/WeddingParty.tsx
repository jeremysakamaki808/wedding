'use client';

import React from 'react';
import type { WeddingData } from '@/types';

interface WeddingPartyProps {
  data: WeddingData;
}

export default function WeddingParty({ data }: WeddingPartyProps) {
  const { wedding_party } = data;

  return (
    <section id="party" className="py-20 bg-dark-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Wedding Party
          </h2>
          <p className="text-gray-400 text-lg">The people who made this day possible</p>
        </div>

        {/* Party Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wedding_party.map((member) => (
            <div
              key={member.id}
              className="group relative bg-dark-navy rounded-lg overflow-hidden border border-dark-slate hover:border-neon-pink transition-all duration-300 hover:shadow-glow"
            >
              {/* Image Placeholder */}
              <div className="w-full h-64 bg-gradient-sunset flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <p className="text-white text-lg font-bold">Photo</p>
                  <p className="text-gray-200 text-sm">(Placeholder)</p>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neon-pink mb-1">{member.name}</h3>
                <p className="text-neon-cyan font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>

              {/* Side Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-neon-purple rounded-full text-xs font-bold text-white">
                {member.side === 'bride' ? '👰' : '🤵'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
