'use client';

import React, { useState, useEffect } from 'react';
import type { WeddingData } from '@/types';
import KJLogo from '@/components/ui/KJLogo';

interface FooterProps {
  data: WeddingData;
}

/* Faint night sky over the footer — the manuscript's last page */
const FOOTER_STARS = [
  [4, 30], [11, 120], [17, 60], [24, 200], [31, 90], [38, 160], [46, 40],
  [53, 220], [60, 110], [68, 70], [74, 180], [82, 50], [90, 140], [96, 90],
]
  .map(([x, y]) => `${x}vw ${y}px 0 0.5px rgba(248,245,239,0.35)`)
  .join(', ');

/** A small constellation of their own — stars joined by hairlines */
function Constellation({ className }: { className: string }) {
  const pts: Array<[number, number]> = [
    [8, 52], [26, 30], [48, 40], [66, 14], [88, 26], [104, 48], [122, 38],
  ];
  return (
    <svg viewBox="0 0 130 64" className={className} fill="none" aria-hidden="true">
      <polyline
        points={pts.map(p => p.join(',')).join(' ')}
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 ? 1.8 : 1.2} fill="currentColor" />
      ))}
    </svg>
  );
}

export default function Footer({ data }: FooterProps) {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const eventDate = new Date(data.event.couple.date);
    const today = new Date();
    const difference = eventDate.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    setDaysLeft(Math.max(0, days));
  }, [data.event.couple.date]);

  return (
    <footer className="relative overflow-hidden bg-navy-dark border-t border-gold/30 mt-20">
      {/* Night sky: scattered stars + one constellation of their own */}
      <span
        aria-hidden
        className="absolute top-0 left-0 w-px h-px rounded-full pointer-events-none [animation:twinkle_6.5s_ease-in-out_infinite]"
        style={{ boxShadow: FOOTER_STARS }}
      />
      <Constellation className="absolute top-8 right-8 w-36 md:w-44 text-gold-light/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Couple Name */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-cream mb-2">
              {data.event.couple.names.join(' & ')}
            </h3>
            <p className="text-cream/70">{data.event.couple.date}</p>
          </div>

          {/* Venue */}
          <div>
            <h4 className="text-sage-light font-bold mb-2">Location</h4>
            <p className="text-cream">{data.venue.name}</p>
            <p className="text-cream/60 text-sm">{data.venue.address}</p>
          </div>

          {/* Countdown */}
          <div>
            <h4 className="text-gold-light font-bold mb-2">Days Until</h4>
            <p className="text-4xl font-bold text-cream">{daysLeft}</p>
          </div>
        </div>

        {/* Colophon: the monogram closes the book */}
        <div className="flex justify-center mb-8">
          <KJLogo className="w-14 h-14 text-gold/60" />
        </div>

        {/* Divider */}
        <div className="border-t border-cream-dark pt-8">
          <p className="text-cream/50 text-sm mb-3">
            Venue photography courtesy of <a href="https://kaimeaestates.com/" target="_blank" rel="noopener noreferrer" className="text-sage-light hover:text-sage transition-colors">Kaimea Estates</a>
          </p>
          <div className="flex justify-between items-center">
            <p className="text-cream/50 text-sm">
              © {new Date().getFullYear()}. Crafted with aloha.
            </p>
            <p className="text-cream/50 text-sm">Made with love on Oahu 🌺</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
