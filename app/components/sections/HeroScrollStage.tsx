'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { venueFrames } from '@/app/config/venueFrames';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * GTA VI-style scroll stage: one pinned hero viewport whose layers crossfade
 * through the whole Hero -> Our Story -> Venue journey.
 *
 *  0. ONE continuous zoom drives the hero artwork from page top to the end of
 *     the dissolve — constant rate, zero pauses — pushing in and panning up
 *     toward the couple's faces (ends ~2.4-2.6x depending on story height).
 *  A. Meanwhile the hero UI fades out and the color overlay builds (0 -> 0.8).
 *  B. "Our Story" scrolls over the darkened artwork; the overlay keeps
 *     creeping toward near-solid (0.96 — almost, but not quite).
 *  C. Dissolve: the venue flip-book layer fades in beneath the veil, then the
 *     overlay thins back out to transparent, revealing the animated scene.
 *  D. Opposite move: the venue camera continuously zooms OUT (1.35 -> 1) while
 *     scroll scrubs the flip-book frames; the Venue card scrolls up over it.
 *
 * Children contract (queried via data attributes inside this stage):
 *  - [data-hero-bg]           hero background artwork (continuous zoom + pan-up)
 *  - [data-hero-bg-b]         optional "heads turned" frame (crossfaded in)
 *  - [data-hero-content]      hero UI (faded/drifted out)
 *  - [data-hero-overlay]      color overlay (0 -> 0.8 -> 0.96 -> 0)
 *  - [data-story-content]     Our Story content (fades in on entry)
 *  - [data-venue-layer]       venue scene layer inside the hero (opacity 0 -> 1)
 *  - [data-venue-cam]         camera layer (dolly + tilt transform)
 *  - [data-venue-frame]       <img> whose src is swapped through the frames
 *  - [data-venue-transition]  flow marker: dissolve zone
 *  - [data-venue-runway]      flow marker: flip-book/camera runway
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
      const story = stage.querySelector('[data-story-content]');
      const venueLayer = stage.querySelector('[data-venue-layer]');
      const venueCam = stage.querySelector('[data-venue-cam]');
      const venueFrame = stage.querySelector<HTMLImageElement>('[data-venue-frame]');
      const transitionZone = stage.querySelector('[data-venue-transition]');
      const runway = stage.querySelector('[data-venue-runway]');

      // ---- Continuous zoom: ONE tween from page top to end of dissolve -----
      // The push toward the faces never pauses. The end scale is derived from
      // the actual scroll distance so the RATE stays constant (the hero-phase
      // rate: 0.45 scale per 80vh) no matter how tall Our Story is. The pan
      // (yPercent) keeps a fixed ratio to the zoom and stays below the
      // (scale-1)*38 top-edge overshoot, so no gap ever opens at the top.
      if (bg && transitionZone) {
        const ZOOM_RATE = 0.45 / 0.8; // scale units per viewport-height
        const PAN_RATIO = 22.2; // yPercent per scale unit (1.45 <-> 10)
        const endScale = () => {
          const distancePx = window.scrollY + transitionZone.getBoundingClientRect().bottom;
          return 1 + ZOOM_RATE * (distancePx / window.innerHeight);
        };

        gsap.fromTo(
          bg,
          { scale: 1, transformOrigin: '62% 38%', yPercent: 0 },
          {
            scale: endScale,
            yPercent: () => (endScale() - 1) * PAN_RATIO,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              endTrigger: transitionZone,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // ---- Overlay veil: ONE driver for the whole 0 -> 0.8 -> 0.96 -> 0 arc.
      // A single piecewise map of absolute scroll position. Never split this
      // across multiple triggers: two scrubbed tweens on the same property
      // update in creation order on the same tick, so scrolling back to the
      // top lets the later trigger re-render its start value (0.8) AFTER the
      // hero trigger has written 0 — leaving the veil stuck over the hero.
      if (overlay && transitionZone) {
        let m = { rampStart: 0, rampEnd: 1, creepStart: 1, creepEnd: 2, fadeStart: 2, fadeEnd: 3 };
        const measure = () => {
          const H = window.innerHeight;
          const sy = window.scrollY;
          const tz = transitionZone.getBoundingClientRect();
          const tzTop = tz.top + sy;
          const st = story?.getBoundingClientRect();
          m = {
            rampStart: 0.16 * H, // matches old stage-A timing (pos 0.2 of 80vh)
            rampEnd: 0.8 * H,
            creepStart: st ? st.top + sy - 0.3 * H : tzTop, // story top hits 30%
            creepEnd: st ? st.bottom + sy : tzTop, // story bottom hits top
            fadeStart: tzTop + 0.35 * tz.height,
            fadeEnd: tzTop + tz.height,
          };
        };
        const veilAt = (s: number) => {
          if (s <= m.rampStart) return 0;
          if (s < m.rampEnd) return 0.8 * ((s - m.rampStart) / (m.rampEnd - m.rampStart));
          if (s < m.creepStart) return 0.8;
          if (s < m.creepEnd) return 0.8 + 0.16 * ((s - m.creepStart) / (m.creepEnd - m.creepStart));
          if (s < m.fadeStart) return 0.96;
          if (s < m.fadeEnd) return 0.96 * (1 - (s - m.fadeStart) / (m.fadeEnd - m.fadeStart));
          return 0;
        };
        const apply = () => gsap.set(overlay, { opacity: veilAt(window.scrollY) });
        measure();
        apply();
        ScrollTrigger.create({
          trigger: stage,
          endTrigger: transitionZone,
          start: 'top top',
          end: 'bottom top',
          onUpdate: apply,
          onRefresh: () => {
            measure();
            apply();
          },
        });
      }

      // ---- A. Hero intro release: UI fades out --------------------------
      {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=80%',
            scrub: 0.6,
          },
        });

        // Optional second frame (heads turned toward viewer) crossfades in mid-zoom
        if (bgB) {
          tl.fromTo(bgB, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.5 }, 0.3);
        }

        if (content.length) {
          // autoAlpha -> visibility:hidden at 0, so the faded hero UI can't
          // intercept clicks while the stage is pinned behind later sections
          tl.to(content, { autoAlpha: 0, y: -60, ease: 'none', duration: 0.45 }, 0);
        }
      }

      // ---- B. Our Story passes: story content fades in ---------------------
      if (story) {
        gsap.fromTo(
          story,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: story,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 0.6,
            },
          }
        );
      }

      // ---- C. Dissolve: venue scene fades in beneath the thinning veil ----
      if (transitionZone && venueLayer) {
        gsap.fromTo(
          venueLayer,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: transitionZone,
              start: 'top top',
              end: '45% top', // scene fully in by 45% of the zone (veil fade starts at 35%)
              scrub: 0.6,
            },
          }
        );
      }

      // ---- D. Venue scene: dolly-forward + tilt-down + flip-book scrub -----
      if (transitionZone && runway && venueCam && venueFrame) {
        // Preload every frame so scrubbing never shows a blank swap
        const preloaded: HTMLImageElement[] = [];
        for (let i = 0; i < venueFrames.count; i++) {
          const im = new Image();
          im.src = venueFrames.path(i);
          preloaded.push(im);
        }

        let currentFrame = 0;
        const totalSteps = venueFrames.count * venueFrames.cycles;
        const setFrame = (progress: number) => {
          const step = Math.min(totalSteps - 1, Math.floor(progress * totalSteps));
          const idx = venueFrames.cycles > 1 ? step % venueFrames.count : step;
          if (idx !== currentFrame) {
            currentFrame = idx;
            venueFrame.src = venueFrames.path(idx);
          }
        };

        // Camera runs across the dissolve AND the runway, so the scene is
        // already alive while it's being revealed. Opposite of the hero: the
        // scene starts pushed-in on the foreground and continuously zooms OUT,
        // pulling back and settling on the full vista as scroll progresses.
        gsap.fromTo(
          venueCam,
          { scale: 1.35, yPercent: -18, transformOrigin: '50% 35%' },
          {
            scale: 1,
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: transitionZone,
              endTrigger: runway,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
              onUpdate: self => setFrame(self.progress),
            },
          }
        );
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
