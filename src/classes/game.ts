import { initialColorCellsCount } from '../data/initial-color-cells-count';
import type { GameGrid, MovementDirection } from '../types/game';

export class Game {
  public grid: GameGrid;
  public rows: number;
  public cols: number;
  public colorCellsCount = initialColorCellsCount;

  constructor(rows: number, cols: number, grid: GameGrid) {
    this.grid = grid;
    this.rows = rows;
    this.cols = cols;

    this.calcColorCells();
  }

  calcColorCells() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.colorCellsCount[this.grid[i][j]] !== null) {
          this.colorCellsCount[this.grid[i][j]]++;
        }
      }
    }
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

  canMove(row: number, col: number, direction: MovementDirection) {
    switch (direction) {
      case 'UP':
        return this.inGrid(row - 1, col) && this.isEmpty(row - 1, col);

      case 'RIGHT':
        return this.inGrid(row, col + 1) && this.isEmpty(row, col + 1);

      case 'DOWN':
        return this.inGrid(row + 1, col) && this.isEmpty(row + 1, col);

      case 'LEFT':
        return this.inGrid(row, col - 1) && this.isEmpty(row, col - 1);
    }
  }

  inGrid(row: number, col: number) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  isEmpty(row: number, col: number) {
    return this.grid[row][col] === '.';
  }

  isObstacle(row: number, col: number) {
    return this.grid[row][col] === '#';
  }

  handleColorMovement(row: number, col: number, direction: MovementDirection) {
    switch (direction) {
      case 'UP':
        this.grid[row - 1][col] = this.grid[row][col];
        this.grid[row][col] = '.';
        return;

      case 'RIGHT':
        this.grid[row][col + 1] = this.grid[row][col];
        this.grid[row][col] = '.';
        return;

      case 'DOWN':
        this.grid[row + 1][col] = this.grid[row][col];
        this.grid[row][col] = '.';
        return;

      case 'LEFT':
        this.grid[row][col - 1] = this.grid[row][col];
        this.grid[row][col] = '.';
        return;
    }
  }

  didWin() {
    const colorCellsValues = Object.values(this.colorCellsCount).filter(
      (cells) => cells != null
    );

    let finishedCells = 0;
    for (let i = 0; i < colorCellsValues.length; i++) {
      if (colorCellsValues[i] <= 1) {
        finishedCells++;
      }
    }

    return finishedCells === colorCellsValues.length;
  }

  printGrid() {
    let gridAsString = '';

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        gridAsString += this.grid[row][col].charAt(0) + '  ';
      }

      gridAsString += '\n\n';
    }

    console.log(gridAsString);
  }
}
