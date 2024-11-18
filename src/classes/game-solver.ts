import type { Dispatch, SetStateAction } from 'react';

import { Game } from './game/game';
import { Queue } from './data-structure/queue';
import type { GameGrid, Symbol } from '../types/game';
import { Stack } from './data-structure/stack';
import { HashTable } from './data-structure/has-table';

export class GameSolver {
  private game: Game;

  private updateGrid: Dispatch<SetStateAction<GameGrid>>;
  private didWin: (didWin: boolean) => void;
  private solveAlgorithm: 'BFS' | 'DFS' | 'Recursive DFS';

  private visited: HashTable<Symbol[][]>;
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

    this.visited = new HashTable<Symbol[][]>();
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

  private solveBFS() {
    this.reset();

    const queue = new Queue<Game>();

    queue.enqueue(this.game);
    this.visited.insert(this.game.getGrid());
    this.allStates.push({ from: undefined, game: this.game });

    while (!queue.isEmpty()) {
      const currentState = queue.dequeue();

      const movementStates = this.game.getPossibleStates(currentState!);

      for (const state of movementStates) {
        const isVisited = this.visited.get(state.getGrid());
        if (!isVisited) {
          this.allStates.push({ from: currentState, game: state });

          if (state.didWin()) {
            const path = this.getPath(state);
            this.updateUI(path);

            return;
          }

          this.visited.insert(state.getGrid());
          queue.enqueue(state);
        }
      }
    }

    // If we iterate through every possible state and we reached here
    // it means the game could not be solved.
    throw new Error('Could not find a solution for the given grid.');
  }

  private solveDFS() {
    this.reset();

    const stack = new Stack<Game>();

    stack.push(this.game);
    this.visited.insert(this.game.getGrid());
    this.allStates.push({ from: undefined, game: this.game });

    while (!stack.isEmpty()) {
      const currentState = stack.pop();

      const movementStates = this.game.getPossibleStates(currentState!);

      for (const state of movementStates) {
        const isVisited = this.visited.get(state.getGrid());
        if (!isVisited) {
          this.allStates.push({ from: currentState, game: state });

          if (state.didWin()) {
            const path = this.getPath(state);
            this.updateUI(path);

            return;
          }

          stack.push(state);
          this.visited.insert(state.getGrid());
        }
      }
    }

    throw new Error('Could not find a solution');
  }

  private solveDFSRec(givenState: Game | undefined = undefined): boolean {
    if (givenState?.didWin()) {
      const path = this.getPath(givenState);
      this.updateUI(path);

      return true;
    }

    if (!givenState) {
      this.reset();

      givenState = this.game;
      this.allStates.push({ from: undefined, game: this.game });
    }

    const isVisited = this.visited.get(givenState.getGrid());
    if (!isVisited) {
      this.visited.insert(givenState.getGrid());

      const movementStates = givenState.getPossibleStates(givenState);
      for (const state of movementStates) {
        this.allStates.push({ from: givenState, game: state });
        const didWin = this.solveDFSRec(state);

        if (didWin) {
          return didWin;
        }
      }
    }

    return false;
  }

  private reset() {
    this.visited = new HashTable<Symbol[][]>();
    this.allStates = [];
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

  private async updateUI(path: Game[]) {
    for (const state of path) {
      await this.delay();

      this.updateGrid(({ moves }) => ({
        moves: moves + 1,
        cells: state.copyCurrentState().getGrid(),
      }));

      if (state.didWin()) {
        this.didWin(true);
        return;
      }
    }
  }

  private async delay() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
