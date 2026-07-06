import React from 'react';

function PalmSilhouette({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 22c.3-4.4.3-8 0-11 .8-.4 2.4-.3 4 1-0.2-1.8-1.6-3-3.4-3.4 1.6-.9 3.6-.8 5.4.4-.6-2-2.8-3.2-5.2-2.7 1-1.4 2.8-2.2 5-2-1.8-1.5-4.6-1.3-6.4.4C11 3 9.4 2.2 7.2 2.5c1.6.6 2.8 1.7 3.3 3-2.2-.9-4.5-.5-5.8 1 2-.4 3.8 0 5 .9-1.8.2-3.4 1.4-3.9 3.2 1.7-1.2 3.3-1.5 4.4-1.1-.4 3.1-.4 7 .1 11.5h1.7z" />
    </svg>
  );
}

export default function HeroCTA() {
  return (
    <div className="max-w-[520px] mt-4 md:mt-5 animate-fade-up [animation-delay:0.8s]">
      {/* Brass nameplate: double gold hairline + one-shot shimmer sweep on hover */}
      <a
        href="#rsvp"
        className="relative block rounded-full border border-gold/60 bg-burgundy px-6 py-3.5 md:py-4 text-center overflow-hidden transition-all duration-300 hover:bg-burgundy-light hover:shadow-ember
          after:absolute after:inset-1 after:rounded-full after:border after:border-gold/30 after:pointer-events-none
          before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out before:bg-gradient-to-r before:from-transparent before:via-gold-light/20 before:to-transparent before:pointer-events-none"
      >
      {/* Palm decorations */}
      <PalmSilhouette className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 text-ivory opacity-10" />
      <PalmSilhouette className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 text-ivory opacity-10 -scale-x-100" />

      <span className="block font-display uppercase tracking-[0.14em] text-xl md:text-2xl text-ivory">
        RSVP Now
      </span>
        <span className="block mt-1 uppercase tracking-[0.24em] font-bold text-[10px] md:text-xs text-cream/80">
          We can&rsquo;t wait to celebrate!
        </span>
      </a>
    </div>
  );
}
