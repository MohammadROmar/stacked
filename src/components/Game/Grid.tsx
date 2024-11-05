import { motion } from 'framer-motion';

import { staggeredListAnimation } from '../../animation/staggered-list';
import type { GameGrid as tGameGrid } from '../../types/game';
import Cell from './Cell';

type GameGridProps = {
  cols: number;
  grid: tGameGrid;
};

export default function GameGrid({ cols, grid }: GameGridProps) {
  return (
    <motion.ul
      {...staggeredListAnimation}
      className="game-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {grid.map((gridItems, i) =>
        gridItems.map((item, j) => <Cell key={i + '' + j} item={item} />)
      )}
    </motion.ul>
  );
}
