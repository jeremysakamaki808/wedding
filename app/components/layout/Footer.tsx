'use client';

import React, { useState, useEffect } from 'react';
import type { WeddingData } from '@/types';

interface FooterProps {
  data: WeddingData;
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
    <footer className="bg-navy-dark border-t border-cream-dark mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <h4 className="text-terracotta-light font-bold mb-2">Days Until</h4>
            <p className="text-4xl font-bold text-cream">{daysLeft}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream-dark pt-8 flex justify-between items-center">
          <p className="text-cream/50 text-sm">
            © {new Date().getFullYear()}. Crafted with aloha.
          </p>
          <p className="text-cream/50 text-sm">Made with love on Oahu 🌺</p>
        </div>
      </div>
    </footer>
  );
}
