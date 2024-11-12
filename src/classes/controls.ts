import { Game } from './game/game';
import { controlKeys } from '../data/contol-keys';
import type { GameGrid } from '../types/game';

export class Controls {
  public game: Game;
  public updateGrid: (grid: GameGrid) => void;
  public didWin: (didWin: boolean) => void;
  private startX: number;
  private startY: number;

  constructor(
    game: Game,
    updateGrid: (grid: GameGrid) => void,
    didWin: (didWin: boolean) => void
  ) {
    this.game = game;
    this.updateGrid = updateGrid;
    this.didWin = didWin;
    this.startX = 0;
    this.startY = 0;

    this.setupControls();
  }

  setupControls() {
    this.mobileControls();
    this.keyboardControls();
  }

  mobileControls() {
    document.addEventListener('touchstart', this.touchStartEvent);
    document.addEventListener('touchmove', this.touchMoveEvent, {
      passive: false,
    });
  }

  touchStartEvent = (event: TouchEvent) => {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  };

  touchMoveEvent = (event: TouchEvent) => {
    event.preventDefault();

    const moveX = event.touches[0].clientX;
    const moveY = event.touches[0].clientY;

    const deltaX = moveX - this.startX;
    const deltaY = moveY - this.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        this.game.moveRight();
      } else {
        this.game.moveLeft();
      }
    } else {
      if (deltaY > 0) {
        this.game.moveDown();
      } else {
        this.game.moveUp();
      }
    }

    this.updateGameState();
  };

  keyboardControls() {
    document.addEventListener('keydown', this.keydownEvent);
  }

  keydownEvent = (event: KeyboardEvent) => {
    const key = event.key;

    if (!controlKeys.includes(key)) {
      return;
    }

    if (key === 'ArrowUp' || key === 'w' || key === 'W') {
      this.game.moveUp();
    } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
      this.game.moveRight();
    } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
      this.game.moveDown();
    } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
      this.game.moveLeft();
    }

    this.updateGameState();
  };

  updateGameState() {
    this.updateGrid(this.game.copyCurrentState().grid);

    if (this.game.didWin()) {
      this.removeControls();
      this.didWin(true);
    }
  }

  removeControls() {
    document.removeEventListener('keydown', this.keydownEvent);
    document.removeEventListener('touchstart', this.touchStartEvent);
    document.removeEventListener('touchmove', this.touchMoveEvent);
  }
}
