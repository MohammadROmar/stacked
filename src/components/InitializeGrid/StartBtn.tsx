import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useGameDispatch, useGameSelector } from '../../store/hooks';
import ErrorModal from '../ErrorModal';
import { setPage } from '../../store/slices/page';
import { isEmptyGrid } from '../../utils/is-empty-grid';

export default function StartBtn() {
  const dispatch = useGameDispatch();
  const initialGameData = useGameSelector((state) => state.initialGame.data);

  const [error, setError] = useState<string>();

  function handleGridSubmit() {
    if (initialGameData.rows <= 0 || initialGameData.cols <= 0) {
      setError('Grid must have rows and columns.');
    } else if (isEmptyGrid(initialGameData)) {
      setError('Grid must contain colors.');
    } // TODO: Check color cells number.
    else {
      dispatch(setPage('GAME'));
    }
  }

  return (
    <>
      <AnimatePresence>
        {error && (
          <ErrorModal error={error} onClose={() => setError(undefined)} />
        )}
      </AnimatePresence>

      <button onClick={handleGridSubmit} className="button w-full mt-2">
        Start!
      </button>
    </>
  );
}
