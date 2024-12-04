import { useGameDispatch } from '../../store/hooks';
import { setInitialGame } from '../../store/slices/initial-game';
import { generateInitialGrid } from '../../utils/generate-initial-grid';

export default function ResetBtn() {
  const dispatch = useGameDispatch();

  function handleReset() {
    dispatch(
      setInitialGame({
        rows: 4,
        cols: 4,
        grid: generateInitialGrid(4, 4),
      })
    );
  }

  return (
    <section className="section absolute top-4 right-4 z-[5] w-auto p-0">
      <button onClick={handleReset} className="p-2">
        Reset
      </button>
    </section>
  );
}
