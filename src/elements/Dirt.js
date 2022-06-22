import Element, { Types } from './Element';

class Dirt extends Element {
  type = Types.Dirt;

  draw(ctx, sizeH, sizeW) {
    ctx.fillStyle = 'saddlebrown';
    ctx.fillRect(sizeW * this.j, sizeH * this.i, sizeW, sizeH);
  }

  clone() {
    return new Dirt(this.map, this.i, this.j);
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}
}

export default Dirt;
