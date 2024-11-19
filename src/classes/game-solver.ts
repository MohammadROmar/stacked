import type { Dispatch, SetStateAction } from 'react';

import { Game } from './game/game';
import { Queue } from './data-structure/queue';
import { Stack } from './data-structure/stack';
import { HashTable } from './data-structure/has-table';
import { PriorityQueue } from './data-structure/priority-queue';
import type { GameGrid, Grid } from '../types/game';

export class GameSolver {
  private game: Game;

  private updateGrid: Dispatch<SetStateAction<GameGrid>>;
  private didWin: (didWin: boolean) => void;
  private solveAlgorithm: 'BFS' | 'DFS' | 'Recursive DFS' | 'UCS';

  private visited: HashTable<Grid, Grid>;
  private allStates: Map<Game, Game | undefined>;

  constructor(
    game: Game,
    solveAlgorithm: 'BFS' | 'DFS' | 'Recursive DFS' | 'UCS',
    updateGrid: Dispatch<SetStateAction<GameGrid>>,
    didWin: (didWin: boolean) => void
  ) {
    this.game = game;
    this.solveAlgorithm = solveAlgorithm;
    this.updateGrid = updateGrid;
    this.didWin = didWin;

    this.visited = new HashTable<Grid, Grid>();
    this.allStates = new Map<Game, Game | undefined>();

    let hasSolution = false;
    if (this.solveAlgorithm === 'BFS') {
      hasSolution = this.solveBFS();
    } else if (this.solveAlgorithm === 'DFS') {
      hasSolution = this.solveDFS();
    } else if (solveAlgorithm === 'UCS') {
      hasSolution = this.solveUCS();
    } else {
      hasSolution = this.solveDFSRec();
    }

    if (!hasSolution) {
      throw new Error('Could not find a solution for the given grid.');
    }
  }

  private solveBFS() {
    this.reset();

    const queue = new Queue<Game>();

    queue.enqueue(this.game);
    const initialGrid = this.game.getGrid();
    this.visited.insert(initialGrid, initialGrid);
    this.allStates.set(this.game, undefined);

    while (!queue.isEmpty()) {
      const currentState = queue.dequeue()!;

      const nextStates = currentState.getPossibleStates();

      for (const state of nextStates) {
        const isVisited = this.visited.get(state.getGrid());
        if (!isVisited) {
          this.allStates.set(state, currentState);

          if (state.didWin()) {
            this.updateUI(state);
            return true;
          }

          queue.enqueue(state);
          const currStateGrid = state.getGrid();
          this.visited.insert(currStateGrid, currStateGrid);
        }
      }
    }

    return false;
  }

  private solveDFS() {
    this.reset();

    const stack = new Stack<Game>();

    stack.push(this.game);
    const initialGrid = this.game.getGrid();
    this.visited.insert(initialGrid, initialGrid);
    this.allStates.set(this.game, undefined);

    while (!stack.isEmpty()) {
      const currentState = stack.pop()!;

      const nextStates = currentState.getPossibleStates();

      for (const state of nextStates) {
        const isVisited = this.visited.get(state.getGrid());
        if (!isVisited) {
          this.allStates.set(state, currentState);

          if (state.didWin()) {
            this.updateUI(state);

            return true;
          }

          stack.push(state);
          const currStateGrid = state.getGrid();
          this.visited.insert(currStateGrid, currStateGrid);
        }
      }
    }

    return false;
  }

  private solveDFSRec(givenState: Game | undefined = undefined): boolean {
    if (givenState?.didWin()) {
      this.updateUI(givenState);

      return true;
    }

    if (!givenState) {
      this.reset();

      givenState = this.game;
      this.allStates.set(this.game, undefined);
    }

    const isVisited = this.visited.get(givenState.getGrid());
    if (!isVisited) {
      const grid = givenState.getGrid();
      this.visited.insert(grid, grid);

      const nextStates = givenState.getPossibleStates();
      for (const state of nextStates) {
        this.allStates.set(state, givenState);
        const didWin = this.solveDFSRec(state);

        if (didWin) {
          return true;
        }
      }
    }

    return false;
  }

  private solveUCS() {
    this.reset();

    const pq = new PriorityQueue<Game>();
    const visited = new HashTable<Grid, number>();

    visited.insert(this.game.getGrid(), 0);
    pq.enqueue({ item: this.game, priority: 0 });

    while (!pq.isEmpty()) {
      const currState = pq.dequeue()!;
      const grid = currState.item.getGrid();
      const cost = currState.priority;

      const oldCost = visited.get(grid);
      if (!oldCost || (oldCost && oldCost > cost)) {
        visited.insert(grid, currState.priority);

        if (currState.item.didWin()) {
          this.updateUI(currState.item, visited);

          return true;
        }

        const nextStates = currState.item.getPossibleStates();
        for (let i = 0; i < nextStates.length; i++) {
          const state = nextStates[i];

          pq.enqueue({ item: state, priority: cost + i + 1 });
          this.allStates.set(state, currState.item);
        }
      }
    }

    return false;
  }

  private reset() {
    this.visited = new HashTable<Grid, Grid>();
    this.allStates = new Map<Game, Game | undefined>();
  }

  getPath(winningState: Game | undefined) {
    let currState: Game | undefined = winningState;

    const path: Game[] = [];

    while (currState) {
      path.push(currState);

      currState = this.allStates.get(currState);
    }

    return path.reverse().filter((_, i) => i !== 0);
  }

  private async updateUI(
    winningState: Game | undefined,
    visited?: HashTable<Grid, number>
  ) {
    const path = this.getPath(winningState);

    for (const state of path) {
      await this.delay();

      const grid = state.copyCurrentState().getGrid();
      this.updateGrid(({ moves }) => ({
        moves: moves + 1,
        cells: grid,
        cost: visited?.get(grid),
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
