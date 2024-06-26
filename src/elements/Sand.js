import Element, { Types } from './Element';
import { randomizedRailTillOneTruthy } from '../utils';
import { isHeavierThan } from './utils';

const defaultColor = { red: 252, green: 186, blue: 3 };
const lightDarkColor = { red: 201, green: 148, blue: 0 };
const heavyDarkColor = { red: 153, green: 113, blue: 0 };

class Sand extends Element {
  type = Types.Sand;

  moved = false;

  color = defaultColor;

  constructor(map, i, j, color, moved) {
    super(map, i, j);

    this.moved = moved;

    let randColor = this.color;
    if (Math.random() > 0.5) {
      if (Math.random() > 0.3) {
        randColor = lightDarkColor;
      } else {
        randColor = heavyDarkColor;
      }
    }
    this.color = color ?? randColor;
  }

  draw(ctx, sizeH, sizeW) {
    ctx.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
    ctx.fillRect(sizeW * this.j, sizeH * this.i, sizeW, sizeH);
  }

  afterUpdate() {
    this.moved = false;
  }

  update() {
    if (this.moved) return undefined;

    if (this.i + 1 < this.map.length) {
      const goUnder = () => {
        // Go underneath
        const under = this.map[this.i + 1][this.j];
        if (under && isHeavierThan(this, under)) {
          this.swapWith(this.i + 1, this.j);
          return true;
        }
        return false;
      };

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
          this.j < this.map[this.i].length - 1 &&
          isHeavierThan(this, botRight)
        ) {
          this.swapWith(this.i + 1, this.j + 1);
          return true;
        }
        return false;
      };

      randomizedRailTillOneTruthy([goUnder], [goBotLeft, goBotRight]);
    }

    return undefined;
  }
}

export default Sand;
