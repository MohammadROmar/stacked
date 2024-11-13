import { Game } from './game/game';
import { Queue } from './data-structure/queue';
import type { GameGrid } from '../types/game';
import { Stack } from './data-structure/stack';

export class GameSolver {
  private game: Game;

  private updateGrid: (grid: GameGrid) => void;
  private didWin: (didWin: boolean) => void;
  private solveAlgorithm: 'BFS' | 'DFS';

  private visited: GameGrid[];
  private allStates: { from: Game | undefined; game: Game }[];

  constructor(
    game: Game,
    solveAlgorithm: 'BFS' | 'DFS',
    updateGrid: (grid: GameGrid) => void,
    didWin: (didWin: boolean) => void
  ) {
    this.game = game;
    this.solveAlgorithm = solveAlgorithm;
    this.updateGrid = updateGrid;
    this.didWin = didWin;

    this.visited = [];
    this.allStates = [];

    if (this.solveAlgorithm === 'BFS') {
      this.solveBFS();
    } else {
      this.solveDFS();
    }
  }

  solveBFS() {
    this.visited = [];
    this.allStates = [];

    const queue = new Queue<Game>();

    queue.enqueue(this.game);
    this.visited.push(this.game.grid);
    this.allStates.push({ from: undefined, game: this.game });

    while (!queue.isEmpty()) {
      const currentState = queue.dequeue();

      const movementStates = this.game.getPossibleStates(currentState!);

      for (const state of movementStates) {
        if (!this.isVisited(state)) {
          this.allStates.push({ from: currentState, game: state });

          if (state.didWin()) {
            const path = this.getPath(state);
            this.updateUI(path);

            return;
          }

          this.visited.push(state.grid);
          queue.enqueue(state);
        }
      }
    }

    // If we iterate through every possible state and we reached here
    // it means the game could not be solved.
    throw new Error('Could not find a solution for the given grid.');
  }

  solveDFS() {
    this.visited = [];
    this.allStates = [];

    const stack = new Stack<Game>();

    stack.push(this.game);
    this.visited.push(this.game.grid);
    this.allStates.push({ from: undefined, game: this.game });

    while (!stack.isEmpty()) {
      const currentState = stack.pop();

      const movementStates = this.game.getPossibleStates(currentState!);

      for (const state of movementStates) {
        if (!this.isVisited(state)) {
          this.allStates.push({ from: currentState, game: state });

          if (state.didWin()) {
            const path = this.getPath(state);
            this.updateUI(path);

            return;
          }

          stack.push(state);
          this.visited.push(state.grid);
        }
      }
    }

    throw new Error('Could not find a solution');
  }

  isVisited(game: Game) {
    for (const visitedState of this.visited) {
      if (game.checkGridEquality(game.grid, visitedState)) {
        return true;
      }
    }

    return false;
  }

  getPath(winningState: Game) {
    let currState: Game | undefined = winningState;

    const path: Game[] = [];

    while (currState) {
      path.push(currState);

      currState = this.allStates.find(
        (state) => state.game === currState
      )?.from;
    }

    return path.reverse();
  }

  async updateUI(path: Game[]) {
    for (const state of path) {
      this.updateGrid(state.copyCurrentState().grid);
      if (state.didWin()) {
        this.didWin(true);
        return;
      }

      // Add a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
