import Element, { Types } from './elements/Element';
import Sand from './elements/Sand';
import Water from './elements/Water';

class Bitmap {
  map = [];

  width = 100;

  height = 70;

  hovered = undefined;

  brushRadius = 4;

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
    if (row < 0 || row >= this.height) return undefined;

    const sizeW = Math.floor(window.innerWidth / this.width);
    const col = Math.floor(point.x / sizeW);
    if (col < 0 || col >= this.width) return undefined;

    return this.map[row][col];
  }

  // FIXME: Fix elements type situation
  add(point, water = false) {
    const pixel = this.findByPoint(point);
    if (!pixel) return;

    const ElementConstructor = water ? Water : Sand;
    this.iterateCircleOfPixels(pixel.i, pixel.j, (x, y) => {
      this.addElementToMap(x, y, ElementConstructor);
    });
  }

  clear(point) {
    const pixel = this.findByPoint(point);
    if (!pixel) return;

    this.iterateCircleOfPixels(pixel.i, pixel.j, (x, y) => {
      this.clearPixel(x, y);
    });
  }

  iterateCircleOfPixels(x, y, cb) {
    if (this.brushRadius === 1) {
      cb(x, y);
      return;
    }

    for (let angle = 0; angle < 360; angle += 1) {
      const x1 = Math.round(this.brushRadius * Math.cos((angle * Math.PI) / 180));
      const y1 = Math.round(this.brushRadius * Math.sin((angle * Math.PI) / 180));
      cb(x + x1, y + y1);

      // Fill circle insides
      let xT = x1;
      while (xT !== 0) {
        xT = xT > 0 ? xT - 1 : xT + 1;
        cb(x + xT, y + y1);
      }
      let yT = y1;
      while (yT !== 0) {
        yT = yT > 0 ? yT - 1 : yT + 1;
        cb(x + x1, y + yT);
      }
    }
  }

  addElementToMap(i, j, ElementConstructor) {
    if (i < 0 || j < 0 || i >= this.map.length || j >= this.map[i].length) {
      return;
    }

    if (this.map[i][j].type !== Types.Empty) {
      return;
    }

    this.map[i][j] = new ElementConstructor(this.map, i, j);
  }

  clearPixel(i, j) {
    if (i < 0 || j < 0 || i >= this.map.length || j >= this.map[i].length) {
      return;
    }

    if (this.map[i][j].type === Types.Empty) {
      return;
    }

    this.map[i][j] = new Element(this.map, i, j);
  }
}

export default Bitmap;
