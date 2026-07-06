/**
 * Hero background loop — a seamless ~9s cinemagraph (locked camera, ambient
 * motion only). It autoplays muted on a loop, running on its own clock while
 * HeroScrollStage applies the scroll zoom/pan transform to the wrapping
 * [data-hero-bg] layer. The hero video is NOT scroll-scrubbed (only the venue
 * video is).
 *
 * WebM (VP9) listed first — browsers take the first playable source and the
 * VP9 file is smaller; Safari falls through to the MP4. The poster is the
 * clip's first frame, so the pre-play paint (and the reduced-motion / failed-
 * autoplay fallback via the wrapper's bg-hero-art background) is
 * indistinguishable from the running video.
 */
export const heroVideo = {
  poster: '/videos/hero-poster.jpg',
  sources: [
    { src: '/videos/hero-loop.webm', type: 'video/webm' },
    { src: '/videos/hero-loop.mp4', type: 'video/mp4' },
  ],
};
