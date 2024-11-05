import Title from '../components/Title';
import type { Page } from '../types/page';

type StartPageProps = {
  setPage(page: Page): void;
};

export default function StartPage({ setPage }: StartPageProps) {
  return (
    <section className="section m-auto flex flex-col items-center justify-center">
      <Title />
      <button onClick={() => setPage('INITIALIZE')} className="button">
        Start Playing!
      </button>
    </section>
  );
}
