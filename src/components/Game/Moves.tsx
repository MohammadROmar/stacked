import { motion } from 'framer-motion';

export default function Moves({ moves }: { moves: number }) {
  return (
    <div className="pt-4 text-lg flex">
      <p className="px-1">Moves:</p>
      <motion.p key={moves} initial={{ y: -20 }} animate={{ y: 0 }}>
        {moves}
      </motion.p>
    </div>
  );
}
