'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineItem } from '@/types';
import Lantern from '@/components/ui/Lantern';
import EventGlyph from '@/components/timeline/EventGlyph';
import Vignette from '@/components/timeline/Vignettes';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

type Phase = 'day' | 'golden' | 'night';

/* Card dressing per hour: daylight rows stay plain parchment, golden-hour
   rows warm at the edges, night rows carry a candle glow that deepens on
   hover (the lanterns have taken over from the sun). */
const CARD_PHASE: Record<Phase, string> = {
  day: 'border-cream-dark hover:border-gold/60',
  golden: 'border-gold/30 hover:border-gold/60 shadow-[0_10px_28px_rgba(212,149,107,0.13)]',
  night:
    'border-gold/40 hover:border-gold/75 shadow-[0_0_34px_rgba(201,166,107,0.24)] hover:shadow-[0_0_46px_rgba(201,166,107,0.34)]',
};

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

  return (
    <div
      data-phase={phase}
      className={`timeline-item flex flex-col md:flex-row gap-8 opacity-0 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Content card */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <div className={`grain bg-cream p-6 rounded-lg border transition-[border-color,box-shadow] duration-300 ${CARD_PHASE[phase]}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center justify-center w-11 h-11 rounded-full border border-gold/50 bg-ivory text-charcoal/75 flex-shrink-0">
              <EventGlyph icon={item.icon} />
            </span>
            <p className="text-burgundy font-bold text-lg">{item.time}</p>
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
              half sits below rather than beside */}
          {item.note && (
            <p className="md:hidden !text-sm italic font-body text-charcoal/60 mt-3">{item.note}</p>
          )}
        </div>
      </div>

      {/* Route lantern marker + the stop's scene (photographic art, or the
          engraved vignette as a fallback until the art lands) */}
      <div className="md:w-1/2 flex flex-col items-center gap-5 md:pt-6">
        <span
          data-tl-stop
          className={`hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gold/50 bg-ivory text-charcoal/70 transition-[border-color,box-shadow] duration-700 flex-shrink-0 ${
            phase === 'night' ? 'lantern-night' : ''
          }`}
        >
          <Lantern className="w-5 h-7" />
        </span>
        {showImage ? (
          <div className="w-full max-w-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.event}
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full aspect-[3/2] object-cover rounded-lg border border-cream-dark shadow-soft"
            />
          </div>
        ) : (
          <Vignette index={index} phase={phase} note={item.note} />
        )}
      </div>
    </div>
  );
}
