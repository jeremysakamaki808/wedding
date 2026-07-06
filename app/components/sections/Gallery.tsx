'use client';

import WaxSeal from '@/components/ui/WaxSeal';

export default function Gallery() {
  // Temporary gallery — reuses the three Kaimea Estates venue photos (hotlinked
  // from Kaimea's CDN, mirroring public/data/wedding.json). Swap for the
  // couple's own photos when available; extra slots fall back to placeholders.
  const imageData = [
    {
      id: 'gallery-1',
      url: 'https://images.squarespace-cdn.com/content/v1/60a29d738b4b396e23140532/10aeee3b-6d3a-4903-9a69-268ab87ccce1/image-asset.jpeg?format=1500w',
      alt: 'Kaimea Estates lush tropical gardens',
    },
    {
      id: 'gallery-2',
      url: 'https://images.squarespace-cdn.com/content/v1/60a29d738b4b396e23140532/961639d7-2f87-48f1-a900-977bb415ffbd/IMG_8615.JPG?format=1500w',
      alt: 'Oceanfront ceremony lawn at Kaimea Estates',
    },
    {
      id: 'gallery-3',
      url: 'https://images.squarespace-cdn.com/content/v1/60a29d738b4b396e23140532/6d7e839b-98cb-4fb4-8b79-1d7a9976dfc6/IMG_4640+%281%29.JPG?format=1500w',
      alt: 'Elegant estate garden decorated for celebration',
    },
  ] as { id: string; url: string | null; alt: string }[];

  return (
    <section id="gallery" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="kicker-lines label-text text-sage mb-3">Captured moments</p>
          <h2 className="text-engraved text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Photo Gallery
          </h2>
          <p className="text-charcoal/70 text-lg">Moments from our Hawaiian celebration</p>
          <div className="relative mx-auto mt-5 h-px w-16 bg-gold/60">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-gold/70" />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {imageData.map((image, index) => (
            <div
              key={image.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer group border border-cream-dark ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              {image.url ? (
                <>
                  {/* Estate plate: warm film grade, hairline gold frame */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-64 lg:h-96 object-cover sepia-[.08] saturate-[1.05] transition-[filter,transform] duration-500 group-hover:sepia-0 group-hover:scale-[1.02]"
                  />
                  <div aria-hidden className="absolute inset-2 ring-1 ring-gold/40 pointer-events-none rounded-[2px]" />
                  {index === 0 && (
                    <WaxSeal className="absolute top-3 right-3 w-12 h-12 drop-shadow-md rotate-6" />
                  )}
                  {/* Rising caption plate */}
                  <div className="absolute bottom-0 inset-x-0 bg-ivory/95 py-2.5 px-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                    <span className="text-charcoal/80 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                      {image.alt}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* Placeholder */}
                  <div className="w-full h-64 lg:h-96 bg-garden-mist flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sage uppercase tracking-[0.18em] text-sm font-semibold">Photo</p>
                      <p className="text-brown/50 text-xs mt-1 uppercase tracking-[0.14em]">Placeholder {index + 1}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Gallery Info */}
        <div className="mt-12 text-center">
          <p className="text-charcoal/70">
            Full gallery with curated memories coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
