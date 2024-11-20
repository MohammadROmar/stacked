import { useGameDispatch, useGameSelector } from '../../store/hooks';
import Modal from '../Modal';
import { setPage } from '../../store/slices/page';

type WinningModalProps = {
  moves: number;
  cost: number | undefined;
};

export default function WinningModal({ moves, cost }: WinningModalProps) {
  const dispatch = useGameDispatch();
  const solveMethod = useGameSelector((state) => state.mode.data);

  return (
    <Modal>
      <h2 className="text-2xl mb-2 text-[#a2d018]">You Won!</h2>
      <p className="p-2">
        It took {solveMethod === 'USER' ? 'you' : ''} {moves}
        {moves > 1 ? ' moves' : ' move'}
        {cost !== undefined
          ? ` and ${cost} ${solveMethod === 'A*' ? 'A* score' : 'cost'}`
          : ' '}{' '}
        to win!
      </p>
      <button onClick={() => dispatch(setPage('START'))} className="button">
        Back to start
      </button>
    </Modal>
  );
}
