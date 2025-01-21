import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import MergeEffect from './MergeEffect';
import { getImageName } from '../../utils/get-image-name';
import { cellsImages } from '../../assets/images/colors';
import { handleMove } from '../../utils/handle-move';
import type { Cell } from '../../models/cell';
import type { Grid } from '../../models/grid';
import type { MovementDirection } from '../../models/movement-direction';

type AnimatedCellProps = {
  cell: Cell;
  grid: Grid;
  prevGrid: Grid | undefined;
  moveDirection: MovementDirection | undefined;
};

function Cell({ cell, grid, prevGrid, moveDirection }: AnimatedCellProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [didMerge, setDidMerge] = useState(false);

  const { x, y, symbol } = cell;
  const imageName = getImageName(symbol);

  useEffect(() => {
    if (!moveDirection) {
      setOffset({ x: 0, y: 0 });
    }

    const { offsetX, offsetY, merged } = handleMove(
      { x: x + offset.y, y: y + offset.x, symbol },
      { grid, prevGrid, moveDirection }
    );

    setOffset((prevOffset) => ({
      x: prevOffset.x + offsetX,
      y: prevOffset.y + offsetY,
    }));

    if (merged) {
      setDidMerge(true);
    }
  }, [moveDirection]);

  return (
    <motion.li
      animate={{ x: `${offset.x * 100}%`, y: `${offset.y * 100}%` }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="p-0.5 relative"
    >
      <MergeEffect
        symbol={symbol}
        isVisible={didMerge}
        setIsVisible={setDidMerge}
      />

      <img
        src={cellsImages[imageName]}
        className={`w-full aspect-square object-cover object-center ${
          symbol === '.' || symbol === '#' ? 'opacity-0' : ''
        }`}
      />
    </motion.li>
  );
}

export default Cell;
