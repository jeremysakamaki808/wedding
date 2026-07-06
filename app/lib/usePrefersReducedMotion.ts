'use client';

import { useEffect, useState } from 'react';

/**
 * Hydration-safe reduced-motion check.
 *
 * framer-motion's `useReducedMotion()` returns null on the server but the
 * real value on the client's first (hydration) render — so a component that
 * branches on it renders different HTML on each side and trips React's
 * hydration errors (#418/#425) for reduced-motion visitors. This hook
 * always returns `false` for SSR *and* the hydration render, then flips
 * after mount, so both sides agree and the static treatment applies one
 * paint later — imperceptible, and safe.
 */
export default function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
