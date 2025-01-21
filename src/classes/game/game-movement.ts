import { GameUtils } from './game-utils';
import type { MovementDirection } from '../../models/movement-direction';
import type { Grid } from '../../models/grid';

export class GameMovement extends GameUtils {
  protected lastMoveDirection: MovementDirection | undefined;

  constructor(rows: number, cols: number, grid: Grid) {
    super(rows, cols, grid);
    this.lastMoveDirection = undefined;
  }

  protected moveUp() {
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

  protected moveRight() {
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

  protected moveDown() {
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

  protected moveLeft() {
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

  public move(direction: MovementDirection) {
    if (this.lastMoveDirection && this.lastMoveDirection === direction) {
      return;
    }

    switch (direction) {
      case 'UP':
        this.moveUp();
        this.lastMoveDirection = 'UP';
        break;

      case 'RIGHT':
        this.moveRight();
        this.lastMoveDirection = 'RIGHT';
        break;

      case 'DOWN':
        this.moveDown();
        this.lastMoveDirection = 'DOWN';
        break;

      case 'LEFT':
        this.moveLeft();
        this.lastMoveDirection = 'LEFT';
        break;
    }
  }

  public getMoveDirection() {
    return this.lastMoveDirection;
  }

  public setNewGrid(grid: Grid) {
    super.setNewGrid(grid);
    this.lastMoveDirection = undefined;
  }
}
