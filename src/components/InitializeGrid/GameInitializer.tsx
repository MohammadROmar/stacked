import Grid from './Grid';
import Input from './Input';
import { generateInitialGrid } from '../../utils/generate-initial-grid';
import type { GameInitializerProps } from '../../types/game-initializer';

export default function GameInitializer({
  gameData,
  selectedColor,
  changeGameData,
}: GameInitializerProps) {
  const { rows, cols } = gameData;

  return (
    <>
      <p className="text-xl">Grid Size</p>

      <div className="flex items-center justify-center gap-1 mb-2">
        <Input
          id="rows"
          value={rows.toString()}
          onChange={(newValue) =>
            changeGameData((oldData) => ({
              ...oldData,
              grid: generateInitialGrid(newValue, oldData.cols),
              rows: newValue,
            }))
          }
        />

        <p className="text-xl text-white/60">x</p>

        <Input
          id="columns"
          value={cols.toString()}
          onChange={(newValue) =>
            changeGameData((oldData) => ({
              ...oldData,
              grid: generateInitialGrid(oldData.rows, newValue),
              cols: newValue,
            }))
          }
        />
      </div>

      <Grid
        gameData={gameData}
        changeGameData={changeGameData}
        selectedColor={selectedColor!}
      />
    </>
  );
}
