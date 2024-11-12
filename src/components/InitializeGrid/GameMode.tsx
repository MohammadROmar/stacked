import { GAME_MODS } from '../../data/game-modes';
import type { GameMode as tGameMode } from '../../types/game-mode';

type GameModeProps = {
  gameMode: tGameMode;
  setGameMode: (newMode: tGameMode) => void;
};

export default function GameMode({ gameMode, setGameMode }: GameModeProps) {
  return (
    <>
      <h2>Mode:</h2>
      <ul className="flex items-center flex-wrap gap-2">
        {GAME_MODS.map(({ gameMode: mode, description }) => (
          <li key={mode}>
            <button
              className={`button animate-none transition-all duration-300 ${
                gameMode === mode ? 'bg-white text-black/70' : 'hover:scale-105'
              }`}
              onClick={() => setGameMode(mode)}
            >
              {description}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
