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
  }
}

export default Element;
