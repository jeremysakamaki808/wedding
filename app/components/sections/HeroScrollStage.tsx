'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { venueFrames } from '@/app/config/venueFrames';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * GTA VI-style scroll stage managing the full Hero -> Our Story -> Venue journey:
 *
 *  1. Hero pins full-screen; scroll scrubs a camera push-in on the artwork,
 *     the color overlay deepens, and the hero UI fades out.
 *  2. "Our Story" scrolls up over the darkened hero and fades in.
 *  3. The animated venue backdrop slides in, pins, and scroll scrubs a
 *     flip-book frame sequence + a dolly-forward/tilt-down camera move
 *     (opposite feel of the hero: pushing toward the grounds, looking down).
 *  4. The Venue card scrolls up over the pinned backdrop.
 *
 * Children contract (queried via data attributes inside this stage):
 *  - [data-hero-bg]        hero background artwork (scaled 1 -> 1.35)
 *  - [data-hero-bg-b]      optional "heads turned" second frame (crossfaded in)
 *  - [data-hero-content]   hero UI (faded/drifted out)
 *  - [data-hero-overlay]   color overlay (opacity 0 -> 0.85)
 *  - [data-story-content]  Our Story content (fades in on entry)
 *  - [data-venue-stage]    sticky venue backdrop section (scrub anchor)
 *  - [data-venue-cam]      camera layer (dolly + tilt transform)
 *  - [data-venue-frame]    <img> whose src is swapped through the frames
 */
export default function HeroScrollStage({ children }: { children: React.ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // ---- Stage 1: hero push-in ------------------------------------------
      const bg = stage.querySelector('[data-hero-bg]');
      const bgB = stage.querySelector('[data-hero-bg-b]');
      const content = stage.querySelectorAll('[data-hero-content]');
      const overlay = stage.querySelector('[data-hero-overlay]');

      if (bg) {
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
      }

      // ---- Stage 2: Our Story fades in over the darkened hero -------------
      const story = stage.querySelector('[data-story-content]');
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

      // ---- Stage 3: venue backdrop flip-book + dolly-tilt camera ----------
      const venueStage = stage.querySelector('[data-venue-stage]');
      const venueCam = stage.querySelector('[data-venue-cam]');
      const venueFrame = stage.querySelector<HTMLImageElement>('[data-venue-frame]');

      if (venueStage && venueCam && venueFrame) {
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

        // Camera: dolly forward while tilting down toward the grounds.
        // The frame image is 135% tall, so the negative yPercent reveals the
        // foreground as the "camera" tips downward.
        gsap.fromTo(
          venueCam,
          { scale: 1, yPercent: 0, transformOrigin: '50% 35%' },
          {
            scale: 1.15,
            yPercent: -22,
            ease: 'none',
            scrollTrigger: {
              trigger: venueStage,
              start: 'top top',
              end: '+=150%',
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
