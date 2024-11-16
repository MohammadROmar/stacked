import Modal from '../Modal';
import Goal from './Goal';
import Controls from './Controls';

type HowToPlayModalProps = {
  setIsOpen(isOpen: boolean): void;
};

export default function HowToPlayModal({ setIsOpen }: HowToPlayModalProps) {
  return (
    <Modal>
      <h2 className="text-2xl text-[#a2d018]">How To Play</h2>

      <Goal />

      <Controls />

      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className="button animate-none self-end"
      >
        Close
      </button>
    </Modal>
  );
}
