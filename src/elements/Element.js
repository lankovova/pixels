import { randomizedRailTillOneTruthy } from '../utils';

export const Types = {
  Empty: 'Empty',
  Stone: 'Stone',
  Water: 'Water',
  Sand: 'Sand',
};

class Element {
  type = Types.Empty;

  map;

  x;

  y;

  constructor(map, i, j) {
    this.map = map;
    this.i = i;
    this.j = j;
  }

  // eslint-disable-next-line class-methods-use-this
  afterUpdate() {}

  // eslint-disable-next-line class-methods-use-this
  draw() {}

  // eslint-disable-next-line class-methods-use-this
  update() {}

  moveTo(i, j) {
    this.i = i;
    this.j = j;
    this.map[i][j] = this;
  }

  swapWith(i, j) {
    if (!this.map[i] || !this.map[i][j]) {
      return;
    }

    const elementToSwap = this.map[i][j];

    elementToSwap.moveTo(this.i, this.j);
    this.moveTo(i, j);

    // TODO: Extract and move to classes that responsible for its own swap logic
    if (elementToSwap.type === Types.Water) {
      const tryMoveLeft = () => {
        if (
          this.i > 0 &&
          this.j > 0 &&
          this.map[this.i - 1][this.j - 1].type === Types.Empty
        ) {
          elementToSwap.swapWith(this.i - 1, this.j - 1);
        }
      };

      const tryMoveRight = () => {
        if (
          this.i > 0 &&
          this.j < this.map[i].length - 1 &&
          this.map[this.i - 1][this.j + 1].type === Types.Empty
        ) {
          elementToSwap.swapWith(this.i - 1, this.j + 1);
        }
      };

      randomizedRailTillOneTruthy([tryMoveLeft, tryMoveRight]);
    }
  }
}

export default Element;
