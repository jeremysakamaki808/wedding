import React from 'react';
import { venueFrames } from '@/app/config/venueFrames';

/**
 * Full-screen animated venue scene. Slides into view after "Our Story",
 * pins to the viewport, then HeroScrollStage scrubs it:
 *  - flip-book frame sequence ([data-venue-frame] src swaps with scroll)
 *  - dolly-forward + tilt-down camera move ([data-venue-cam] transform)
 *
 * The frame image is ~135% viewport height, so the initial view sits on the
 * horizon; as the camera tilts down, the foreground grounds are revealed.
 */
export default function VenueBackdrop() {
  return (
    <section
      data-venue-stage
      aria-hidden
      className="sticky top-0 z-20 h-screen overflow-hidden bg-navy-dark"
    >
      <div data-venue-cam className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-venue-frame
          src={venueFrames.path(0)}
          alt=""
          draggable={false}
          className="absolute top-0 left-0 w-full h-[135%] object-cover select-none"
        />
      </div>

      {/* Soft vignette so overlaid text/cards stay readable at the edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/30 via-transparent to-navy-dark/20 pointer-events-none" />
    </section>
  );
}
