'use client';

import React from 'react';
import Image from 'next/image';

export default function Gallery() {
  // Gallery images — replace with real images as they become available
  // For now, using placeholders; update imageData array with real URLs when ready
  const imageData = [
    { id: 'gallery-1', url: null, alt: 'Gallery image 1' },
    { id: 'gallery-2', url: null, alt: 'Gallery image 2' },
    { id: 'gallery-3', url: null, alt: 'Gallery image 3' },
    { id: 'gallery-4', url: null, alt: 'Gallery image 4' },
    { id: 'gallery-5', url: null, alt: 'Gallery image 5' },
    { id: 'gallery-6', url: null, alt: 'Gallery image 6' },
    { id: 'gallery-7', url: null, alt: 'Gallery image 7' },
    { id: 'gallery-8', url: null, alt: 'Gallery image 8' },
  ];

  return (
    <section id="gallery" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="label-text text-sage mb-3">Captured moments</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Photo Gallery
          </h2>
          <p className="text-charcoal/70 text-lg">Moments from our Hawaiian celebration</p>
          <div className="relative mx-auto mt-5 h-px w-16 bg-terracotta/50">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-terracotta/60" />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {imageData.map((image, index) => (
            <div
              key={image.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer group border border-cream-dark ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              {image.url ? (
                <>
                  {/* Real Image */}
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-navy-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-ivory font-serif tracking-[0.14em] uppercase text-lg">View</span>
                  </div>
                </>
              ) : (
                <>
                  {/* Placeholder */}
                  <div className="w-full h-64 lg:h-96 bg-garden-mist flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sage uppercase tracking-[0.18em] text-sm font-semibold">Photo</p>
                      <p className="text-brown/50 text-xs mt-1 uppercase tracking-[0.14em]">Placeholder {index + 1}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Gallery Info */}
        <div className="mt-12 text-center">
          <p className="text-charcoal/70">
            Full gallery with curated memories coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
