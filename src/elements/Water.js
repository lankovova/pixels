import Element, { Types } from './Element';

const defaultColor = { red: 0, green: 128, blue: 255 };
const lightModColor = { red: 54, green: 155, blue: 255 };
const darkModColor = { red: 0, green: 95, blue: 198 };

class Water extends Element {
  type = Types.Water;

  direction;

  color = defaultColor;

  constructor(map, i, j, color, moved, direction) {
    super(map, i, j);

    this.moved = moved;
    this.direction = direction;

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

  clone() {
    return new Water(this.map, this.i, this.j, this.color, this.moved, this.direction);
  }

  update() {
    if (this.moved) return undefined;
    this.moved = true;

    const emptyOnTheLeft = this.j > 0 && this.map[this.i][this.j - 1].type === Types.Empty;
    const emptyOnTheRight = this.j < this.map[this.i].length - 1
      && this.map[this.i][this.j + 1].type === Types.Empty;

    if (this.i + 1 < this.map.length) {
      // Go underneath
      if (this.map[this.i + 1][this.j].type === Types.Empty) {
        return this.swapWith(this.i + 1, this.j);
      }

      // Go bot left
      if (
        this.j > 0
        && this.map[this.i + 1][this.j - 1].type === Types.Empty
        && emptyOnTheLeft
      ) {
        return this.swapWith(this.i + 1, this.j - 1);
      }

      // Got bot right
      if (
        this.j < this.map[this.i].length - 1
        && this.map[this.i + 1][this.j + 1].type === Types.Empty
        && emptyOnTheRight
      ) {
        return this.swapWith(this.i + 1, this.j + 1);
      }
    }

    if (!this.direction) {
      this.direction = Math.random() > 0.5 ? 'left' : 'right';
    }

    if (this.direction === 'left') {
      // Go staright left
      if (emptyOnTheLeft) {
        return this.swapWith(this.i, this.j - 1);
      }

      // Go staright right
      if (emptyOnTheRight) {
        return this.swapWith(this.i, this.j + 1);
      }
    } else {
      // Go staright right
      if (
        this.j < this.map[this.i].length - 1
          && this.map[this.i][this.j + 1].type === Types.Empty
      ) {
        return this.swapWith(this.i, this.j + 1);
      }

      // Go staright left
      if (this.j > 0 && this.map[this.i][this.j - 1].type === Types.Empty) {
        return this.swapWith(this.i, this.j - 1);
      }
    }

    return undefined;
  }
}

export default Water;
