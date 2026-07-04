'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-navy/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          {/* Centered Navigation */}
          <nav className="hidden md:flex gap-8 md:gap-12 items-center text-sm tracking-widest uppercase">
            <a
              href="#story"
              className="text-gray-200 hover:text-neon-pink transition-colors duration-300"
            >
              Our Story
            </a>
            <a
              href="#venue"
              className="text-gray-200 hover:text-neon-pink transition-colors duration-300"
            >
              The Venue
            </a>
            <a
              href="#experience"
              className="text-gray-200 hover:text-neon-pink transition-colors duration-300"
            >
              The Experience
            </a>

            {/* Logo in Center */}
            <Link href="/" className="mx-4">
              <svg
                viewBox="0 0 100 100"
                className="w-12 h-12 text-neon-pink hover:text-neon-cyan transition-colors"
                fill="currentColor"
              >
                {/* K&J Monogram - Simple representation */}
                <text x="50" y="60" fontSize="48" fontWeight="bold" textAnchor="middle" fontFamily="serif">
                  K&J
                </text>
              </svg>
            </Link>

            <a
              href="#timeline"
              className="text-gray-200 hover:text-neon-pink transition-colors duration-300"
            >
              Itinerary
            </a>
            <a
              href="#travel"
              className="text-gray-200 hover:text-neon-pink transition-colors duration-300"
            >
              Travel
            </a>
            <a
              href="#rsvp"
              className="text-gray-200 hover:text-neon-pink transition-colors duration-300"
            >
              RSVP
            </a>
          </nav>

          {/* Mobile Logo */}
          <div className="md:hidden">
            <Link href="/" className="text-3xl font-bold text-neon-pink">
              K&J
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
