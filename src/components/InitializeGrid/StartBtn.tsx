import { useState } from 'react';

import type { Game } from '../../types/game';
import type { Page } from '../../types/page';
import Modal from '../Modal';
import { isEmptyGrid } from '../../utils/is-empty-grid';
import { AnimatePresence } from 'framer-motion';

type StartBtnProps = {
  gameData: Game;
  setPage(newPage: Page): void;
};

export default function StartBtn({ gameData, setPage }: StartBtnProps) {
  const [error, setError] = useState<string | null>();

  const { rows, cols } = gameData;

  function handleGridSubmit() {
    if (rows <= 0 || cols <= 0) {
      setError('Grid must have rows and columns.');
    } else if (isEmptyGrid(gameData)) {
      setError('Grid must contain colors.');
    } else {
      setPage('GAME');
    }
  }

  return (
    <>
      <AnimatePresence>
        {error && (
          <Modal>
            <h2 className="mb-4 text-red-400 text-2xl">Error!</h2>
            <p className="mb-2">{error}</p>
            <button
              onClick={() => setError(null)}
              className="button animate-none self-end"
            >
              Close
            </button>
          </Modal>
        )}
      </AnimatePresence>

      <button onClick={handleGridSubmit} className="button w-full mt-2">
        Start!
      </button>
    </>
  );
}
