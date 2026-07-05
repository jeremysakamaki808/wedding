'use client';

import React from 'react';

export default function Gallery() {
  const placeholderImages = Array.from({ length: 8 }, (_, i) => ({
    id: `gallery-${i}`,
    alt: `Gallery image ${i + 1}`,
  }));

  return (
    <section id="gallery" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Photo Gallery
          </h2>
          <p className="text-charcoal/70 text-lg">Moments from our Hawaiian celebration</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {placeholderImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer group border border-sage/30 ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              {/* Placeholder Image */}
              <div className="w-full h-64 lg:h-96 bg-gradient-cta flex items-center justify-center">
                <div className="text-center">
                  <p className="text-ivory text-lg font-bold">Photo</p>
                  <p className="text-ivory/70 text-sm">(Placeholder Image {index + 1})</p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-burgundy font-bold text-lg">View</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Info */}
        <div className="mt-12 text-center">
          <p className="text-charcoal/70">
            Full gallery with curated memories coming soon. These will be styled with Leonardo AI
            to match the coastal estate aesthetic.
          </p>
        </div>
      </div>
    </section>
  );
}
