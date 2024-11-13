import { useGameDispatch, useGameSelector } from '../../store/hooks';
import Grid from './Grid';
import Input from './Input';
import { generateInitialGrid } from '../../utils/generate-initial-grid';
import type { GameInitializerProps } from '../../types/game-initializer';
import { setInitialGame } from '../../store/slices/initial-game';

export default function GameInitializer({
  selectedColor,
}: GameInitializerProps) {
  const dispatch = useGameDispatch();
  const gameData = useGameSelector((state) => state.initialGame.data);

  return (
    <>
      <p className="text-xl">Grid Size</p>

      <div className="flex items-center justify-center gap-1 mb-2">
        <Input
          id="rows"
          value={gameData.rows.toString()}
          onChange={(newValue) =>
            dispatch(
              setInitialGame({
                ...gameData,
                grid: generateInitialGrid(newValue, gameData.cols),
                rows: newValue,
              })
            )
          }
        />

        <p className="text-xl text-white/60">x</p>

        <Input
          id="columns"
          value={gameData.cols.toString()}
          onChange={(newValue) =>
            dispatch(
              setInitialGame({
                ...gameData,
                grid: generateInitialGrid(gameData.rows, newValue),
                cols: newValue,
              })
            )
          }
        />
      </div>

      <Grid selectedColor={selectedColor!} />
    </>
  );
}
