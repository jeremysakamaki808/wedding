'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxElementProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  scale?: boolean;
  opacity?: boolean;
}

export default function ParallaxElement({
  children,
  className = '',
  offset = 200,
  scale = true,
  opacity = true,
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animationProps: Record<string, number> = {
      y: offset,
    };

    if (scale) {
      animationProps.scale = 1.1;
    }

    if (opacity) {
      animationProps.opacity = 0.7;
    }

    gsap.to(elementRef.current, {
      ...animationProps,
      scrollTrigger: {
        trigger: elementRef.current.parentElement || elementRef.current,
        start: 'top top',
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [offset, scale, opacity]);

  return (
    <div ref={elementRef} className={`parallax-layer ${className}`}>
      {children}
    </div>
  );
}
