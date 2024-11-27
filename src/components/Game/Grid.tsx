import { motion } from 'framer-motion';

import { useGameSelector } from '../../store/hooks';
import Cell from './Cell';
import { staggeredListAnimation } from '../../animation/staggered-list';
import type { Grid } from '../../types/game';

export default function GameGrid({ grid }: { grid: Grid }) {
  const cols = useGameSelector((state) => state.initialGame.data.cols);

  return (
    <motion.ul
      {...staggeredListAnimation}
      className="game-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {grid.map((gridItems, i) =>
        gridItems.map((item, j) => (
          <Cell key={i + '' + j + '' + item} item={item} />
        ))
      )}
    </motion.ul>
  );
}
