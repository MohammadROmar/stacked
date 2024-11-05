import { useState } from 'react';

import StartPage from './pages/Start';
import InitializeGridPage from './pages/InitializeGrid';
import GamePage from './pages/Game';
import { generateInitialGrid } from './utils/generate-initial-grid';
import type { Page } from './types/page';
import type { Game } from './types/game';

function App() {
  const [page, setPage] = useState<Page>('START');
  const [initialGameData, setInitialGameData] = useState<Game>({
    rows: 4,
    cols: 4,
    grid: generateInitialGrid(4, 4),
  });

  return (
    <main className="h-[100dvh] bg-[url(./assets/images/background.jpg)] bg-center bg-cover bg-no-repeat bg-clip-border flex justify-center items-center p-8 text-white font-river-adventurer">
      {page === 'START' && <StartPage setPage={setPage} />}
      {page === 'INITIALIZE' && (
        <InitializeGridPage
          gameData={initialGameData}
          changeGameData={setInitialGameData}
          setPage={setPage}
        />
      )}
      {page === 'GAME' && <GamePage gameData={initialGameData} />}
      <section className="section w-auto p-2 rounded-full absolute bottom-4 left-4">
        <button>How To Play</button>
      </section>
    </main>
  );
}

export default App;
