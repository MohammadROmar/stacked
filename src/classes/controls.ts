import type { Dispatch, SetStateAction } from 'react';

import { Game } from './game';
import { controlKeys } from '../data/contol-keys';
import type { GameGrid, MovementDirection } from '../types/game';

export class Controls {
  public game: Game;
  public updateGrid: Dispatch<SetStateAction<GameGrid>>;
  public didWin: (didWin: boolean) => void;
  private startX: number;
  private startY: number;
  private prevMovementDir: MovementDirection | null;

  constructor(
    game: Game,
    updateGrid: Dispatch<SetStateAction<GameGrid>>,
    didWin: (didWin: boolean) => void
  ) {
    this.game = game;
    this.updateGrid = updateGrid;
    this.didWin = didWin;
    this.startX = 0;
    this.startY = 0;
    this.prevMovementDir = null;
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
        this.game.move('RIGHT');
      } else {
        this.game.move('LEFT');
      }
    } else {
      if (deltaY > 0) {
        this.game.move('DOWN');
      } else {
        this.game.move('UP');
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

    const direction = this.getDirection(key);
    const isNewMove = !(direction === this.prevMovementDir);

    if (direction === 'UP' && isNewMove) {
      this.game.move('UP');
      this.prevMovementDir = 'UP';
    } else if (direction === 'RIGHT' && isNewMove) {
      this.game.move('RIGHT');
      this.prevMovementDir = 'RIGHT';
    } else if (direction === 'DOWN' && isNewMove) {
      this.game.move('DOWN');
      this.prevMovementDir = 'DOWN';
    } else if (direction === 'LEFT' && isNewMove) {
      this.game.move('LEFT');
      this.prevMovementDir = 'LEFT';
    }

    if (isNewMove) {
      this.updateGameState();
    }
  };

  updateGameState() {
    this.updateGrid(({ moves }) => ({
      moves: moves + 1,
      cells: this.game.copyCurrentState().getGrid(),
      cost: undefined,
    }));

    if (this.game.didWin()) {
      this.removeControls();
      this.didWin(true);
    }
  }

  getDirection(key: string): MovementDirection {
    if (key === 'ArrowUp' || key === 'w' || key === 'W') {
      return 'UP';
    } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
      return 'RIGHT';
    } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
      return 'DOWN';
    } else {
      return 'LEFT';
    }
  }

  resetControls() {
    this.prevMovementDir = null;
  }

  removeControls() {
    document.removeEventListener('keydown', this.keydownEvent);
    document.removeEventListener('touchstart', this.touchStartEvent);
    document.removeEventListener('touchmove', this.touchMoveEvent);
  }
}
