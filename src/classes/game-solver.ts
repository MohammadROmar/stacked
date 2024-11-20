import type { Dispatch, SetStateAction } from 'react';

import { Game } from './game';
import { Queue } from './data-structure/queue';
import { Stack } from './data-structure/stack';
import { HashTable } from './data-structure/hash-table';
import { PriorityQueue } from './data-structure/priority-queue';
import type { GameGrid, Grid, Symbol } from '../types/game';
import type { GameMode } from '../types/game-mode';

export class GameSolver {
  private initialState: Game;

  private updateGrid: Dispatch<SetStateAction<GameGrid>>;
  private didWin: (didWin: boolean) => void;
  private solveAlgorithm: GameMode;

  private visited: HashTable<Grid, Grid>;
  private allStates: Map<Game, Game | undefined>;

  constructor(
    game: Game,
    solveAlgorithm: GameMode,
    updateGrid: Dispatch<SetStateAction<GameGrid>>,
    didWin: (didWin: boolean) => void
  ) {
    this.initialState = game;
    this.solveAlgorithm = solveAlgorithm;
    this.updateGrid = updateGrid;
    this.didWin = didWin;

    this.visited = new HashTable<Grid, Grid>();
    this.allStates = new Map<Game, Game | undefined>();

    this.solve();
  }

  private solve() {
    let hasSolution = false;

    if (this.solveAlgorithm === 'BFS') {
      hasSolution = this.solveBFS();
    } else if (this.solveAlgorithm === 'DFS') {
      hasSolution = this.solveDFS();
    } else if (this.solveAlgorithm === 'Recursive DFS') {
      hasSolution = this.solveDFSRec();
    } else if (this.solveAlgorithm === 'UCS') {
      hasSolution = this.solveUCS();
    } else if (this.solveAlgorithm === 'A*') {
      hasSolution = this.solveAStar();
    } else {
      hasSolution = this.solveHillClimbing();
      throw new Error('Not implemented yet!');
    }

    if (!hasSolution) {
      throw new Error('Could not find a solution for the given grid.');
    }
  }

  private solveBFS() {
    this.reset();

    const queue = new Queue<Game>();

    queue.enqueue(this.initialState);
    const initialGrid = this.initialState.getGrid();
    this.visited.insert(initialGrid, initialGrid);
    this.allStates.set(this.initialState, undefined);

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

    stack.push(this.initialState);
    const initialGrid = this.initialState.getGrid();
    this.visited.insert(initialGrid, initialGrid);
    this.allStates.set(this.initialState, undefined);

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

      givenState = this.initialState;
      this.allStates.set(this.initialState, undefined);
    }

    const grid = givenState.getGrid();
    const isVisited = this.visited.get(grid);
    if (!isVisited) {
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

    // visited.insert(this.game.getGrid(), 0);
    pq.enqueue({ item: this.initialState, priority: 0 });

    while (!pq.isEmpty()) {
      const { item: currState, priority: cost } = pq.dequeue()!;
      const grid = currState.getGrid();

      const oldCost = visited.get(grid);
      if (!oldCost || (oldCost && oldCost > cost)) {
        visited.insert(grid, cost);

        if (currState.didWin()) {
          this.updateUI(currState, visited);

          return true;
        }

        const nextStates = currState.getPossibleStates();
        for (let i = 0; i < nextStates.length; i++) {
          const state = nextStates[i];

          pq.enqueue({ item: state, priority: cost + i + 1 });
          this.allStates.set(state, currState);
        }
      }
    }

    return false;
  }

  private solveAStar() {
    this.reset();

    const pq = new PriorityQueue<{ game: Game; cost: number }>();
    const visited = new HashTable<Grid, number>();

    pq.enqueue({
      item: { game: this.initialState, cost: 0 },
      priority: this.getManhatanDistance(this.initialState),
    });
    this.allStates.set(this.initialState, undefined);

    while (!pq.isEmpty()) {
      const { item, priority: score } = pq.dequeue()!;
      const { game: currState, cost: currCost } = item;

      const prevScore = visited.get(currState.getGrid());
      if (!prevScore || (prevScore && prevScore > score)) {
        visited.insert(currState.getGrid(), score);

        if (currState.didWin()) {
          this.updateUI(currState, visited);

          return true;
        }

        const nextStates = currState.getPossibleStates();
        for (let i = 0; i < nextStates.length; i++) {
          const state = nextStates[i];
          const cost = currCost + i + 1;
          const heuristic = this.getManhatanDistance(state);

          pq.enqueue({
            item: { game: state, cost },
            priority: cost + heuristic,
          });
          this.allStates.set(state, currState);
        }
      }
    }

    return false;
  }

  private solveHillClimbing() {
    return false;
  }

  private getManhatanDistance(state: Game) {
    let remaining = 0;

    for (const color in state.getColorsCount()) {
      const colorCount = state.getColor(color as Symbol);
      if (colorCount && colorCount > 1) {
        remaining += colorCount - 1;
      }
    }

    return remaining;
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

    if (
      this.solveAlgorithm === 'A*' ||
      this.solveAlgorithm === 'Hill Climbing'
    ) {
      this.updateGrid((prevState) => ({
        ...prevState,
        cost: visited!.get(this.initialState.getGrid()),
      }));
    }

    for (const state of path) {
      await this.delay();

      const grid = state.copyCurrentState().getGrid();
      const cost = visited?.get(grid);

      this.updateGrid(({ moves }) => ({
        moves: moves + 1,
        cells: grid,
        cost,
      }));

      if (state.didWin()) {
        this.didWin(true);
        return;
      }
    }
  }

  private async delay() {
    await new Promise((resolve) => setTimeout(resolve, 2500));
  }
}
