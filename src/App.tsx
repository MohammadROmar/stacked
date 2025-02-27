import { lazy, Suspense } from 'react';

import { useGameSelector } from './store/hooks';
import StartPage from './pages/Start';
import HowToPlayBtn from './components/HowToPlay//HowToPlayBtn';
import LoadingIndicator from './components/LoadingIndicator';

const GamePage = lazy(() => import('./pages/Game'));
const InitializeGridPage = lazy(() => import('./pages/InitializeGrid'));

function App() {
  const page = useGameSelector((state) => state.page.data);

  return (
    <main className="min-h-screen bg-[url(./assets/images/background.jpg)] bg-center bg-cover bg-no-repeat bg-clip-border flex justify-center items-center p-8 py-20 text-white font-river-adventurer overflow-x-hidden">
      {page === 'START' && <StartPage />}
      <Suspense fallback={<LoadingIndicator />}>
        {page === 'INITIALIZE' && <InitializeGridPage />}
        {page === 'GAME' && <GamePage />}
      </Suspense>

      <HowToPlayBtn />
    </main>
  );
}

export default App;
