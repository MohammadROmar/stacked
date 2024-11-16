import { useGameDispatch } from '../../store/hooks';
import Modal from '../Modal';
import { setPage } from '../../store/slices/page';

export default function WinningModal({ moves }: { moves: number }) {
  const dispatch = useGameDispatch();

  return (
    <Modal>
      <h2 className="text-2xl mb-2 text-[#a2d018]">You Won!</h2>
      <p className="p-2">
        It took you {moves} {moves > 1 ? 'moves' : 'move'} to win!
      </p>
      <button onClick={() => dispatch(setPage('START'))} className="button">
        Back to start
      </button>
    </Modal>
  );
}
