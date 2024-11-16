import { GameMovement } from './game-movement';
import type { Grid } from '../../types/game';

export class Game extends GameMovement {
  constructor(rows: number, cols: number, grid: Grid) {
    super(rows, cols, grid);

    this.calcColorCells();
  }

  getPossibleStates(currState: Game) {
    const upState = currState.copyCurrentState();
    upState.moveUp();

    const rightState = currState.copyCurrentState();
    rightState.moveRight();

    const downState = currState.copyCurrentState();
    downState.moveDown();

    const leftState = currState.copyCurrentState();
    leftState.moveLeft();

    return [upState, rightState, downState, leftState];
  }

  copyCurrentState() {
    const newGrid: Grid = [];

    for (let i = 0; i < this.rows; i++) {
      newGrid.push([]);

      for (let j = 0; j < this.cols; j++) {
        newGrid[i].push(this.grid[i][j]);
      }
    }

    const copiedGame = new Game(this.rows, this.cols, newGrid);

    return copiedGame;
  }

  checkGridEquality(firstGrid: Grid, secondGrid: Grid) {
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
