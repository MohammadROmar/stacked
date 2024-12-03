import type { Dispatch, SetStateAction } from 'react';

import { Game } from './game';
import { Queue } from './data-structure/queue';
import { Stack } from './data-structure/stack';
import { HashTable } from './data-structure/hash-table';
import { PriorityQueue } from './data-structure/priority-queue';
import type { Grid } from '../types/grid';
import type { Symbol } from '../types/symbol';
import type { GameState } from '../types/game-state';
import type { GameMode } from '../types/game-mode';

export class GameSolver {
  private initialState: Game;

  private updateGrid: Dispatch<SetStateAction<GameState>>;
  private didWin: (didWin: boolean) => void;
  private solveAlgorithm: GameMode;

  private visited: HashTable<Grid, Grid>;
  private allStates: Map<Game, Game | undefined>;

  private startTime: number;

  constructor(
    game: Game,
    solveAlgorithm: GameMode,
    updateGrid: Dispatch<SetStateAction<GameState>>,
    didWin: (didWin: boolean) => void
  ) {
    this.initialState = game;
    this.solveAlgorithm = solveAlgorithm;
    this.updateGrid = updateGrid;
    this.didWin = didWin;

    this.visited = new HashTable<Grid, Grid>();
    this.allStates = new Map<Game, Game | undefined>();

    this.startTime = 0;

    this.solve();
  }

  private solve() {
    let hasSolution = false;
    this.startTime = Date.now();

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
      hasSolution = this.solveModifiedHillClimbing();
    }

    if (!hasSolution) {
      throw new Error('Could not find a solution for the given grid.');
    }
  }

  private solveBFS() {
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
    const pq = new PriorityQueue<Game>();
    const visited = new HashTable<Grid, number>();

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
    const pq = new PriorityQueue<{ game: Game; cost: number }>();
    const visited = new HashTable<Grid, number>();

    pq.enqueue({
      item: { game: this.initialState, cost: 0 },
      priority: this.getHeuristic(this.initialState),
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
          const heuristic = this.getHeuristic(state);

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

  protected solveHillClimbing() {
    const visited = new HashTable<Grid, number>();

    let currentState = this.initialState;
    let oldState = currentState;
    let currentHeuristic = this.getHeuristic(currentState);
    visited.insert(currentState.getGrid(), currentHeuristic);
    this.allStates.set(currentState, undefined);

    while (!currentState.didWin()) {
      const nextStates = currentState.getPossibleStates();
      for (const state of nextStates) {
        const heuristic = this.getHeuristic(state);

        if (heuristic < currentHeuristic) {
          this.allStates.set(state, currentState);
          visited.insert(state.getGrid(), heuristic);
          oldState = currentState;
          currentState = state;
          currentHeuristic = heuristic;
        }
      }

      if (currentState === oldState) {
        break;
      }
    }

    if (currentState.didWin()) {
      this.updateUI(currentState, visited);
      return true;
    }

    return false;
  }

  private solveModifiedHillClimbing(
    givenState?: Game,
    visited?: HashTable<Grid, number>
  ) {
    if (givenState?.didWin()) {
      this.updateUI(givenState, visited);
      return true;
    }

    if (!givenState) {
      givenState = this.initialState;
      visited = new HashTable<Grid, number>();
      this.allStates.set(givenState, undefined);
    }

    const oldHeuristic = visited?.get(givenState.getGrid());
    if (!oldHeuristic || oldHeuristic > this.getHeuristic(givenState)) {
      visited?.insert(givenState.getGrid(), this.getHeuristic(givenState));

      const nextStates = givenState.getPossibleStates();
      for (const state of nextStates) {
        const heuristic = this.getHeuristic(state);

        if (!oldHeuristic || heuristic <= oldHeuristic) {
          this.allStates.set(state, givenState);
          const didWin = this.solveModifiedHillClimbing(state, visited);

          if (didWin) {
            return true;
          }
        }
      }
    }

    return false;
  }

  private getHeuristic(state: Game) {
    let remaining = 0;

    for (const color in state.getColorsCount()) {
      const colorCount = state.getColor(color as Symbol);
      if (colorCount && colorCount > 1) {
        remaining += colorCount - 1;
      }
    }

    return remaining;
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
    const time = Date.now() - this.startTime;
    const path = this.getPath(winningState);

    this.updateGrid((prevState) => ({
      ...prevState,
      cost: visited?.get(this.initialState.getGrid()),
      totalVisitedStates: this.allStates.size,
      time,
    }));

    for (const state of path) {
      await this.delay();

      const grid = state.copyCurrentState().getGrid();
      const cost = visited?.get(grid);

      this.updateGrid((prevState) => ({
        prevGrid: prevState.cells,
        moves: prevState.moves + 1,
        cells: grid,
        cost,
        moveDirection: state.getMoveDirection(),
        totalVisitedStates: this.allStates.size,
        time,
      }));

      if (state.didWin()) {
        await this.delay(500);
        this.didWin(true);
        return;
      }
    }
  }

  private async delay(duration: number = 1000) {
    await new Promise((resolve) => setTimeout(resolve, duration));
  }
}
