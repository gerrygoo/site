
const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
console.log(app);
document.getElementById('canvasContainer').appendChild(app.view);
const image = new PIXI.Sprite.from('/assets/img/e3ila.png');
//image.width = window.innerWidth;
//image.height = window.innerHeight;
app.stage.addChild(image);
const displacementSprite = new PIXI.Sprite.from("/assets/img/filter.jpg");
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);


displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
app.stage.addChild(displacementSprite);

const filter = new PIXI.filters.ColorMatrixFilter();

app.stage.filters = [displacementFilter, filter];

let t = 0;
let speed = 0.3;
function animate() {
  displacementSprite.x += speed * 10;
  displacementSprite.y += speed * 4;
  requestAnimationFrame(animate);
  
  const { matrix } = filter;

  t += speed * 0.1;

  matrix[1] = Math.sin(t) * 3;
  matrix[2] = Math.cos(t);
  matrix[3] = Math.cos(t) * 1.5;
  matrix[4] = Math.sin(t / 3) * 2;
  matrix[5] = Math.sin(t / 2);
  matrix[6] = Math.sin(t / 4);
}
animate();

const resize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight); 
  image.height = window.innerHeight;
  image.width = Math.floor( (16.0/9.0) * window.innerHeight );
};
window.addEventListener('resize', resize);
