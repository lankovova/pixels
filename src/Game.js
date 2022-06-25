import Bitmap from './Bitmap';
import { Types } from './elements/Element';

class Game {
  bitmap = new Bitmap();

  isHolding = false;

  isInEraserMode = false;

  holdingKeyEvent = undefined;

  activeElement = Types.Sand;

  update() {
    this.bitmap.update();

    if (this.isHolding) {
      if (this.isInEraserMode) {
        this.bitmap.clear(global.mousePos);
        return;
      }

      this.bitmap.add(global.mousePos, this.activeElement);
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

    if (!Number.isNaN(Number(event.key))) {
      this.bitmap.brushRadius = Number(event.key);
      return;
    }

    if (event.key.toLowerCase() === 'e') {
      console.log('Enable eraser');
      this.isInEraserMode = true;
      return;
    }

    if (this.isInEraserMode) {
      console.log('Disable eraser');
      this.isInEraserMode = false;
    }
  }

  onKeyUp() {
    this.holdingKeyEvent = undefined;
  }
}

export default Game;
