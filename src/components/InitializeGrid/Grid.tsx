import { motion } from 'framer-motion';

import { useGameDispatch, useGameSelector } from '../../store/hooks';
import { cellsImages } from '../../assets/images/colors';
import { getImageName } from '../../utils/get-image-name';
import { gameCellVariants } from '../../animation/variants/game-cell';
import { staggeredListAnimation } from '../../animation/staggered-list';
import { setInitialGame } from '../../store/slices/initial-game';
import { copyGrid } from '../../utils/copy-grid';
import type { Symbol } from '../../types/symbol';

type InitGridProps = {
  selectedColor: Symbol;
};

export default function Grid({ selectedColor }: InitGridProps) {
  const dispatch = useGameDispatch();
  const gameData = useGameSelector((state) => state.initialGame.data);
  const { rows, cols, grid } = gameData;

  return (
    <motion.ul
      layoutId="grid"
      key={rows + '' + cols}
      {...staggeredListAnimation}
      className="game-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {...grid.map((rows, i) =>
        rows.map((symbol, j) => {
          return (
            <motion.li
              variants={gameCellVariants}
              key={`${i} ${j} ${symbol}`}
              onClick={() => {
                const newGrid = copyGrid(grid);
                newGrid[i][j] = selectedColor;

                dispatch(setInitialGame({ ...gameData, grid: newGrid }));
              }}
            >
              <img
                src={cellsImages[getImageName(symbol)]}
                className="w-full aspect-square object-cover object-center"
              />
            </motion.li>
          );
        })
      )}
    </motion.ul>
  );
}
