import { useGameDispatch } from '../../store/hooks';
import { setPage } from '../../store/slices/page';

export default function Restart() {
  const dispatch = useGameDispatch();

  return (
    <section className="section w-auto absolute top-4 right-4 p-0 rounded-full">
      <button onClick={() => dispatch(setPage('INITIALIZE'))} className="p-2">
        Restart
      </button>
    </section>
  );
}
