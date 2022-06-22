import Bitmap from './Bitmap';

class Game {
  bitmap = new Bitmap();

  isDrawing = false;

  update() {
    this.bitmap.update();
  }

  draw(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    // Draw all entities
    this.bitmap.draw(ctx);
  }

  onMouseDown() {
    this.isDrawing = true;
  }

  onMouseMove(event) {
    if (this.isDrawing) {
      if (event.shiftKey) {
        this.bitmap.add(global.mousePos, true);
      } else {
        this.bitmap.add(global.mousePos);
      }
    } else {
      this.bitmap.hover(global.mousePos);
    }
  }

  onMouseUp(event) {
    if (event.shiftKey) {
      this.bitmap.add(global.mousePos, true);
    } else {
      this.bitmap.add(global.mousePos);
    }
    this.isDrawing = false;
  }
}

export default Game;
