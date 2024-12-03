import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import InfoIcon from '../../assets/icons/Info';
import HowToPlayModal from './HowToPlayModal';

export default function HowToPlayBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    setTimeout(() => {
      setIsVisible(false);
    }, 20000);
  }, []);

  return (
    <>
      <AnimatePresence>
        {modalIsOpen && <HowToPlayModal setIsOpen={setModalIsOpen} />}
      </AnimatePresence>

      <section className="section w-auto p-0 rounded-full fixed bottom-4 left-4">
        <button
          onClick={() => setModalIsOpen(true)}
          className="flex justify-center gap-1"
        >
          <div className="p-2">
            <InfoIcon />
          </div>

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
        </button>
      </section>
    </>
  );
}
