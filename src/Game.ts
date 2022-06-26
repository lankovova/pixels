import Bitmap from './Bitmap';
import { Types } from './elements/Element';

class Game {
  bitmap = new Bitmap();

  isHolding = false;

  isInEraserMode = false;

  holdingKeyEvent = undefined;

  activeElement = Types.Sand;

  isPaused = false;

  wrapperElement;

  constructor(wrapperElement) {
    this.wrapperElement = wrapperElement;

    const elementsBtns = [...wrapperElement.querySelectorAll('#options input[name=element]')];
    elementsBtns.forEach((elInput) =>
      elInput.addEventListener('change', (event) => {
        this.activeElement = event.target.value;
      }),
    );
  }

  update() {
    if (!this.isPaused) {
      this.bitmap.update();
    }

    if (this.isHolding) {
      if (this.isInEraserMode) {
        this.bitmap.clear(global.mousePos);
        return;
      }

      this.bitmap.add(global.mousePos, this.activeElement);
    }
  }

  setActiveElement(element) {
    this.activeElement = element;

    const inputElement = this.wrapperElement.querySelector(`#options input[name=element][value=${element}]`);
    if (!inputElement) return;

    inputElement.checked = true;
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

    switch (event.key) {
      case 'e': {
        // TODO: Make it visible in UI
        if (this.isInEraserMode) {
          console.log('Disable eraser');
        } else {
          console.log('Enable eraser');
        }
        this.isInEraserMode = !this.isInEraserMode;
        break;
      }
      case 'w': {
        this.setActiveElement(Types.Water);
        break;
      }
      case 's': {
        this.setActiveElement(Types.Sand);
        break;
      }
      case 'p': {
        this.isPaused = !this.isPaused;
        break;
      }
      default: {
        this.setActiveElement(Types.Stone);
        break;
      }
    }
  }

  onKeyUp() {
    this.holdingKeyEvent = undefined;
  }
}

export default Game;
