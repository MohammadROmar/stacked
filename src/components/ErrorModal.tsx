import Modal from './Modal';

type ErrorModalProps = {
  error: string;
  onClose: (value: unknown) => void;
};

export default function ErrorModal({ error, onClose }: ErrorModalProps) {
  return (
    <Modal>
      <h2 className="mb-2 text-red-400 text-2xl">Oops!</h2>
      <p className="mb-2">{error}</p>
      <button
        onClick={() => onClose(undefined)}
        className="button animate-none self-end"
      >
        Close
      </button>
    </Modal>
  );
}
