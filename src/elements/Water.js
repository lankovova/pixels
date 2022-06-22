import Element, { Types } from './Element';

class Water extends Element {
  type = Types.Water;

  direction;

  constructor(map, i, j, moved, direction) {
    super(map, i, j);

    this.moved = moved;
    this.direction = direction;
  }

  draw(ctx, sizeH, sizeW) {
    ctx.fillStyle = 'cornflowerblue';
    ctx.fillRect(sizeW * this.j, sizeH * this.i, sizeW, sizeH);
  }

  afterUpdate() {
    this.moved = false;
  }

  clone() {
    return new Water(this.map, this.i, this.j, this.moved, this.direction);
  }

  update() {
    if (this.moved) return undefined;
    this.moved = true;

    if (this.i + 1 < this.map.length) {
      // Go underneath
      if (this.map[this.i + 1][this.j].type === Types.Empty) {
        return this.swapWith(this.i + 1, this.j);
      }

      // Go bot left
      if (this.j > 0 && this.map[this.i + 1][this.j - 1].type === Types.Empty) {
        return this.swapWith(this.i + 1, this.j - 1);
      }

      // Got bot right
      if (
        this.j < this.map[this.i].length - 1
        && this.map[this.i + 1][this.j + 1].type === Types.Empty
      ) {
        return this.swapWith(this.i + 1, this.j + 1);
      }
    }

    if (!this.direction) {
      this.direction = Math.random() > 0.5 ? 'left' : 'right';
    }

    if (this.direction === 'left') {
      // Go staright left
      if (this.j > 0 && this.map[this.i][this.j - 1].type === Types.Empty) {
        return this.swapWith(this.i, this.j - 1);
      }

      // Go staright right
      if (
        this.j < this.map[this.i].length - 1
        && this.map[this.i][this.j + 1].type === Types.Empty
      ) {
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
