'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * GTA VI-style scroll stage. The hero stays pinned full-screen while scroll
 * scrubs a camera push-in on the artwork; a color overlay deepens, the hero UI
 * fades, and the next section (Venue card) slides up over the top.
 *
 * Children contract (queried via data attributes inside this stage):
 *  - [data-hero-bg]       background artwork layer (scaled 1 -> 1.35)
 *  - [data-hero-bg-b]     optional "heads turned" second frame (crossfaded in)
 *  - [data-hero-content]  hero UI (faded/drifted out)
 *  - [data-hero-overlay]  color overlay (opacity 0 -> 0.85)
 */
export default function HeroScrollStage({ children }: { children: React.ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const bg = stage.querySelector('[data-hero-bg]');
      const bgB = stage.querySelector('[data-hero-bg-b]');
      const content = stage.querySelectorAll('[data-hero-content]');
      const overlay = stage.querySelector('[data-hero-overlay]');
      if (!bg) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=120%',
          scrub: 0.6,
        },
      });

      // Camera push-in toward the couple's faces
      tl.fromTo(
        bg,
        { scale: 1, transformOrigin: '62% 38%' },
        { scale: 1.35, ease: 'none', duration: 1 },
        0
      );

      // Optional second frame (heads turned toward viewer) crossfades in mid-zoom
      if (bgB) {
        tl.fromTo(bgB, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.5 }, 0.3);
      }

      // Hero UI drifts up and fades as the camera pushes in
      if (content.length) {
        tl.to(content, { opacity: 0, y: -60, ease: 'none', duration: 0.45 }, 0);
      }

      // GTA color overlay deepens over the artwork
      if (overlay) {
        tl.fromTo(overlay, { opacity: 0 }, { opacity: 0.85, ease: 'none', duration: 0.8 }, 0.2);
      }
    },
    { scope: stageRef }
  );

  return (
    <div ref={stageRef} className="relative bg-navy-dark">
      {children}
    </div>
  );
}
