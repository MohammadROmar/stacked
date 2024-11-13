import { GAME_MODS } from '../../data/game-modes';
import { useGameDispatch, useGameSelector } from '../../store/hooks';
import { setMode } from '../../store/slices/mode';

export default function GameMode() {
  const dispatch = useGameDispatch();
  const gameMode = useGameSelector((state) => state.mode.data);

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
              onClick={() => dispatch(setMode(mode))}
            >
              {description}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
