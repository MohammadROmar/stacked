import { useGameSelector } from '../../store/hooks';
import Info from './Info';
import { getCostName } from '../../utils/get-cost-name';
import type { GameState } from '../../types/game-state';

export default function SolveInfo({ gameState }: { gameState: GameState }) {
  const { cost, moves, time, totalVisitedStates } = gameState;

  const solveMethod = useGameSelector((state) => state.mode.data);

  return (
    <div className="flex justify-center items-center flex-wrap gap-4">
      <Info info="Moves" value={moves} />
      {cost !== undefined && (
        <Info info={getCostName(solveMethod)} value={cost} />
      )}
      {totalVisitedStates && (
        <Info info="Total visited states" value={totalVisitedStates} />
      )}
      {time !== undefined && <Info info="solve time" value={`${time} ms`} />}
    </div>
  );
}
