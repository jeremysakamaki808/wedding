'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { WeddingData } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
  data: WeddingData;
}

export default function Timeline({ data }: TimelineProps) {
  const { timeline } = data;

  useEffect(() => {
    const items = gsap.utils.toArray('.timeline-item') as HTMLElement[];

    if (items.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top center',
      },
    });

    items.forEach((item, index) => {
      timeline.fromTo(
        item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -60 : 60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
        },
        index * 0.15
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      timeline.kill();
    };
  }, []);

  return (
    // overflow-x-clip: items enter from x:±60, which would otherwise widen
    // the page and allow sideways panning on mobile while they wait offscreen
    <section id="timeline" className="py-20 bg-dark-navy overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Day Timeline
          </h2>
          <p className="text-gray-400 text-lg">How the celebration unfolds</p>
        </div>

        {/* Timeline Items */}
        <div className="timeline-container relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-neon"></div>

          {/* Timeline Items Grid */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`timeline-item flex flex-col md:flex-row gap-8 opacity-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="md:w-1/2 flex flex-col justify-center">
                  <div className="bg-dark-charcoal p-6 rounded-lg border border-dark-slate hover:border-neon-cyan transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{item.icon}</span>
                      <p className="text-neon-cyan font-bold text-lg">{item.time}</p>
                    </div>
                    <h3 className="text-2xl font-bold text-neon-pink mb-2">{item.event}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex md:w-1/2 justify-center items-start pt-6">
                  <div className="w-6 h-6 bg-neon-pink rounded-full border-4 border-dark-navy"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
