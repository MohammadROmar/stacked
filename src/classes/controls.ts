import { Game } from './game';
import type { GameGrid } from '../types/game';
import { controlKeys } from '../data/contol-keys';

export class Controls {
  public game: Game;
  public setGrid: (grid: GameGrid) => void;
  public setDidWin: (didWin: boolean) => void;

  constructor(
    game: Game,
    setGrid: (grid: GameGrid) => void,
    setDidWin: (didWin: boolean) => void
  ) {
    this.game = game;
    this.setGrid = setGrid;
    this.setDidWin = setDidWin;

    this.setupControls();
  }

  setupControls() {
    this.mobileControls();
    this.keyboardControls();
  }

  mobileControls() {
    let startX: number = 0;
    let startY: number = 0;

    document.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    });

    document.addEventListener(
      'touchmove',
      (event) => {
        event.preventDefault();

        const moveX = event.touches[0].clientX;
        const moveY = event.touches[0].clientY;

        const deltaX = moveX - startX;
        const deltaY = moveY - startY;

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
      },
      { passive: false }
    );
  }

  keyboardControls() {
    document.addEventListener('keydown', (event) => {
      const key = event.key;

      if (!controlKeys.includes(key)) {
        return;
      }

      if (key === 'ArrowUp' || key === 'w' || key === 'W') {
        this.game.moveUp();
      }

      if (key === 'ArrowRight' || key === 'd' || key === 'D') {
        this.game.moveRight();
      }

      if (key === 'ArrowDown' || key === 's' || key === 'S') {
        this.game.moveDown();
      }

      if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
        this.game.moveLeft();
      }

      this.updateGameState();
    });
  }

  updateGameState() {
    this.setGrid([...this.game.grid]);

    if (this.game.didWin()) {
      this.removeControls();
      this.setDidWin(true);
    }
  }

  removeControls() {
    document.removeEventListener('keydown', () => {});
    document.removeEventListener('touchstart', () => {});
    document.removeEventListener('touchmove', () => {});
  }
}

// import { Game } from './game';
// import type { GameGrid } from '../types/game';
// import { controlKeys } from '../data/contol-keys';

// export class Controls {
//   public game: Game;
//   public setGrid: (grid: GameGrid) => void;
//   public setDidWin: (didWin: boolean) => void;

//   constructor(
//     game: Game,
//     setGrid: (grid: GameGrid) => void,
//     setDidWin: (didWin: boolean) => void
//   ) {
//     this.game = game;
//     this.setGrid = setGrid;
//     this.setDidWin = setDidWin;

//     this.setupControls();
//   }

//   setupControls() {
//     this.mobileControls();
//     this.keyboardControls();
//   }

//   mobileControls() {
//     let startX: number = 0;
//     let startY: number = 0;

//     document.addEventListener('touchstart', (event) => {
//       startX = event.touches[0].clientX;
//       startY = event.touches[0].clientY;
//     });

//     document.addEventListener(
//       'touchmove',
//       (event) => {
//         event.preventDefault();

//         const moveX = event.touches[0].clientX;
//         const moveY = event.touches[0].clientY;

//         const deltaX = moveX - startX;
//         const deltaY = moveY - startY;

//         if (Math.abs(deltaX) > Math.abs(deltaY)) {
//           if (deltaX > 0) {
//             this.game.moveRight();
//           } else {
//             this.game.moveLeft();
//           }
//         } else {
//           if (deltaY > 0) {
//             this.game.moveDown();
//           } else {
//             this.game.moveUp();
//           }
//         }

//         this.updateGameState();
//       },
//       { passive: false }
//     );
//   }

//   keyboardControls() {
//     console.log(this);
//     document.addEventListener('keydown', this.keyoardListener);
//   }

//   keyoardListener(event: KeyboardEvent) {
//     console.log(this);
//     const key = event.key;

//     if (!controlKeys.includes(key)) {
//       return;
//     }

//     if (key === 'ArrowUp' || key === 'w' || key === 'W') {
//       this.game.moveUp();
//     } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
//       this.game.moveRight();
//     } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
//       this.game.moveDown();
//     } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
//       this.game.moveLeft();
//     }

//     this.updateGameState();
//   }

//   updateGameState() {
//     this.setGrid([...this.game.grid]);

//     if (this.game.didWin()) {
//       this.removeControls();
//       this.setDidWin(true);
//     }
//   }

//   removeControls() {
//     document.removeEventListener('keydown', this.keyoardListener);
//     document.removeEventListener('touchstart', () => {});
//     document.removeEventListener('touchmove', () => {});
//   }
// }
