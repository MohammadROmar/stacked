import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

type ModalProps = {
  children: ReactNode;
};

export default function Modal({ children }: ModalProps) {
  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full bg-black/60 fixed top-0 left-0 z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="p-4 rounded-lg font-river-adventurer text-white bg-[#176ac3]/80 w-[85%] max-w-lg flex flex-col justify-center items-center absolute z-20"
        style={{ x: '-50%', y: '-50%', top: '50%', left: '50%' }}
      >
        {children}
      </motion.div>
    </>,
    document.getElementById('modal')!
  );
}
