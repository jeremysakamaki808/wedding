'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-navy/95 backdrop-blur-sm shadow-neon'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            💍
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            <a href="#venue" className="text-gray-300 hover:text-neon-pink transition-colors">
              Venue
            </a>
            <a href="#timeline" className="text-gray-300 hover:text-neon-pink transition-colors">
              Timeline
            </a>
            <a href="#party" className="text-gray-300 hover:text-neon-pink transition-colors">
              Party
            </a>
            <a href="#gallery" className="text-gray-300 hover:text-neon-pink transition-colors">
              Gallery
            </a>
            <a href="#rsvp" className="text-gray-300 hover:text-neon-pink transition-colors">
              RSVP
            </a>
          </nav>

          {/* CTA Button */}
          <a
            href="#rsvp"
            className="px-6 py-2 bg-neon-pink text-white rounded-lg font-bold hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            RSVP
          </a>
        </div>
      </div>
    </header>
  );
}
