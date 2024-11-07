import type { Page } from '../../types/page';
import Modal from '../Modal';

export default function WinningModal({
  setPage,
}: {
  setPage(newPage: Page): void;
}) {
  return (
    <Modal>
      <h2 className="text-2xl mb-2">You Won!</h2>
      <button onClick={() => setPage('START')} className="button">
        Back to start
      </button>
    </Modal>
  );
}
