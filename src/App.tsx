import { useEffect, useState } from 'react';

import StartPage from './pages/Start';
import InitializeGridPage from './pages/InitializeGrid';
import GamePage from './pages/Game';
import HowToPlayBtn from './components/HowToPlayBtn';
import { generateInitialGrid } from './utils/generate-initial-grid';
import type { Page } from './types/page';
import type { Game } from './types/game';
import type { GameMode } from './types/game-mode';

function App() {
  const [page, setPage] = useState<Page>('START');
  const [initialGameData, setInitialGameData] = useState<Game>({
    rows: 4,
    cols: 4,
    grid: generateInitialGrid(4, 4),
  });
  const [gameMode, setGameMode] = useState<GameMode>('BFS');

  useEffect(() => {
    if (page === 'INITIALIZE') {
      setInitialGameData((oldGrid) => ({
        ...oldGrid,
        grid: generateInitialGrid(4, 4),
      }));
    }
  }, [page]);

  return (
    <main className="min-h-screen bg-[url(./assets/images/background.jpg)] bg-center bg-cover bg-no-repeat bg-clip-border flex justify-center items-center p-8 text-white font-river-adventurer overflow-x-hidden">
      {page === 'START' && <StartPage setPage={setPage} />}
      {page === 'INITIALIZE' && (
        <InitializeGridPage
          gameData={initialGameData}
          changeGameData={setInitialGameData}
          gameMode={gameMode}
          setGameMode={setGameMode}
          setPage={setPage}
        />
      )}
      {page === 'GAME' && (
        <GamePage
          gameData={initialGameData}
          solveMethod={gameMode}
          setPage={setPage}
        />
      )}

      <HowToPlayBtn />
    </main>
  );
}

export default App;
