import Element, { Types } from './Element';

const defaultColor = { red: 138, green: 138, blue: 138 };
const lightModColor = { red: 158, green: 158, blue: 158 };
const darkModColor = { red: 120, green: 120, blue: 120 };

class Stone extends Element {
  type = Types.Stone;

  color = defaultColor;

  constructor(map, i, j, color) {
    super(map, i, j);

    let randColor = this.color;
    if (Math.random() > 0.3) {
      if (Math.random() > 0.5) {
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

  clone() {
    return new Stone(this.map, this.i, this.j, this.color);
  }
}

export default Stone;
