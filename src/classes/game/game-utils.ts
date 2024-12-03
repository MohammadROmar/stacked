import { initialCellsCount } from '../../data/initial-color-cells-count';
import type { MovementDirection } from '../../types/movement-direction';
import type { Grid } from '../../types/grid';
import type { Symbol } from '../../types/symbol';

export class GameUtils {
  protected rows: number;
  protected cols: number;
  protected grid: Grid;
  protected colorCellsCount;

  constructor(rows: number, cols: number, grid: Grid) {
    this.grid = grid;
    this.rows = rows;
    this.cols = cols;
    this.colorCellsCount = { ...initialCellsCount };
  }

  protected calcColorCells() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.colorCellsCount[this.grid[i][j]] !== null) {
          this.colorCellsCount[this.grid[i][j]]++;
        }
      }
    }
  }

  public getRows() {
    return this.rows;
  }

  public getColumns() {
    return this.cols;
  }

  public getGrid() {
    return this.grid;
  }

  public getColorsCount() {
    return this.colorCellsCount;
  }

  public getColor(color: Symbol) {
    return this.colorCellsCount[color];
  }

  protected canMove(row: number, col: number, direction: MovementDirection) {
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

  protected inGrid(row: number, col: number) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  protected isEmpty(row: number, col: number) {
    return this.grid[row][col] === '.';
  }

  protected isObstacle(row: number, col: number) {
    return this.grid[row][col] === '#';
  }

  protected handleColorMovement(
    row: number,
    col: number,
    direction: MovementDirection
  ) {
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

  public didWin() {
    const colorCellsValues = Object.values(this.colorCellsCount).filter(
      (cells) => cells !== null
    );

    let finishedCells = 0;
    for (let i = 0; i < colorCellsValues.length; i++) {
      if (colorCellsValues[i] <= 1) {
        finishedCells++;
      }
    }

    return finishedCells === colorCellsValues.length;
  }

  public printGrid() {
    let gridAsString = '';

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        gridAsString += this.grid[row][col].charAt(0) + '  ';
      }

      gridAsString += '\n\n';
    }
    console.log(gridAsString);
  }

  public setNewGrid(grid: Grid) {
    this.grid = grid;

    this.colorCellsCount = { ...initialCellsCount };
    this.calcColorCells();
  }
}
