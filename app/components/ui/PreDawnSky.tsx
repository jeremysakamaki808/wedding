import React from 'react';

/* Star constellations for the pre-dawn sky (box-shadow starfields like the
   hero's; x in vw so the sky breathes with the viewport). Shared by the
   timeline's dawn cap and the venue's night tail so the same stars sit on
   both sides of the section seam. */
const STARS_DAWN = [
  [6, 24], [14, 90], [22, 40], [30, 130], [37, 18], [44, 74], [52, 120],
  [60, 36], [67, 96], [75, 22], [83, 110], [90, 58], [96, 140], [26, 200],
  [58, 180], [88, 205],
]
  .map(([x, y]) => `${x}vw ${y}px 0 0.6px rgba(248,245,239,0.7)`)
  .join(', ');

const STARS_DAWN_B = [
  [10, 150], [34, 60], [48, 20], [70, 160], [80, 44], [93, 92], [18, 170],
]
  .map(([x, y]) => `${x}vw ${y}px 0 0.85px rgba(231,207,159,0.75)`)
  .join(', ');

interface PreDawnSkyProps {
  /** Position + size of the sky box. Give the venue tail and the timeline cap
      the SAME height (and full-bleed width) so bg-cover scales identically
      and the mirrored image meets itself pixel-for-pixel at the seam. */
  className?: string;
  /** Feather, in the box's own (unflipped) coordinate space */
  mask: string;
  /** Mirror vertically: the box's BOTTOM edge shows the image's crown (row 0),
      so a flipped tail above a normal cap makes the seam a mirror plane. */
  flip?: boolean;
}

/**
 * The shared pre-dawn sky: the Luma dawn render's deep-navy crown plus two
 * twinkling star layers. Rendered normally it opens the Day Timeline; rendered
 * flipped it closes the venue night — both from the identical asset, so the
 * hand-off between the pinned venue scene and the timeline has no seam.
 */
export default function PreDawnSky({ className = '', mask, flip = false }: PreDawnSkyProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <div className={`absolute inset-0 ${flip ? '-scale-y-100' : ''}`}>
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[position:center_top]"
          style={{ backgroundImage: "url('/textures/dawn-sky.jpg')" }}
        />
        {/* Last stars of the night, strongest at the crown */}
        <div className="absolute inset-x-0 top-0 h-[26vh] md:h-[34vh] hidden sm:block motion-reduce:!hidden [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]">
          <span
            className="absolute top-0 left-0 w-px h-px rounded-full [animation:twinkle_5.8s_ease-in-out_infinite]"
            style={{ boxShadow: STARS_DAWN }}
          />
          <span
            className="absolute top-0 left-0 w-px h-px rounded-full [animation:twinkle_7.8s_ease-in-out_1.4s_infinite]"
            style={{ boxShadow: STARS_DAWN_B }}
          />
        </div>
      </div>
    </div>
  );
}
