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
 *  A. Hero pins; the camera pushes in and pans up toward the couple's faces
 *     while the color overlay builds and the hero UI fades out.
 *  B. "Our Story" scrolls over the darkened artwork; the zoom keeps creeping
 *     in (1.45 -> 1.6) and the overlay toward near-solid (0.96 — not quite).
 *  C. Dissolve: the venue flip-book layer fades in beneath the veil, then the
 *     overlay thins back out to transparent, revealing the animated scene.
 *  D. Opposite move: the venue camera continuously zooms OUT (1.35 -> 1) while
 *     scroll scrubs the flip-book frames; the Venue card scrolls up over it.
 *
 * Children contract (queried via data attributes inside this stage):
 *  - [data-hero-bg]           hero background artwork (scaled 1 -> 1.6, pans up)
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

      // ---- A. Hero push-in: quick zoom toward the faces, overlay builds ----
      if (bg) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=80%',
            scrub: 0.6,
          },
        });

        // Zoom in while panning the camera up toward the faces (content drifts
        // down as the frame reframes on the couple). yPercent stays below the
        // top-edge overshoot from the scale, so no gap ever opens at the top.
        tl.fromTo(
          bg,
          { scale: 1, transformOrigin: '62% 38%', yPercent: 0 },
          { scale: 1.45, yPercent: 10, ease: 'none', duration: 1 },
          0
        );

        // Optional second frame (heads turned toward viewer) crossfades in mid-zoom
        if (bgB) {
          tl.fromTo(bgB, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.5 }, 0.3);
        }

        if (content.length) {
          // autoAlpha -> visibility:hidden at 0, so the faded hero UI can't
          // intercept clicks while the stage is pinned behind later sections
          tl.to(content, { autoAlpha: 0, y: -60, ease: 'none', duration: 0.45 }, 0);
        }

        if (overlay) {
          tl.fromTo(overlay, { opacity: 0 }, { opacity: 0.8, ease: 'none', duration: 0.8 }, 0.2);
        }
      }

      // ---- B. Our Story passes: story fades in, overlay creeps near-solid --
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

        if (overlay) {
          // Continue from trigger A's end value (0.8); immediateRender:false
          // keeps this from stomping the overlay to 0.8 at page load.
          gsap.fromTo(
            overlay,
            { opacity: 0.8 },
            {
              opacity: 0.96,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: story,
                start: 'top 30%', // after trigger A has fully released the overlay
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }

        if (bg) {
          // The push-in never stops: keep zooming toward the faces (slower now)
          // for the whole Our Story pass, until the dissolve takes over.
          gsap.fromTo(
            bg,
            { scale: 1.45, yPercent: 10 },
            {
              scale: 1.6,
              yPercent: 14,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: story,
                start: 'top 30%',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }
      }

      // ---- C. Dissolve: scene fades in beneath the veil, veil thins out ----
      if (transitionZone && venueLayer && overlay) {
        const dissolve = gsap.timeline({
          scrollTrigger: {
            trigger: transitionZone,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        dissolve.fromTo(venueLayer, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.45 }, 0);
        dissolve.to(overlay, { opacity: 0, ease: 'none', duration: 0.65 }, 0.35);
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
