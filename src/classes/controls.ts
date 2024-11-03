import { Game } from './game';

export class Controls {
  public game: Game;

  constructor(game: Game) {
    this.game = game;

    this.addControls();
  }

  addControls() {
    document.addEventListener('keydown', (event) => {
      const key = event.key;

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

      this.game.printGrid();
      console.log(this.game.didWin());
    });
  }
}
