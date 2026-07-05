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
      <a
        href="#rsvp"
        className="relative block rounded-xl border border-rose/60 bg-gradient-cta px-6 py-3.5 md:py-4 text-center overflow-hidden animate-pulse-soft transition-transform duration-300 hover:scale-[1.03] hover:shadow-glow"
      >
      {/* Palm decorations */}
      <PalmSilhouette className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 text-burgundy opacity-30" />
      <PalmSilhouette className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 text-burgundy opacity-30 -scale-x-100" />

      <span className="block font-display uppercase tracking-[0.2em] text-2xl md:text-3xl text-burgundy">
        RSVP Now
      </span>
        <span className="block mt-1 uppercase tracking-[0.24em] font-bold text-[10px] md:text-xs text-navy-dark">
          We can&rsquo;t wait to celebrate!
        </span>
      </a>
    </div>
  );
}
