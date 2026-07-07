'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineItem } from '@/types';
import Lantern from '@/components/ui/Lantern';
import EventGlyph from '@/components/timeline/EventGlyph';
import EstatePlate from '@/components/ui/EstatePlate';
import Vignette from '@/components/timeline/Vignettes';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

type Phase = 'day' | 'golden' | 'night';

/* Card glow per hour. The card is corner-clipped like the venue's kraft
   luggage tag, so a real CSS border would be severed by the clip — the glow
   lives on the box-shadow and the visible frame is the inset hairline below. */
const CARD_GLOW: Record<Phase, string> = {
  day: 'shadow-soft',
  golden: 'shadow-[0_10px_28px_rgba(212,149,107,0.16)]',
  night: 'shadow-[0_0_34px_rgba(201,166,107,0.26)]',
};
/* Inset hairline tint — warms and brightens from daylight to lanternlit night */
const HAIRLINE_PHASE: Record<Phase, string> = {
  day: 'border-gold-dark/20',
  golden: 'border-gold/40',
  night: 'border-gold/55',
};

/* Resting plate tilts as complete literal classes (Tailwind JIT scans source),
   matching the venue's estate plates */
const PLATE_TILTS = ['md:-rotate-1', 'md:rotate-[0.75deg]', 'md:-rotate-[0.5deg]'];

function Chevron({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

interface TimelineStopProps {
  item: TimelineItem;
  index: number;
  phase: Phase;
}

export default function TimelineStop({ item, index, phase }: TimelineStopProps) {
  const [open, setOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const reduced = usePrefersReducedMotion();

  const showImage = Boolean(item.image) && !imgFailed;
  const details = item.details ?? [];
  const panelId = `stop-${index}-details`;
  const stopNo = String(index + 1).padStart(2, '0');

  /* The scene, mounted as an estate plate so it belongs to the same album as
     the venue photographs (kraft corners / linen tape, tilt, engraved caption,
     wax seal on the ceremony). Falls back to the engraved vignette. */
  const plate = (
    <EstatePlate
      caption={item.event}
      mount={index % 2 === 0 ? 'tape' : 'corners'}
      tilt={PLATE_TILTS[index % PLATE_TILTS.length]}
      seal={item.icon === '💍'}
      noGrade={!showImage}
      className="w-full max-w-[360px]"
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.event}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="w-full aspect-[3/2] object-cover"
        />
      ) : (
        <Vignette index={index} phase={phase} note={item.note} />
      )}
    </EstatePlate>
  );

  return (
    <div
      data-phase={phase}
      className={`timeline-item flex flex-col md:flex-row gap-8 opacity-0 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Itinerary card — a clipped parchment tag with an inset hairline frame
          and a rubber-stamped stop number, the same physical-artifact language
          as the venue folio's luggage tag */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <div
          className={`paper grain relative p-6 pl-7 transition-shadow duration-300 ${CARD_GLOW[phase]}`}
          style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)' }}
        >
          {/* inset hairline frame (the visible border; follows the tag, not the clip) */}
          <div aria-hidden className={`absolute inset-2 border ${HAIRLINE_PHASE[phase]} rounded-[2px] pointer-events-none`} />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-11 h-11 rounded-full border border-gold/50 bg-ivory text-charcoal/75 flex-shrink-0">
                <EventGlyph icon={item.icon} />
              </span>
              <div className="leading-none">
                <p className="text-[10px] uppercase tracking-[0.26em] font-bold text-gold-dark/75 mb-1.5 rotate-[-1deg]">
                  Stop No. {stopNo}
                </p>
                <p className="text-burgundy font-bold text-lg">{item.time}</p>
              </div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">{item.event}</h3>
            <p className="text-charcoal/75">{item.description}</p>

            {/* Expandable practical details — the functional disclosure */}
            {details.length > 0 && (
              <div className="mt-4">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpen(o => !o)}
                  className="flex items-center justify-between w-full pt-3 border-t border-cream-dark text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-sm"
                >
                  <span className="label-text text-gold-dark">What to expect</span>
                  <Chevron className={`w-4 h-4 text-gold-dark transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-3 space-y-1.5">
                        {details.map((d, i) => (
                          <li key={i} className="text-sm leading-snug">
                            <span className="font-semibold text-burgundy">{d.label}</span>
                            <span className="text-gold-dark/50 mx-1.5" aria-hidden="true">
                              &middot;
                            </span>
                            <span className="text-charcoal/75">{d.value}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* The field note rides inside the card on mobile, where the scene
                plate sits below rather than beside */}
            {item.note && (
              <p className="md:hidden !text-sm italic font-body text-charcoal/60 mt-3">{item.note}</p>
            )}
          </div>
        </div>
      </div>

      {/* Route lantern marker + the stop's scene plate */}
      <div className="md:w-1/2 flex flex-col items-center gap-5 md:pt-6">
        <span
          data-tl-stop
          className={`hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gold/50 bg-ivory text-charcoal/70 transition-[border-color,box-shadow] duration-700 flex-shrink-0 ${
            phase === 'night' ? 'lantern-night' : ''
          }`}
        >
          <Lantern className="w-5 h-7" />
        </span>
        {plate}
      </div>
    </div>
  );
}
