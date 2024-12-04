import { useGameSelector } from '../../store/hooks';
import { cellsImages } from '../../assets/images/colors';

export default function EmptyGrid() {
  const { cols, grid } = useGameSelector((state) => state.initialGame.data);

  return (
    <ul
      className="game-grid gap-0"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {grid.map((cells, i) =>
        cells.map((cell, j) => (
          <li key={i + ' ' + j + ' ' + cell}>
            <img
              src={
                cell === '#' ? cellsImages['obstacle'] : cellsImages['empty']
              }
              className="w-full aspect-square object-cover object-center p-0.5"
            />
          </li>
        ))
      )}
    </ul>
  );
}
