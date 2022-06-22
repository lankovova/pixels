import Element, { Types } from './elements/Element';
import Stone from './elements/Stone';
import Water from './elements/Water';

class Bitmap {
  map = [];

  width = 50;

  height = 50;

  hovered = undefined;

  framesSinceLastUpdate = 0;

  constructor() {
    for (let i = 0; i < this.height; i += 1) {
      this.map[i] = [];

      for (let j = 0; j < this.width; j += 1) {
        this.map[i][j] = new Element(this.map, i, j);
      }
    }
  }

  iterate(func) {
    for (let i = this.map.length - 1; i >= 0; i -= 1) {
      for (let j = 0; j < this.map[i].length; j += 1) {
        func(this.map[i][j], i, j, this.map);
      }
    }
  }

  update() {
    this.framesSinceLastUpdate += 1;

    if (this.framesSinceLastUpdate < 2) return;
    this.framesSinceLastUpdate = 0;

    console.log('update');

    this.iterate((particle) => {
      particle.update();
    });

    this.iterate((particle) => {
      particle.afterUpdate();
    });
  }

  draw(ctx) {
    const sizeH = Math.floor(window.innerHeight / this.height);
    const sizeW = Math.floor(window.innerWidth / this.width);

    this.iterate((particle, i, j) => {
      particle.draw(ctx, sizeH, sizeW);

      if (particle === this.hovered) {
        ctx.strokeStyle = 'red';
        ctx.rect(sizeW * j, sizeH * i, sizeW, sizeH);
        ctx.stroke();
      }
    });
  }

  hover(point) {
    const pixel = this.findByPoint(point);
    if (!pixel) return;
    this.hovered = pixel;
  }

  findByPoint(point) {
    const sizeH = Math.floor(window.innerHeight / this.height);
    const row = Math.floor(point.y / sizeH);
    if (row > this.height) return undefined;

    const sizeW = Math.floor(window.innerWidth / this.width);
    const col = Math.floor(point.x / sizeW);
    if (col > this.width) return undefined;

    return this.map[row][col];
  }

  add(point, water = false) {
    const pixel = this.findByPoint(point);

    if (!pixel) return;

    if (pixel.type !== Types.Empty) return;

    const ParticleToCreate = water ? Water : Stone;
    this.map[pixel.i][pixel.j] = new ParticleToCreate(this.map, pixel.i, pixel.j);
  }
}

export default Bitmap;
