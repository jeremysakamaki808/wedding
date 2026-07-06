'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion';

/* ---- Engraved scene vignettes ---------------------------------------------
   One hand-drawn linework scene per timeline stop, in the same engraved
   stroke language as the card glyphs — but at illustration scale, filling
   the row's empty half. Each path inks itself onto the page as the stop
   scrolls into view (Framer Motion pathLength), staggered like a steady
   hand working through the drawing; a one-line "field note" fades up
   underneath once the scene is down. */

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.05, ease: 'easeInOut' },
      opacity: { duration: 0.25 },
    },
  },
};

/* Thin wrappers so scenes read as plain drawings; stroke/fill/linecaps are
   inherited from the svg root */
function P(props: React.ComponentProps<typeof motion.path>) {
  return <motion.path variants={draw} {...props} />;
}
function C(props: React.ComponentProps<typeof motion.circle>) {
  return <motion.circle variants={draw} {...props} />;
}
function R(props: React.ComponentProps<typeof motion.rect>) {
  return <motion.rect variants={draw} {...props} />;
}

/* 0 — 2:30 PM · the island shuttle on the coast road */
function SceneShuttle() {
  return (
    <>
      {/* afternoon sun */}
      <C cx="32" cy="28" r="9" />
      <P d="M32 12 V16 M32 40 V44 M16 28 H20 M44 28 H48 M20.7 16.7 L23.5 19.5 M43.3 39.3 L40.5 36.5 M43.3 16.7 L40.5 19.5 M20.7 39.3 L23.5 36.5" strokeWidth={1} />
      {/* coast road */}
      <P d="M6 132 C60 122, 150 130, 234 112" />
      <P d="M34 128 l12 -1 M62 126.5 l12 -0.6" strokeWidth={0.9} />
      {/* the coach */}
      <R x="88" y="64" width="92" height="40" rx="9" strokeWidth={1.4} />
      <P d="M88 86 H180 M111 64 V86 M134 64 V86 M157 64 V86" strokeWidth={1} />
      <C cx="108" cy="108" r="8" strokeWidth={1.4} />
      <C cx="160" cy="108" r="8" strokeWidth={1.4} />
      {/* roadside palm */}
      <P d="M206 122 C204 100, 208 80, 202 60" strokeWidth={1.4} />
      <P d="M202 58 C190 50, 178 50, 168 56 M202 58 C194 46, 184 42, 174 42 M202 58 C210 46, 220 44, 230 48 M202 58 C212 52, 224 54, 232 62 M202 58 C200 46, 204 38, 212 32" strokeWidth={1.1} />
      <C cx="199" cy="63" r="2.4" strokeWidth={0.9} />
      <C cx="206" cy="64" r="2.4" strokeWidth={0.9} />
      {/* grass tufts */}
      <P d="M20 136 q4 -7 8 0 M226 119 q4 -7 8 0" strokeWidth={0.9} />
    </>
  );
}

/* 1 — 3:00 PM · the estate gate, lei on the arch */
function SceneGate() {
  return (
    <>
      <P d="M12 128 H228" />
      {/* pillars with caps */}
      <R x="62" y="52" width="24" height="76" strokeWidth={1.4} />
      <P d="M56 52 H92 M60 45 H88" strokeWidth={1.1} />
      <R x="154" y="52" width="24" height="76" strokeWidth={1.4} />
      <P d="M148 52 H184 M152 45 H180" strokeWidth={1.1} />
      {/* arch */}
      <P d="M86 58 C100 34, 140 34, 154 58" strokeWidth={1.4} />
      {/* the hanging lei */}
      <P d="M104 50 C110 76, 130 76, 136 50" strokeWidth={1.1} />
      <C cx="108" cy="60" r="2.4" strokeWidth={0.9} />
      <C cx="120" cy="66" r="2.4" strokeWidth={0.9} />
      <C cx="132" cy="60" r="2.4" strokeWidth={0.9} />
      {/* gates */}
      <P d="M92 86 C105 74, 135 74, 148 86" strokeWidth={1} />
      <P d="M96 128 V85 M108 128 V79 M120 128 V77 M132 128 V79 M144 128 V85" strokeWidth={1} />
      {/* climbing sprigs */}
      <P d="M62 96 C54 92, 50 84, 52 76 M56 88 l-6 -2 M178 96 C186 92, 190 84, 188 76 M184 88 l6 -2" strokeWidth={0.9} />
    </>
  );
}

/* 2 — 3:30 PM · the ceremony arch over the Pacific */
function SceneCeremony() {
  return (
    <>
      {/* horizon + swells behind the arch */}
      <P d="M10 96 H74 M166 96 H230" strokeWidth={0.9} />
      <P d="M24 106 q7 -5 14 0 q7 5 14 0 M182 108 q7 -5 14 0" strokeWidth={0.9} />
      {/* arch, doubled linework */}
      <P d="M76 132 V62 C76 30, 164 30, 164 62 V132" strokeWidth={1.5} />
      <P d="M84 132 V64 C84 38, 156 38, 156 64 V132" strokeWidth={0.9} />
      {/* garland vine hugging the left shoulder of the arch, leaves in pairs */}
      <P d="M78 96 C76 78, 82 48, 100 38" strokeWidth={0.9} />
      <P d="M79 84 q-6 -3 -7 -9 M79 84 q6 -1 8 -6 M84 62 q-6 -2 -8 -8 M84 62 q6 0 9 -5 M94 44 q-5 -3 -5 -9 M94 44 q6 1 9 -3" strokeWidth={0.85} />
      {/* a few blossoms on the vine */}
      <C cx="80" cy="74" r="2" strokeWidth={0.8} />
      <C cx="89" cy="52" r="2" strokeWidth={0.8} />
      {/* ribbon + the rings */}
      <P d="M120 34 V54" strokeWidth={0.9} />
      <C cx="114" cy="64" r="9" strokeWidth={1.3} />
      <C cx="127" cy="64" r="9" strokeWidth={1.3} />
      {/* petals down the aisle */}
      <P d="M96 138 L112 116 M144 138 L128 116" strokeWidth={0.9} />
      <C cx="118" cy="128" r="1.4" strokeWidth={0.8} />
      <C cx="126" cy="134" r="1.4" strokeWidth={0.8} />
    </>
  );
}

/* 3 — 4:00 PM · coupes meet; a plumeria for the tray */
function SceneCocktails() {
  return (
    <>
      <motion.g transform="rotate(10 78 72)">
        <P d="M58 48 L98 48 M58 48 C58 60, 66 68, 78 68 C90 68, 98 60, 98 48" strokeWidth={1.3} />
        <P d="M78 68 V96 M64 98 q14 -5 28 0" strokeWidth={1.2} />
      </motion.g>
      <motion.g transform="rotate(-10 162 72)">
        <P d="M142 48 L182 48 M142 48 C142 60, 150 68, 162 68 C174 68, 182 60, 182 48" strokeWidth={1.3} />
        <P d="M162 68 V96 M148 98 q14 -5 28 0" strokeWidth={1.2} />
      </motion.g>
      {/* the clink */}
      <P d="M120 24 V31 M120 45 V52 M106 38 H113 M127 38 H134 M111 29 l5 5 M124 42 l5 5 M129 29 l-5 5 M116 42 l-5 5" strokeWidth={1} />
      {/* rising bubbles */}
      <C cx="88" cy="32" r="1.8" strokeWidth={0.9} />
      <C cx="96" cy="24" r="1.3" strokeWidth={0.9} />
      <C cx="152" cy="28" r="1.8" strokeWidth={0.9} />
      {/* plumeria */}
      <P d="M120 116 C114 108, 116 100, 122 101 C127 102, 127 108, 120 116" strokeWidth={1} />
      <P d="M120 116 C114 108, 116 100, 122 101 C127 102, 127 108, 120 116" strokeWidth={1} transform="rotate(72 120 112)" />
      <P d="M120 116 C114 108, 116 100, 122 101 C127 102, 127 108, 120 116" strokeWidth={1} transform="rotate(144 120 112)" />
      <P d="M120 116 C114 108, 116 100, 122 101 C127 102, 127 108, 120 116" strokeWidth={1} transform="rotate(216 120 112)" />
      <P d="M120 116 C114 108, 116 100, 122 101 C127 102, 127 108, 120 116" strokeWidth={1} transform="rotate(288 120 112)" />
      <C cx="120" cy="112" r="2" strokeWidth={0.9} />
    </>
  );
}

/* 4 — 5:00 PM · the long table beneath the string lights */
function SceneReception() {
  return (
    <>
      {/* string-light catenary */}
      <P d="M8 26 C70 54, 170 54, 232 26" strokeWidth={1.1} />
      <P d="M50 41 V46 M90 48 V53 M130 48 V53 M170 43 V48 M206 34 V39" strokeWidth={0.9} />
      <C cx="50" cy="49" r="3" strokeWidth={1} />
      <C cx="90" cy="56" r="3" strokeWidth={1} />
      <C cx="130" cy="56" r="3" strokeWidth={1} />
      <C cx="170" cy="51" r="3" strokeWidth={1} />
      <C cx="206" cy="42" r="3" strokeWidth={1} />
      {/* the table */}
      <P d="M46 92 H194 M52 98 H188 M46 92 L52 98 M194 92 L188 98" strokeWidth={1.3} />
      <P d="M58 98 L54 128 M182 98 L186 128" strokeWidth={1.2} />
      <P d="M60 98 C64 106, 65 112, 63 118 M180 98 C176 106, 175 112, 177 118" strokeWidth={0.9} />
      {/* chairs drawn up at each end */}
      <P d="M34 128 V98 M34 110 H48 M48 128 V110" strokeWidth={1} />
      <P d="M206 128 V98 M192 110 H206 M192 128 V110" strokeWidth={1} />
      {/* settings: plates + a taper candle */}
      <P d="M84 90 a6 2.2 0 1 0 12 0 a6 2.2 0 1 0 -12 0 M144 90 a6 2.2 0 1 0 12 0 a6 2.2 0 1 0 -12 0" strokeWidth={0.9} />
      <P d="M120 84 V92 M120 78 C118.4 80.8, 121.6 80.8, 120 84" strokeWidth={1} />
    </>
  );
}

/* 5 — 8:00 PM · first dance among the fireflies */
function SceneDancing() {
  return (
    <>
      {/* her — head tipped toward his, gown sweeping into a train */}
      <C cx="107" cy="43" r="6" strokeWidth={1.3} />
      <P d="M106 49 C104 56, 103 61, 101 66" strokeWidth={1.2} />
      {/* her arms: one to his shoulder, one out to their joined hands */}
      <P d="M105 53 C112 49, 120 46, 130 44 M104 55 C97 60, 93 66, 90 72" strokeWidth={1.1} />
      {/* the gown: fitted through the waist, sweeping left into a train */}
      <P d="M101 66 C97 82, 88 100, 72 116 C64 122, 56 124, 48 122" strokeWidth={1.2} />
      <P d="M104 66 C107 84, 112 100, 120 112 C104 118, 84 120, 68 118" strokeWidth={1.2} />
      {/* soft folds falling through the skirt */}
      <P d="M100 78 C96 92, 90 104, 82 114 M104 80 C105 92, 108 102, 112 110" strokeWidth={0.8} />
      {/* him — leading, weight settled */}
      <C cx="138" cy="38" r="6" strokeWidth={1.3} />
      <P d="M138 44 C139 56, 139 68, 137 80" strokeWidth={1.2} />
      {/* his arms: one at her waist, one to their joined hands */}
      <P d="M138 48 C130 52, 120 56, 110 60 M137 46 C122 52, 104 62, 91 72" strokeWidth={1.1} />
      <P d="M137 80 C134 96, 130 108, 124 120 M137 80 C142 96, 146 108, 152 120" strokeWidth={1.2} />
      {/* the floor, softly */}
      <P d="M82 128 C104 133, 140 133, 162 128" strokeWidth={0.8} />
      {/* fireflies */}
      <C cx="48" cy="60" r="1.6" strokeWidth={0.9} />
      <C cx="74" cy="36" r="1.6" strokeWidth={0.9} />
      <C cx="180" cy="50" r="1.6" strokeWidth={0.9} />
      <C cx="196" cy="84" r="1.6" strokeWidth={0.9} />
      <P d="M180 43 v3 M180 54 v3 M173 50 h3 M184 50 h3" strokeWidth={0.8} />
    </>
  );
}

/* 6 — 8:00 PM · the coach home, under the crescent */
function SceneDeparture() {
  return (
    <>
      {/* crescent + stars */}
      <P d="M194 42 A15 15 0 1 1 176.5 24.5 A12 12 0 0 0 194 42 Z" strokeWidth={1.3} />
      <P d="M52 30 l1.5 4.5 l4.5 1.5 l-4.5 1.5 l-1.5 4.5 l-1.5 -4.5 l-4.5 -1.5 l4.5 -1.5 Z" strokeWidth={0.9} />
      <P d="M86 14 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1 Z M140 24 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1 Z" strokeWidth={0.8} />
      {/* road home */}
      <P d="M8 124 C70 114, 170 120, 232 108" />
      {/* the coach, lights on */}
      <R x="76" y="66" width="84" height="36" rx="8" strokeWidth={1.4} />
      <P d="M76 86 H160 M97 66 V86 M118 66 V86 M139 66 V86" strokeWidth={1} />
      <C cx="96" cy="106" r="7.5" strokeWidth={1.4} />
      <C cx="144" cy="106" r="7.5" strokeWidth={1.4} />
      <P d="M160 91 L184 86 M160 97 L186 96" strokeWidth={0.8} />
      {/* roadside palm, night silhouette */}
      <P d="M34 122 C33 106, 36 94, 32 82" strokeWidth={1.3} />
      <P d="M32 80 C24 74, 16 74, 10 78 M32 80 C26 70, 18 67, 12 68 M32 80 C40 70, 48 68, 54 71 M32 80 C38 74, 46 75, 52 80" strokeWidth={1} />
    </>
  );
}

const SCENES = [
  SceneShuttle,
  SceneGate,
  SceneCeremony,
  SceneCocktails,
  SceneReception,
  SceneDancing,
  SceneDeparture,
];

/* Ink + note tints per time of day: sepia charcoal in daylight, burgundy at
   golden hour, glowing gold linework once the scene sits on the night sky */
const TINT: Record<'day' | 'golden' | 'night', { svg: string; note: string }> = {
  day: { svg: 'text-charcoal/60', note: 'text-charcoal/60' },
  golden: { svg: 'text-burgundy/65', note: 'text-charcoal/65' },
  night: {
    svg: 'text-gold-light/85 [filter:drop-shadow(0_0_7px_rgba(231,207,159,0.3))]',
    note: 'text-cream/75',
  },
};

interface VignetteProps {
  index: number;
  phase: 'day' | 'golden' | 'night';
  note?: string;
}

export default function Vignette({ index, phase, note }: VignetteProps) {
  const reduced = usePrefersReducedMotion();
  const Scene = SCENES[index % SCENES.length];
  const tint = TINT[phase];

  // Reduced motion: the scene rests fully inked. Outside a variants tree the
  // motion.paths render as plain strokes, so the same drawings serve both.
  if (reduced) {
    return (
      <div className="w-full max-w-[300px]">
        <svg
          viewBox="0 0 240 150"
          className={`w-full h-auto ${tint.svg}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <Scene />
        </svg>
        {note && (
          <p className={`text-center italic font-body !text-sm mt-1 ${tint.note}`}>{note}</p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-[300px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
    >
      <motion.svg
        viewBox="0 0 240 150"
        className={`w-full h-auto ${tint.svg}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
      >
        <Scene />
      </motion.svg>
      {note && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.7 } },
          }}
          className={`text-center italic font-body !text-sm mt-1 ${tint.note}`}
        >
          {note}
        </motion.p>
      )}
    </motion.div>
  );
}
