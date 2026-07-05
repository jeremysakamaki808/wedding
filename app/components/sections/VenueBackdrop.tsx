import React from 'react';
import { venueFrames } from '@/app/config/venueFrames';

/**
 * Animated venue scene layer, rendered INSIDE the pinned hero viewport so the
 * hero artwork can dissolve seamlessly into it (no hard section edge).
 * Starts fully transparent; HeroScrollStage fades it in through the thinning
 * color overlay, then scrubs it:
 *  - flip-book frame sequence ([data-venue-frame] src swaps with scroll)
 *  - dolly-forward + tilt-down camera move ([data-venue-cam] transform)
 *
 * The frame image is ~135% viewport height, so the initial view sits on the
 * horizon; as the camera tilts down, the foreground grounds are revealed.
 */
export default function VenueBackdrop() {
  return (
    <div data-venue-layer aria-hidden className="absolute inset-0 opacity-0 overflow-hidden bg-navy-dark">
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
    </div>
  );
}
