import { useGameDispatch } from '../store/hooks';
import Modal from './Modal';
import { setPage } from '../store/slices/page';

type ErrorModalProps = {
  error: string;
  onClose?(value: unknown): void;
};

export default function ErrorModal({ error, onClose }: ErrorModalProps) {
  const dispatch = useGameDispatch();

  return (
    <Modal>
      <h2 className="mb-2 text-red-400 text-2xl">Oops!</h2>
      <p className="mb-2">{error}</p>
      <button
        onClick={() =>
          onClose ? onClose(undefined) : dispatch(setPage('START'))
        }
        className="button animate-none self-end"
      >
        Close
      </button>
    </Modal>
  );
}
