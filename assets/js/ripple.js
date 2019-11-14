
let speed = 0.3;
const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
document.getElementById('canvasContainer').appendChild(app.view);

// background
const imageDimensions = ({ w: rw, h: rh } = ({ w: 16, h: 9 })) => 
  window.innerWidth * rh <= window.innerHeight * rw ?
  ({ w: (rw/rh) * window.innerHeight, h: window.innerHeight }) :
  ({ w: window.innerWidth,  h: (rh/rw) * window.innerWidth });

const clampToScreen = image => {
  const {w, h} = imageDimensions();
  image.height = h;
  image.width = w;
};

const image = new PIXI.Sprite.from('/assets/img/e3ila.png');
clampToScreen(image);
app.stage.addChild(image);

// filters
const displacementSprite = new PIXI.Sprite.from("/assets/img/filter.jpg");
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
app.stage.addChild(displacementSprite);
const displaceSprite = () => {
  displacementSprite.x += speed * 10;
  displacementSprite.y += speed * 4;
};

const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
const colorFilter = new PIXI.filters.ColorMatrixFilter();
app.stage.filters = [displacementFilter, colorFilter];
const shiftColors = t => {
  const { matrix } = colorFilter;
  matrix[1] = Math.sin(t) * 3;
  matrix[2] = Math.cos(t);
  matrix[3] = Math.cos(t) * 1.5;
  matrix[4] = Math.sin(t / 3) * 2;
  matrix[5] = Math.sin(t / 2);
  matrix[6] = Math.sin(t / 4);
};

// animation
let t = 0;
const animate = () => {
  requestAnimationFrame(animate); 
  displaceSprite();
  shiftColors(t);
  t += speed * 0.1;
}
animate();

// responsiveness
const resize = () => {
  const {w, h} = imageDimensions();
  app.renderer.resize(w, h);
  clampToScreen(image);
};
window.addEventListener('resize', resize);
