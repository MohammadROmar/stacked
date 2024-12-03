import { useGameSelector } from '../../store/hooks';
import EmptyGrid from './EmptyGrid';
import Cell from './Cell';
import type { Grid } from '../../types/grid';
import type { MovementDirection } from '../../types/movement-direction';

type AnimatedGridProps = {
  grid: Grid;
  prevGrid: Grid | undefined;
  moveDirection: MovementDirection | undefined;
};

function Grid({ grid: currGrid, prevGrid, moveDirection }: AnimatedGridProps) {
  const { grid, cols } = useGameSelector((state) => state.initialGame.data);

  return (
    <div className="relative">
      <EmptyGrid />

      <ul
        className="game-grid gap-0 bg-transparent absolute inset-0"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {grid.map((symbols, i) =>
          symbols.map((symbol, j) => (
            <Cell
              key={i + '' + j + '' + symbol}
              cell={{ x: i, y: j, symbol }}
              grid={currGrid}
              prevGrid={prevGrid}
              moveDirection={moveDirection}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default Grid;
