import { useGameDispatch } from '../store/hooks';
import Title from '../components/Title';
import { setPage } from '../store/slices/page';

export default function StartPage() {
  const dispatch = useGameDispatch();

  return (
    <section className="section m-auto flex flex-col items-center justify-center">
      <Title />
      <button
        onClick={() => dispatch(setPage('INITIALIZE'))}
        className="button"
      >
        Start Playing!
      </button>
    </section>
  );
}
