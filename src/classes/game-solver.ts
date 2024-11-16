import type { Dispatch, SetStateAction } from 'react';

import { Game } from './game/game';
import { Queue } from './data-structure/queue';
import type { GameGrid, Grid } from '../types/game';
import { Stack } from './data-structure/stack';

export class GameSolver {
  private game: Game;

  private updateGrid: Dispatch<SetStateAction<GameGrid>>;
  private didWin: (didWin: boolean) => void;
  private solveAlgorithm: 'BFS' | 'DFS' | 'Recursive DFS';

  private visited: Grid[];
  private allStates: { from: Game | undefined; game: Game }[];

  constructor(
    game: Game,
    solveAlgorithm: 'BFS' | 'DFS' | 'Recursive DFS',
    updateGrid: Dispatch<SetStateAction<GameGrid>>,
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
    } else if (this.solveAlgorithm === 'DFS') {
      this.solveDFS();
    } else {
      const hasDFSSolution = this.solveDFSRec();

      if (!hasDFSSolution) {
        throw new Error('Could not find a solution for the given grid.');
      }
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

  solveDFSRec(givenState: Game | undefined = undefined): boolean {
    if (givenState?.didWin()) {
      const path = this.getPath(givenState);
      this.updateUI(path);

      return true;
    }

    const prevState = givenState;

    if (!givenState) {
      this.visited = [];
      this.allStates = [];

      givenState = this.game;
    }

    if (!this.isVisited(givenState)) {
      this.visited.push(givenState.grid);

      const movementStates = givenState.getPossibleStates(givenState);
      for (const state of movementStates) {
        this.allStates.push({ from: prevState, game: state });
        const didWin = this.solveDFSRec(state);

        if (didWin) {
          return didWin;
        }
      }
    }

    return false;
  }

  isVisited(game: Game) {
    for (const visitedState of this.visited) {
      if (game.checkGridEquality(game.grid, visitedState)) {
        return true;
      }
    }

    return false;
  }

  getPath(winningState: Game | undefined) {
    let currState: Game | undefined = winningState;

    const path: Game[] = [];

    while (currState) {
      path.push(currState);

      currState = this.allStates.find(
        (state) => state.game === currState
      )?.from;
    }

    return path.reverse().filter((_, i) => i !== 0);
  }

  async updateUI(path: Game[]) {
    for (const state of path) {
      await this.delay();

      this.updateGrid(({ moves }) => ({
        moves: moves + 1,
        cells: state.copyCurrentState().grid,
      }));

      if (state.didWin()) {
        this.didWin(true);
        return;
      }
    }
  }

  async delay() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
