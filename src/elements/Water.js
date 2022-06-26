import { randomizedRailTillOneTruthy } from '../utils';
import Element, { Types } from './Element';

const defaultColor = { red: 0, green: 128, blue: 255 };
const lightModColor = { red: 54, green: 155, blue: 255 };
const darkModColor = { red: 0, green: 95, blue: 198 };

class Water extends Element {
  type = Types.Water;

  color = defaultColor;

  constructor(map, i, j, color, moved) {
    super(map, i, j);

    this.moved = moved;

    let randColor = this.color;
    if (Math.random() > 0.7) {
      if (Math.random() > 0.3) {
        randColor = lightModColor;
      } else {
        randColor = darkModColor;
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
    this.moved = true;

    const goUnder = () => {
      // Go underneath
      if (this.i + 1 < this.map.length && this.map[this.i + 1][this.j].type === Types.Empty) {
        this.swapWith(this.i + 1, this.j);
        return true;
      }
      return false;
    };

    const goBotLeft = () => {
      // Go bot left
      if (
        this.i + 1 < this.map.length &&
        this.j > 0 &&
        this.map[this.i + 1][this.j - 1].type === Types.Empty &&
        this.map[this.i][this.j - 1].type === Types.Empty // emptyOnTheLeft
      ) {
        this.swapWith(this.i + 1, this.j - 1);
        return true;
      }
      return false;
    };

    const goBotRight = () => {
      // Got bot right
      if (
        this.i + 1 < this.map.length &&
        this.j + 1 < this.map[this.i].length &&
        this.map[this.i + 1][this.j + 1].type === Types.Empty &&
        this.map[this.i][this.j + 1].type === Types.Empty // emptyOnTheRight
      ) {
        this.swapWith(this.i + 1, this.j + 1);
        return true;
      }
      return false;
    };

    const goLeft = () => {
      // Go staright left
      if (this.j > 0 && this.map[this.i][this.j - 1].type === Types.Empty) {
        this.swapWith(this.i, this.j - 1);
        return true;
      }
      return false;
    };

    const goRight = () => {
      // Go staright right
      if (this.j + 1 < this.map[this.i].length && this.map[this.i][this.j + 1].type === Types.Empty) {
        this.swapWith(this.i, this.j + 1);
        return true;
      }
      return false;
    };

    randomizedRailTillOneTruthy([goUnder], [goBotLeft, goBotRight], [goLeft, goRight]);

    return undefined;
  }
}

export default Water;
