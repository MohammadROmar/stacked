import { useGameDispatch } from '../../store/hooks';
import Modal from '../Modal';
import { setPage } from '../../store/slices/page';

export default function WinningModal() {
  const dispatch = useGameDispatch();

  return (
    <Modal>
      <h2 className="text-2xl mb-2">You Won!</h2>
      <button onClick={() => dispatch(setPage('START'))} className="button">
        Back to start
      </button>
    </Modal>
  );
}
