'use client';

import { domMax, LazyMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

/**
 * Framer Motion Provider
 */
export default function MotionProvider({ children }: PropsWithChildren) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
