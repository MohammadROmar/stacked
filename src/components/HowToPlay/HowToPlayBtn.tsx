import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';

import Text from './Text';
import InfoIcon from '../../assets/icons/Info';
const HowToPlayModal = lazy(() => import('./HowToPlayModal'));

export default function HowToPlayBtn() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        <Suspense>
          {modalIsOpen && <HowToPlayModal setIsOpen={setModalIsOpen} />}
        </Suspense>
      </AnimatePresence>

      <section className="section w-auto p-0 rounded-full fixed bottom-4 left-4">
        <button
          onClick={() => setModalIsOpen(true)}
          className="flex justify-center gap-1"
        >
          <div className="p-2">
            <InfoIcon />
          </div>

          <Text />
        </button>
      </section>
    </>
  );
}
