import { GameUtils } from './game-utils';
import type { GameGrid } from '../../types/game';

export class GameMovement extends GameUtils {
  constructor(rows: number, cols: number, grid: GameGrid) {
    super(rows, cols, grid);
  }

  moveUp() {
    for (let col = 0; col < this.cols; col++) {
      for (let row = 1; row < this.rows; row++) {
        if (this.isObstacle(row, col) || this.isEmpty(row, col)) {
          continue;
        }

        while (this.canMove(row, col, 'UP')) {
          this.handleColorMovement(row, col, 'UP');

          row--;
        }

        if (
          this.inGrid(row - 1, col) &&
          this.grid[row][col] === this.grid[row - 1][col]
        ) {
          this.colorCellsCount[this.grid[row][col]]--;
          this.grid[row][col] = '.';
        }
      }
    }
  }

  moveRight() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = this.cols - 2; col >= 0; col--) {
        if (this.isObstacle(row, col) || this.isEmpty(row, col)) {
          continue;
        }

        while (this.canMove(row, col, 'RIGHT')) {
          this.handleColorMovement(row, col, 'RIGHT');

          col++;
        }

        if (
          this.inGrid(row, col + 1) &&
          this.grid[row][col] === this.grid[row][col + 1]
        ) {
          this.colorCellsCount[this.grid[row][col]]--;
          this.grid[row][col] = '.';
        }
      }
    }
  }

  moveDown() {
    for (let col = 0; col < this.cols; col++) {
      for (let row = this.rows - 2; row >= 0; row--) {
        if (this.isObstacle(row, col) || this.isEmpty(row, col)) {
          continue;
        }

        while (this.canMove(row, col, 'DOWN')) {
          this.handleColorMovement(row, col, 'DOWN');

          row++;
        }

        if (
          this.inGrid(row + 1, col) &&
          this.grid[row][col] === this.grid[row + 1][col]
        ) {
          this.colorCellsCount[this.grid[row][col]]--;
          this.grid[row][col] = '.';
        }
      }
    }
  }

  moveLeft() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 1; col < this.cols; col++) {
        if (this.isObstacle(row, col) || this.isEmpty(row, col)) {
          continue;
        }

        while (this.canMove(row, col, 'LEFT')) {
          this.handleColorMovement(row, col, 'LEFT');

          col--;
        }

        if (
          this.inGrid(row, col - 1) &&
          this.grid[row][col] === this.grid[row][col - 1]
        ) {
          this.colorCellsCount[this.grid[row][col]]--;
          this.grid[row][col] = '.';
        }
      }
    }
  }
}
