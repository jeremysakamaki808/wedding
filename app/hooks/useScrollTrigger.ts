'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerConfig {
  trigger: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export function useScrollTrigger(config: ScrollTriggerConfig) {
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const trigger = typeof config.trigger === 'string' ? triggerRef.current : config.trigger;

    if (!trigger) return;

    ScrollTrigger.create({
      trigger,
      start: config.start || 'top center',
      end: config.end,
      scrub: config.scrub,
      markers: config.markers,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [config]);

  return triggerRef;
}

export function useParallax(element: React.RefObject<HTMLElement>, offset: number = 200) {
  useEffect(() => {
    if (!element.current) return;

    gsap.to(element.current, {
      y: offset,
      scrollTrigger: {
        trigger: element.current,
        start: 'top top',
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [element, offset]);
}

export function useStagger(
  selector: string,
  duration: number = 0.4,
  staggerDelay: number = 0.15
) {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector) as HTMLElement[];

    if (elements.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: elements[0]?.parentElement || elements[0],
        start: 'top center',
      },
    });

    elements.forEach((element, index) => {
      timeline.to(
        element,
        {
          opacity: 1,
          y: 0,
          duration,
        },
        index * staggerDelay
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      timeline.kill();
    };
  }, [selector, duration, staggerDelay]);
}
