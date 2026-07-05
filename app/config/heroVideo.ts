/**
 * Hero background loop — a 6s seamless cinemagraph (locked camera, ambient
 * motion only) that replaces the static hero artwork. Unlike the venue clip
 * this is NOT scroll-scrubbed: it autoplays muted on a loop while
 * HeroScrollStage applies the scroll zoom/pan transform to the wrapping
 * [data-hero-bg] layer, exactly as it did to the still image.
 *
 * WebM (VP9) listed first — browsers take the first playable source and the
 * VP9 file is smaller; Safari falls through to the MP4. The poster is the
 * clip's first frame so the pre-play paint is indistinguishable from the
 * running video.
 */
export const heroVideo = {
  poster: '/videos/hero-poster.jpg',
  sources: [
    { src: '/videos/hero-loop.webm', type: 'video/webm' },
    { src: '/videos/hero-loop.mp4', type: 'video/mp4' },
  ],
};
