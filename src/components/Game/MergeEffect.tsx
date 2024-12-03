import { motion, AnimatePresence } from 'framer-motion';

import sparcklesImg from '../../assets/images/effect.png';

type MergeEffectProps = {
  isVisible: boolean;
  setIsVisible(isVisible: boolean): void;
};

function MergeEffect({ isVisible, setIsVisible }: MergeEffectProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.img
          src={sparcklesImg}
          alt="Sparckles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 2.4 }}
          exit={{ scale: 2, opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.75, type: 'spring' }}
          onAnimationComplete={() => setIsVisible(false)}
          className="absolute inset-0"
        />
      )}
    </AnimatePresence>
  );
}

export default MergeEffect;
