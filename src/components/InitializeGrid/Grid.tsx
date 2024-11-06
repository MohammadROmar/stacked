import type { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';

import { cellsImages } from '../../assets/images/colors';
import { getImageName } from '../../utils/get-image-name';
import { gameCellVariants } from '../../animation/variants/game-cell';
import { staggeredListAnimation } from '../../animation/staggered-list';
import type { Game, Symbol } from '../../types/game';

type InitGridProps = {
  gameData: Game;
  changeGameData: Dispatch<SetStateAction<Game>>;
  selectedColor: Symbol;
};

export default function Grid({
  gameData,
  changeGameData,
  selectedColor,
}: InitGridProps) {
  const { rows, cols, grid } = gameData;

  return (
    <motion.ul
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
                const newGrid = [...grid];
                newGrid[i][j] = selectedColor;

                changeGameData((oldData) => ({ ...oldData, grid: newGrid }));
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
