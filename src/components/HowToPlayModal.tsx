import Modal from './Modal';

type HowToPlayModalProps = {
  setIsOpen(isOpen: boolean): void;
};

export default function HowToPlayModal({ setIsOpen }: HowToPlayModalProps) {
  return (
    <Modal>
      <h2 className="text-2xl">How To Play</h2>
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
