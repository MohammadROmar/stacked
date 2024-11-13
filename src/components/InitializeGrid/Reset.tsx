import { useGameDispatch } from '../../store/hooks';
import { setInitialGame } from '../../store/slices/initial-game';
import { generateInitialGrid } from '../../utils/generate-initial-grid';

export default function ResetBtn() {
  const dispatch = useGameDispatch();

  return (
    <section className="section absolute top-4 right-4 w-auto p-0">
      <button
        onClick={() =>
          dispatch(
            setInitialGame({
              rows: 4,
              cols: 4,
              grid: generateInitialGrid(4, 4),
            })
          )
        }
        className="p-2"
      >
        Reset
      </button>
    </section>
  );
}
