import { useGameSelector } from './store/hooks';
import StartPage from './pages/Start';
import InitializeGridPage from './pages/InitializeGrid';
import GamePage from './pages/Game';
import HowToPlayBtn from './components/HowToPlayBtn';

function App() {
  const page = useGameSelector((state) => state.page.data);

  return (
    <main className="min-h-screen bg-[url(./assets/images/background.jpg)] bg-center bg-cover bg-no-repeat bg-clip-border flex justify-center items-center p-8 text-white font-river-adventurer overflow-x-hidden">
      {page === 'START' && <StartPage />}
      {page === 'INITIALIZE' && <InitializeGridPage />}
      {page === 'GAME' && <GamePage />}

      <HowToPlayBtn />
    </main>
  );
}

export default App;
