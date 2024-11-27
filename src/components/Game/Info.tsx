import { motion } from 'framer-motion';

type InfoProps = {
  info: string;
  value: number | string;
};

export default function Info({ info, value }: InfoProps) {
  return (
    <div className="pt-4 text-lg flex">
      <p className="px-2">{info}:</p>
      <motion.p key={value} initial={{ y: -20 }} animate={{ y: 0 }}>
        {value}
      </motion.p>
    </div>
  );
}
