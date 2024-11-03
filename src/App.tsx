import { Controls } from './classes/controls';
import { Game } from './classes/game';
import { initialGrid } from './data/dummy-grid';

function App() {
  const game = new Game(4, 4, initialGrid);
  game.printGrid();

  new Controls(game);

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
