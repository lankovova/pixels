import Bitmap from './Bitmap';

class Game {
  bitmap = new Bitmap();

  isHolding = false;

  holdingKeyEvent = undefined;

  update() {
    this.bitmap.update();

    if (this.isHolding) {
      if (this.holdingKeyEvent && this.holdingKeyEvent.shiftKey) {
        this.bitmap.add(global.mousePos, true);
      } else {
        this.bitmap.add(global.mousePos);
      }
    }
  }

  draw(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    // Draw all entities
    this.bitmap.draw(ctx);
  }

  onMouseDown() {
    this.isHolding = true;
  }

  onMouseMove() {
    if (this.isHolding) {
      return;
    }

    this.bitmap.hover(global.mousePos);
  }

  onMouseUp() {
    this.isHolding = false;
  }

  onKeyDown(event) {
    this.holdingKeyEvent = event;
  }

  onKeyUp() {
    this.holdingKeyEvent = undefined;
  }
}

export default Game;
