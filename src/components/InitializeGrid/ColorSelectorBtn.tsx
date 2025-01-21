import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import ColorsModal from './ColorSelectorModal';
import type { Symbol } from '../../models/symbol';

export type ColorsSelectorProps = {
  setSelectedColor(newColor: Symbol): void;
};

export default function ColorSelectorBtn({
  setSelectedColor,
}: ColorsSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ColorsModal
            setSelectedColor={setSelectedColor}
            setIsOpen={setIsOpen}
          />
        )}
      </AnimatePresence>

      <section className="fixed bottom-4 right-4 m-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="section rounded-full p-2"
        >
          Select Color
        </button>
      </section>
    </>
  );
}
