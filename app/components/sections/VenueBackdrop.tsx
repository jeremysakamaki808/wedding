import React from 'react';
import { venueFrames } from '@/app/config/venueFrames';
import { venueVideo } from '@/app/config/venueVideo';

/**
 * Animated venue scene layer, rendered INSIDE the pinned hero viewport so the
 * hero artwork can dissolve seamlessly into it (no hard section edge).
 * Starts fully transparent; HeroScrollStage fades it in through the thinning
 * color overlay, then scrubs it GTA VI-style: scroll progress maps straight
 * to [data-venue-video] currentTime. The drone camera move is baked into the
 * footage, so this layer gets no extra zoom/pan transform.
 *
 * The hidden [data-venue-frame] img is the emergency fallback: if no video
 * source is playable, HeroScrollStage unhides it and scrubs the SVG
 * flip-book frames instead.
 */
export default function VenueBackdrop() {
  return (
    <div data-venue-layer aria-hidden className="absolute inset-0 opacity-0 overflow-hidden bg-navy-dark">
      <video
        data-venue-video
        muted
        playsInline
        preload="metadata"
        poster={venueVideo.poster}
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
      >
        {venueVideo.sources.map(s => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-venue-frame
        src={venueFrames.path(0)}
        alt=""
        draggable={false}
        className="absolute inset-0 hidden h-full w-full object-cover select-none"
      />

      {/* Soft vignette so overlaid text/cards stay readable at the edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/30 via-transparent to-navy-dark/20 pointer-events-none" />
    </div>
  );
}
