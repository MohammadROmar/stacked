import { motion } from 'framer-motion';

import { getImageName } from '../../utils/get-image-name';
import { gameCellVariants } from '../../animation/variants/game-cell';
import type { Symbol } from '../../types/game';

type CellProps = {
  item: Symbol;
};

export default function Cell({ item }: CellProps) {
  const imageName = getImageName(item);

  return (
    <motion.li variants={gameCellVariants} transition={{ duration: 0.2 }}>
      <img
        src={`/src/assets/images/colors/${imageName}.png`}
        className="w-full aspect-square object-cover object-center"
      />
    </motion.li>
  );
}
