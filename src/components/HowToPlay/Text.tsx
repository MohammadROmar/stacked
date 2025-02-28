import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Text() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    setTimeout(() => {
      setIsVisible(false);
    }, 20000);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          exit={{ width: 0, opacity: 0, transition: { delay: 0.25 } }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.25 } }}
            exit={{ opacity: 0 }}
            className="whitespace-nowrap mr-4 py-2"
          >
            How To Play
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
