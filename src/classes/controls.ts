import type { Dispatch, SetStateAction } from 'react';

import { Game } from './game';
import { controlKeys } from '../data/contol-keys';
import type { GameState } from '../types/game-state';
import type { MovementDirection } from '../types/movement-direction';

export class Controls {
  public game: Game;
  public updateGrid: Dispatch<SetStateAction<GameState>>;
  public didWin: (didWin: boolean) => void;
  private startX: number;
  private startY: number;
  private prevMovementDir: MovementDirection | undefined;

  constructor(
    game: Game,
    updateGrid: Dispatch<SetStateAction<GameState>>,
    didWin: (didWin: boolean) => void
  ) {
    this.game = game;
    this.updateGrid = updateGrid;
    this.didWin = didWin;
    this.startX = 0;
    this.startY = 0;
    this.prevMovementDir = undefined;

    this.setupControls();
  }

  public setupControls() {
    this.mobileControls();
    this.keyboardControls();
  }

  private mobileControls() {
    document.addEventListener('touchstart', this.touchStartEvent);
    document.addEventListener('touchmove', this.touchMoveEvent, {
      passive: false,
    });
  }

  private touchStartEvent = (event: TouchEvent) => {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  };

  private touchMoveEvent = (event: TouchEvent) => {
    event.preventDefault();

    const moveX = event.touches[0].clientX;
    const moveY = event.touches[0].clientY;

    const deltaX = moveX - this.startX;
    const deltaY = moveY - this.startY;

    let direction: MovementDirection | undefined = undefined;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && this.prevMovementDir !== 'RIGHT') {
        this.game.move('RIGHT');
        direction = 'RIGHT';
        this.prevMovementDir = 'RIGHT';
      } else if (deltaX < 0 && this.prevMovementDir !== 'LEFT') {
        this.game.move('LEFT');
        direction = 'LEFT';
        this.prevMovementDir = 'LEFT';
      }
    } else {
      if (deltaY > 0 && this.prevMovementDir !== 'DOWN') {
        this.game.move('DOWN');
        direction = 'DOWN';
        this.prevMovementDir = 'DOWN';
      } else if (deltaY < 0 && this.prevMovementDir !== 'UP') {
        this.game.move('UP');
        direction = 'UP';
        this.prevMovementDir = 'UP';
      }
    }

    if (direction) {
      this.updateGameState();
    }
  };

  private keyboardControls() {
    document.addEventListener('keydown', this.keydownEvent);
  }

  private keydownEvent = (event: KeyboardEvent) => {
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

  private updateGameState() {
    this.updateGrid((prevState) => ({
      cells: this.game.copyCurrentState().getGrid(),
      cost: undefined,
      moveDirection: this.prevMovementDir,
      totalVisitedStates: undefined,
      moves: prevState.moves + 1,
      prevGrid: prevState.cells,
      time: undefined,
    }));

    if (this.game.didWin()) {
      this.removeControls();
      this.didWin(true);
    }
  }

  private getDirection(key: string): MovementDirection {
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

  private removeControls() {
    document.removeEventListener('keydown', this.keydownEvent);
    document.removeEventListener('touchstart', this.touchStartEvent);
    document.removeEventListener('touchmove', this.touchMoveEvent);
  }
}
