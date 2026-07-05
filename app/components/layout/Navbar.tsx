'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import KJLogo from '@/components/ui/KJLogo';

const LEFT_LINKS = [
  { label: 'Our Story', href: '#story' },
  { label: 'The Venue', href: '#venue' },
  { label: 'The Experience', href: '#experience' },
];

const RIGHT_LINKS = [
  { label: 'Itinerary', href: '#timeline' },
  { label: 'Travel', href: '#travel' },
  { label: 'RSVP', href: '#rsvp' },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

function NavLink({
  href,
  label,
  onClick,
  className = '',
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`uppercase tracking-[0.18em] font-semibold text-cream hover:text-terracotta-light transition-colors duration-300 ${className}`}
    >
      {label}
    </a>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 animate-fade-down ${
        isScrolled
          ? 'bg-navy-dark/90 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: left links / centered logo / right links */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center">
          <nav className="flex items-center justify-end gap-8 lg:gap-12 text-xs lg:text-sm pr-8 lg:pr-12">
            {LEFT_LINKS.map(link => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <Link href="/" aria-label="Home" className="justify-self-center">
            <KJLogo className="w-16 h-16 text-cream hover:text-terracotta-light transition-colors duration-300" />
          </Link>

          <nav className="flex items-center justify-start gap-8 lg:gap-12 text-xs lg:text-sm pl-8 lg:pl-12">
            {RIGHT_LINKS.map(link => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>

        {/* Mobile: logo + hamburger */}
        <div className="flex md:hidden items-center justify-between">
          <Link href="/" aria-label="Home">
            <KJLogo className="w-12 h-12 text-cream" />
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(open => !open)}
            className="p-2 text-cream hover:text-terracotta-light transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-navy-dark/95 backdrop-blur-lg border-t border-burgundy-light/30 shadow-lg">
          <div className="flex flex-col items-center gap-6 py-10 text-base">
            {ALL_LINKS.map(link => (
              <NavLink key={link.href} {...link} onClick={closeMenu} />
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
