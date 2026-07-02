const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 400;

// ================= INPUT =================
const keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// ================= WORLD SPEED =================
let worldSpeed = 0;

// ================= INIT OBJECT =================
const player = new Player(canvas);

const layers = [
  new ParallaxLayer("assets/sky.png", 0.1, canvas),
  new ParallaxLayer("assets/forest.png", 0.5, canvas),
  // new ParallaxLayer("assets/foreground.png", 1.0, canvas),
];

// ================= UPDATE =================
function update(deltaTime) {

  player.update(deltaTime, keys);

  if (keys["ArrowRight"]) {
    worldSpeed = player.speed;
  } else if (keys["ArrowLeft"]) {
    worldSpeed = -player.speed;
  } else {
    worldSpeed = 0;
  }

  layers.forEach(layer => layer.update(worldSpeed));
}

// ================= DRAW =================
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  layers.forEach(layer => layer.draw(ctx));
  player.draw(ctx);
}

// ================= LOOP =================
let lastTime = 0;

function gameLoop(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  update(deltaTime);
  draw();

  requestAnimationFrame(gameLoop);
}

gameLoop(0);