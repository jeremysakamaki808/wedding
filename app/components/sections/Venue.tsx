'use client';

import React from 'react';
import type { WeddingData } from '@/types';

interface VenueProps {
  data: WeddingData;
}

export default function Venue({ data }: VenueProps) {
  const { venue } = data;

  return (
    <section id="venue" className="py-20 bg-dark-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            The Venue
          </h2>
          <p className="text-gray-400 text-lg">{venue.description}</p>
        </div>

        {/* Venue Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images - Placeholder */}
          <div className="space-y-4">
            {venue.images.map((image) => (
              <div
                key={image.id}
                className="w-full h-64 md:h-80 bg-gradient-neon rounded-lg overflow-hidden flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-white text-lg font-bold">{image.alt}</p>
                  <p className="text-gray-200 text-sm mt-2">(Placeholder Image)</p>
                </div>
              </div>
            ))}
          </div>

          {/* Venue Details */}
          <div className="space-y-8">
            {/* Venue Name & Address */}
            <div>
              <h3 className="text-3xl font-bold text-neon-pink mb-4">{venue.name}</h3>
              <p className="text-gray-300 text-lg mb-2">{venue.address}</p>
              <p className="text-gray-400">{venue.parking}</p>
            </div>

            {/* Timeline Details */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-neon-cyan">Day of Schedule</h4>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24">
                  <p className="text-neon-orange font-bold">{venue.arrival}</p>
                </div>
                <div className="flex-grow border-l-2 border-neon-pink pl-4 pb-4">
                  <p className="text-gray-300">Pre-ceremony mingling, drinks, and photos</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24">
                  <p className="text-neon-pink font-bold">{venue.ceremony}</p>
                </div>
                <div className="flex-grow border-l-2 border-neon-cyan pl-4 pb-4">
                  <p className="text-gray-300">The moment we say "I do"</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24">
                  <p className="text-neon-cyan font-bold">{venue.reception}</p>
                </div>
                <div className="flex-grow border-l-2 border-neon-orange pl-4">
                  <p className="text-gray-300">Dinner, toasts, dancing, and celebration</p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="mt-8">
              <h4 className="text-lg font-bold text-neon-cyan mb-4">Location Map</h4>
              <iframe
                src={venue.mapEmbed}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
