import { motion } from 'framer-motion';

import { getImageName } from '../../utils/get-image-name';
import type { Game, Symbol } from '../../types/game';
import type { Dispatch, SetStateAction } from 'react';
import { gameGridItamVariants } from '../../animation/variants/game-grid-itam';
import { staggeredListAnimation } from '../../animation/staggered-list';

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
  const { cols, grid } = gameData;

  return (
    <motion.ul
      {...staggeredListAnimation}
      className="game-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {...grid.map((rows, i) =>
        rows.map((item, j) => {
          const imageName = getImageName(item);

          return (
            <motion.li
              variants={gameGridItamVariants}
              key={`${i} ${j} ${item}`}
              onClick={() => {
                const newGrid = [...grid];
                newGrid[i][j] = selectedColor;

                changeGameData((oldData) => ({ ...oldData, grid: newGrid }));
              }}
            >
              <img
                src={`/src/assets/images/colors/${imageName}.png`}
                className="w-full aspect-square object-cover object-center"
              />
            </motion.li>
          );
        })
      )}
    </motion.ul>
  );
}
