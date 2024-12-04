import { motion } from 'framer-motion';

import { useGameDispatch } from '../store/hooks';
import { setPage } from '../store/slices/page';

export default function Tiltle() {
  const dispatch = useGameDispatch();

  return (
    <motion.h1
      layoutId="title"
      className="text-4xl mb-2 drop-shadow-md cursor-pointer"
      onClick={() => dispatch(setPage('START'))}
    >
      <span className="text-[#eb584d]">S</span>
      <span className="text-[#176ac3]">T</span>
      <span className="text-[#ff8345]">A</span>
      <span className="text-[#a2d018]">C</span>
      <span className="text-[#9c3fd1]">K</span>
      <span className="text-[#37a3d7]">E</span>
      <span className="text-[#5ed44e]">D</span>
    </motion.h1>
  );
}
