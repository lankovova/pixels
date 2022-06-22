import { railTillOneTruthy } from '../utils';

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

  clone() {
    return new Element(this.map, this.i, this.j);
  }

  swapWith(i, j) {
    const prevPixelClone = this.map[i][j].clone();
    prevPixelClone.i = this.i;
    prevPixelClone.j = this.j;

    const clonnedThis = this.clone();
    clonnedThis.i = i;
    clonnedThis.j = j;

    this.map[i][j] = clonnedThis;
    this.map[this.i][this.j] = prevPixelClone;

    // TODO: Extract and move to classes that responsible for its own swap logic
    if (prevPixelClone.type === Types.Water) {
      const tryMoveLeft = () => {
        if (this.i > 0
          && this.j > 0
          && this.map[this.i - 1][this.j - 1].type === Types.Empty) {
          prevPixelClone.swapWith(this.i - 1, this.j - 1);
        }
      };

      const tryMoveRight = () => {
        if (
          this.map[this.i - 1][this.j + 1]
          && this.map[this.i - 1][this.j - 1].type === Types.Empty) {
          prevPixelClone.swapWith(this.i - 1, this.j + 1);
        }
      };

      if (Math.random() > 0.5) {
        railTillOneTruthy(
          tryMoveLeft,
          tryMoveRight,
        );
      } else {
        railTillOneTruthy(
          tryMoveRight,
          tryMoveLeft,
        );
      }
    }
  }
}

export default Element;
