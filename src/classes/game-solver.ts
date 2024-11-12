import { Game } from './game/game';
import { Queue } from './data-structure/queue';
import type { GameGrid } from '../types/game';
import { Stack } from './data-structure/stack';

export class GameSolver {
  private game: Game;

  private updateGrid: (grid: GameGrid) => void;
  private didWin: (didWin: boolean) => void;

  private visited: GameGrid[];
  private allStates: { from: Game | undefined; game: Game }[];

  constructor(
    game: Game,
    updateGrid: (grid: GameGrid) => void,
    didWin: (didWin: boolean) => void
  ) {
    this.game = game;
    this.updateGrid = updateGrid;
    this.didWin = didWin;

    this.visited = [];
    this.allStates = [];

    // console.log('BFS');
    // this.solveBFS();
    // console.log('---------------------------------------------------------');
    // console.log('DFS');
    // this.solveDFS();
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
            console.log(path.length);

            for (const state of path) {
              state.printGrid();
            }

            return;
          }

          this.visited.push(state.grid);
          queue.enqueue(state);
        }
      }
    }
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
            console.log(path.length);

            for (const state of path) {
              state.printGrid();
            }

            return;
          }

          stack.push(state);
          this.visited.push(state.grid);
        }
      }
    }
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

  async updateUI() {
    for (const state of this.allStates) {
      this.updateGrid(state.game.copyCurrentState().grid);

      // Add a delay
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    this.didWin(true);
  }
}
