/**
 * Venue flip-book animation frames, scrubbed by scroll in HeroScrollStage.
 *
 * The current frames are generated SVG placeholders (coastal scene with
 * moving waves, swaying palms, drifting boats). To swap in real renders:
 *  1. Drop your frames into public/images/venue/frames/
 *     named frame-00.png, frame-01.png, ... (two-digit, sequential)
 *  2. Update `count` and `ext` below to match.
 *
 * 12–24 frames is the sweet spot: enough for smooth motion, cheap to preload.
 * Frames should share the same composition (only waves/palms/boats move) so
 * scrubbing reads as one living scene rather than a slideshow.
 */
export const venueFrames = {
  count: 12,
  ext: 'svg',
  /**
   * How many times the frame loop plays across the full scroll scrub.
   * Use >1 only if your frames form a seamless loop (frame N-1 -> frame 0).
   * For a one-way, non-looping sequence set this to 1.
   */
  cycles: 3,
  path(i: number): string {
    return `/images/venue/frames/frame-${String(i).padStart(2, '0')}.${this.ext}`;
  },
};
