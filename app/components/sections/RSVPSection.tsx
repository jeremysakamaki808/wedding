'use client';

import React from 'react';
import type { WeddingData } from '@/types';
import WaxSeal from '@/components/ui/WaxSeal';

interface RSVPSectionProps {
  data: WeddingData;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Format a bare "YYYY-MM-DD" deadline without touching `Date`.
 *
 * `new Date("2026-09-16").toLocaleDateString()` is a hydration trap: the
 * date-only string parses as UTC midnight, so a viewer west of UTC (Hawaii
 * is UTC-10) formats the *previous* calendar day while the UTC build/server
 * formats the correct one — the server and client HTML disagree and React
 * throws hydration errors (#418/#423/#425). Building the string straight
 * from the Y-M-D parts is timezone- and locale-independent, so every render
 * agrees.
 */
function formatDeadline(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, year, month, day] = m;
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
}

export default function RSVPSection({ data }: RSVPSectionProps) {
  const { rsvp } = data;
  const formattedDeadline = formatDeadline(rsvp.deadline);

  return (
    <section id="rsvp" className="py-20 bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="kicker-lines label-text text-sage mb-3">Kindly reply</p>
          <h2 className="text-engraved text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            RSVP
          </h2>
          <p className="text-charcoal/75 text-lg mb-4">
            Join us for the celebration of a lifetime
          </p>
          <p className="text-burgundy font-semibold">
            Please respond by {formattedDeadline}
          </p>
          <div className="relative mx-auto mt-5 h-px w-16 bg-gold/60">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-gold/70" />
          </div>
        </div>

        {/* Reply card — deckled stationery edge, letterpress labels */}
        <div className="grain relative bg-ivory border border-cream-dark rounded-lg p-8">
          {/* Deckled top edge */}
          <div
            aria-hidden
            className="absolute -top-[5px] inset-x-3 h-[6px] [background:radial-gradient(circle_at_50%_100%,#F8F5EF_0,#F8F5EF_4.5px,transparent_5px)] [background-size:13px_6px] [background-repeat:repeat-x]"
          />
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-charcoal mb-2">
                Your Name <span className="text-gold-dark">*</span>
              </label>
              <div className="w-full px-4 py-3 bg-cream/50 border-2 border-cream-dark rounded-lg text-brown/50 placeholder-brown/40">
                [Form will be interactive in Phase 4]
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-charcoal mb-2">
                Email Address <span className="text-gold-dark">*</span>
              </label>
              <div className="w-full px-4 py-3 bg-cream/50 border-2 border-cream-dark rounded-lg text-brown/50 placeholder-brown/40">
                [Form will be interactive in Phase 4]
              </div>
            </div>

            {/* Radio Options */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-charcoal mb-4">
                Will you be attending? <span className="text-gold-dark">*</span>
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="yes"
                    disabled
                    className="w-4 h-4 text-burgundy cursor-pointer opacity-50"
                  />
                  <label htmlFor="yes" className="ml-3 text-charcoal/50 opacity-50">
                    Yes, I'll be there!
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="no"
                    disabled
                    className="w-4 h-4 text-burgundy cursor-pointer opacity-50"
                  />
                  <label htmlFor="no" className="ml-3 text-charcoal/50 opacity-50">
                    No, I can't make it
                  </label>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-charcoal mb-2">
                Leave a message for the happy couple
              </label>
              <div className="w-full px-4 py-3 bg-cream/50 border-2 border-cream-dark rounded-lg text-brown/50 h-32">
                [Form will be interactive in Phase 4]
              </div>
            </div>

            {/* Submit — the wax seal that will stamp the reply (disabled until Phase 4) */}
            <button
              disabled
              aria-label="Submit RSVP (available in Phase 4)"
              className="group mx-auto flex flex-col items-center gap-2 pt-2 opacity-60 cursor-not-allowed"
            >
              <WaxSeal variant="button" className="w-20 h-20 drop-shadow-md" />
              <span className="uppercase tracking-[0.2em] text-sm font-bold text-burgundy">
                Submit RSVP
              </span>
            </button>

            {/* Info Text */}
            <p className="text-center text-charcoal/60 text-sm mt-4">
              Full form functionality will be available in Phase 4. Currently a static layout.
            </p>
          </div>
        </div>

        {/* FAQ — folded notes: the question on the outside, unfold for the answer */}
        <div className="mt-16">
          <h3 className="text-engraved text-2xl font-serif font-bold text-charcoal mb-8 text-center">Questions?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {data.faqs.slice(0, 4).map((faq, index) => (
              <details
                key={index}
                className="group grain bg-ivory rounded-lg border border-sage/30 hover:border-gold/50 open:border-gold/50 open:shadow-soft transition-all duration-300"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h4 className="text-lg font-serif font-bold text-burgundy">{faq.question}</h4>
                  <span
                    aria-hidden
                    className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-gold/50 text-gold-dark text-sm leading-none transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 -mt-1 text-charcoal/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
