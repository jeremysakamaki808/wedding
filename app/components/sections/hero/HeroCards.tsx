'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

/* ---- The invitation's details strip ---------------------------------------
   Where glass cards once floated, the essentials are now set straight onto
   the night like an engraved invitation: three columns divided by gold
   hairlines, each headed by a hand-drawn linework icon (the same engraved
   stroke language as the timeline's glyphs) that inks itself in as the
   hero settles. No boxes, no blur — just goldwork on the dark. */

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1, ease: 'easeInOut' }, opacity: { duration: 0.25 } },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function P(props: React.ComponentProps<typeof motion.path>) {
  return <motion.path variants={draw} {...props} />;
}
function C(props: React.ComponentProps<typeof motion.circle>) {
  return <motion.circle variants={draw} {...props} />;
}

/* Estate gate — the venue */
function GateIcon() {
  return (
    <>
      <P d="M4 20 H20" />
      <P d="M6 20 V9 M9 20 V9 M15 20 V9 M18 20 V9" strokeWidth={1.1} />
      <P d="M5 9 H10 M14 9 H19" strokeWidth={1.1} />
      <P d="M9 10 C10 6.5, 14 6.5, 15 10" />
      <P d="M10.5 9.5 C11.2 12, 12.8 12, 13.5 9.5" strokeWidth={0.9} />
    </>
  );
}

/* Interlocked rings — the date they become one */
function RingsIcon() {
  return (
    <>
      <C cx="9.5" cy="13.5" r="5.5" />
      <C cx="14.5" cy="13.5" r="5.5" />
      <P d="M12 4.5 L10.5 6.5 H13.5 Z" strokeWidth={1.1} />
    </>
  );
}

/* The island coach — the shuttle */
function CoachIcon() {
  return (
    <>
      <motion.rect variants={draw} x="3" y="7" width="18" height="10" rx="2.5" />
      <P d="M3 12.5 H21 M8.5 7 V12.5 M15.5 7 V12.5" strokeWidth={1.1} />
      <C cx="8" cy="18.5" r="1.6" />
      <C cx="16" cy="18.5" r="1.6" />
    </>
  );
}

interface DetailColumn {
  label: string;
  lines: string[];
  Icon: () => React.ReactElement;
}

const DETAILS: DetailColumn[] = [
  { label: 'The Venue', lines: ['Kaimea Estates', 'Oʻahu, Hawaiʻi'], Icon: GateIcon },
  { label: 'The Date', lines: ['October 16, 2026', '3:30 PM Ceremony'], Icon: RingsIcon },
  { label: 'Shuttle', lines: ['Kahala Mall', 'Mānoa Marketplace', 'Ala Moana Center'], Icon: CoachIcon },
];

function DetailIcon({ Icon, animate }: { Icon: DetailColumn['Icon']; animate: boolean }) {
  const svgProps = {
    viewBox: '0 0 24 24',
    className:
      'w-8 h-8 md:w-9 md:h-9 text-gold-light [filter:drop-shadow(0_0_6px_rgba(231,207,159,0.35))]',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (!animate) {
    return (
      <svg {...svgProps}>
        <Icon />
      </svg>
    );
  }
  return (
    <motion.svg {...svgProps} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
      <Icon />
    </motion.svg>
  );
}

function Column({ detail, animate }: { detail: DetailColumn; animate: boolean }) {
  const { label, lines, Icon } = detail;
  return (
    <div className="flex flex-col items-center text-center gap-1.5 px-3 py-3 sm:py-1">
      <DetailIcon Icon={Icon} animate={animate} />
      <p className="label-text text-gold-light tracking-[0.24em] mt-1 [text-shadow:0_2px_8px_rgba(19,26,48,0.8)]">
        {label}
      </p>
      <div className="space-y-0.5">
        {lines.map(line => (
          <p
            key={line}
            className="text-cream !text-xs md:!text-[13px] leading-snug [text-shadow:0_2px_8px_rgba(19,26,48,0.85)]"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

const GRID_CLASS =
  'mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gold/30 max-w-[560px]';

export default function HeroCards() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={GRID_CLASS}>
        {DETAILS.map(detail => (
          <Column key={detail.label} detail={detail} animate={false} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={GRID_CLASS}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.18, delayChildren: 0.45 }}
    >
      {DETAILS.map(detail => (
        <motion.div key={detail.label} variants={rise}>
          <Column detail={detail} animate />
        </motion.div>
      ))}
    </motion.div>
  );
}
