import { GameMovement } from './game-movement';
import type { GameGrid } from '../../types/game';

export class Game extends GameMovement {
  constructor(rows: number, cols: number, grid: GameGrid) {
    super(rows, cols, grid);

    this.calcColorCells();
  }

  getPossibleStates() {
    const upState = this.copyCurrentState();
    upState.moveUp();

    const rightState = this.copyCurrentState();
    rightState.moveRight();

    const downState = this.copyCurrentState();
    downState.moveDown();

    const leftState = this.copyCurrentState();
    leftState.moveLeft();

    return [upState.grid, rightState.grid, downState.grid, leftState.grid];
  }

  copyCurrentState() {
    const newGrid: GameGrid = [];

    for (let i = 0; i < this.rows; i++) {
      newGrid.push([]);

      for (let j = 0; j < this.cols; j++) {
        newGrid[i].push(this.grid[i][j]);
      }
    }

    const copiedGame = new Game(this.rows, this.cols, newGrid);

    return copiedGame;
  }

  checkGridEquality(firstGrid: GameGrid, secondGrid: GameGrid) {
    if (
      firstGrid.length !== secondGrid.length ||
      firstGrid[0].length !== secondGrid[0].length
    ) {
      return false;
    }

    let count = 0;
    const rows = firstGrid.length;
    const cols = firstGrid[0].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (firstGrid[i][j] === secondGrid[i][j]) {
          count++;
        }
      }
    }

    return count === rows * cols;
  }
}