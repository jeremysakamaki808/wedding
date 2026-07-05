/**
 * Venue scene video, scrubbed by scroll in HeroScrollStage (GTA VI style:
 * scroll progress maps 1:1 to video time; the camera move is baked into the
 * footage, so the site applies no extra zoom/pan to this layer).
 *
 * Encoding notes (matters for scrub smoothness):
 *  - keyframe every 8 frames (1/3s at 24fps) so currentTime seeks decode fast
 *  - MP4 has +faststart (moov up front) for progressive buffering
 *  - WebM listed first: browsers pick the first playable source and the VP9
 *    file is smaller; Safari falls through to the MP4
 *
 * To swap in new footage: replace the files in public/videos/ and update
 * `duration` to the new clip's exact length (used only until the browser
 * reports the real duration from metadata).
 */
export const venueVideo = {
  duration: 12.05, // seconds — fallback until loadedmetadata supplies the real value
  poster: '/videos/venue-poster.jpg',
  sources: [
    { src: '/videos/venue-animation.webm', type: 'video/webm' },
    { src: '/videos/venue-animation.mp4', type: 'video/mp4' },
  ],
};
