import Element, { Types } from './Element';
import { railTillOneTruthy } from '../utils';
import { isHeavierThan } from './utils';

class Sand extends Element {
  type = Types.Sand;

  moved = false;

  constructor(map, i, j, moved) {
    super(map, i, j);

    this.moved = moved;
  }

  draw(ctx, sizeH, sizeW) {
    ctx.fillStyle = 'sandybrown';
    ctx.fillRect(sizeW * this.j, sizeH * this.i, sizeW, sizeH);
  }

  afterUpdate() {
    this.moved = false;
  }

  clone() {
    return new Sand(this.map, this.i, this.j, this.moved);
  }

  update() {
    if (this.moved) return undefined;

    if (this.i + 1 < this.map.length) {
      // Go underneath
      const under = this.map[this.i + 1][this.j];
      if (isHeavierThan(this, under)) {
        return this.swapWith(this.i + 1, this.j);
      }

      const goBotLeft = () => {
        // Go bot left
        const botLeft = this.map[this.i + 1][this.j - 1];

        if (this.j > 0 && isHeavierThan(this, botLeft)) {
          this.swapWith(this.i + 1, this.j - 1);
          return true;
        }
        return false;
      };

      const goBotRight = () => {
        // Got bot right
        const botRight = this.map[this.i + 1][this.j + 1];

        if (
          this.j < this.map[this.i].length - 1
          && isHeavierThan(this, botRight)
        ) {
          this.swapWith(this.i + 1, this.j + 1);
          return true;
        }
        return false;
      };

      if (Math.random() > 0.5) {
        railTillOneTruthy(
          goBotLeft,
          goBotRight,
        );
      } else {
        railTillOneTruthy(
          goBotRight,
          goBotLeft,
        );
      }
    }

    return undefined;
  }
}

export default Sand;