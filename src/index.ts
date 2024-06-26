import Game from './Game';

const wrapper = document.querySelector('#wrapper');
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const optionsSidebar = document.querySelector('#options');
const ctx = canvas.getContext('2d', { alpha: false });
global.mousePos = { x: 0, y: 0 };

const game = new Game(wrapper);

const FPS = 60; // Valid values are 60,30,20,15,10...
// set the mim time to render the next frame
const FRAME_MIN_TIME = (1000 / 60) * (60 / FPS) - (1000 / 60) * 0.5;
let lastFrameTime = 0; // the last frame time
function update(time) {
  const deltaT = time - lastFrameTime;
  if (deltaT < FRAME_MIN_TIME) {
    // skip the frame if the call is too early
    requestAnimationFrame(update);
    return; // return as there is nothing to do
  }
  lastFrameTime = time; // remember the time of the rendered frame

  game.update();
  // render the frame
  game.draw(ctx, canvas);

  requestAnimationFrame(update); // get next farme
}
requestAnimationFrame(update); // start animation

function resizeCanvas() {
  global.canvasSize = {
    width: window.innerWidth - optionsSidebar.getBoundingClientRect().width,
    height: window.innerHeight,
  };

  canvas.width = global.canvasSize.width;
  canvas.height = global.canvasSize.height;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas, false);

canvas.addEventListener('mousemove', (event) => {
  const cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
  global.mousePos.x = Math.round(event.clientX - cRect.left); // Subtract the 'left' of the canvas
  global.mousePos.y = Math.round(event.clientY - cRect.top); // from the X/Y positions to make

  game.onMouseMove();
});

canvas.addEventListener('mousedown', () => {
  game.onMouseDown();
});

canvas.addEventListener('mouseup', () => {
  game.onMouseUp();
});

document.addEventListener('keydown', (event) => {
  game.onKeyDown(event);
});

document.addEventListener('keyup', () => {
  game.onKeyUp();
});
