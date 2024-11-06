import { motion } from 'framer-motion';
import img from '../../assets/images/colors/blue.png';

import { getImageName } from '../../utils/get-image-name';
import { gameCellVariants } from '../../animation/variants/game-cell';
import { cellsImages } from '../../assets/images/colors';
import type { Symbol } from '../../types/game';

type CellProps = {
  item: Symbol;
};

export default function Cell({ item }: CellProps) {
  console.log(img);

  const imageName = getImageName(item);

  return (
    <motion.li variants={gameCellVariants} transition={{ duration: 0.2 }}>
      <img
        src={cellsImages[imageName]}
        className="w-full aspect-square object-cover object-center"
      />
    </motion.li>
  );
}
