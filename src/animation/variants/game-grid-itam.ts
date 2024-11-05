import type { Variants } from 'framer-motion';

export const gameGridItamVariants: Variants = {
  initial: {
    opacity: 0,
    rotate: '45deg',
    scale: 1.2,
  },
  animate: {
    opacity: 1,
    rotate: '0deg',
    scale: 1,
  },
};
