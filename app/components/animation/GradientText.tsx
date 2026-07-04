'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GradientTextProps {
  children: string;
  className?: string;
  scrub?: number;
}

export default function GradientText({
  children,
  className = '',
  scrub = 1,
}: GradientTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      backgroundPosition: '200% center',
      opacity: 1,
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 50%',
        scrub,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [scrub]);

  return (
    <h1
      ref={textRef}
      className={`gradient-text opacity-0 ${className}`}
      style={{
        backgroundPosition: '0% center',
      }}
    >
      {children}
    </h1>
  );
}
