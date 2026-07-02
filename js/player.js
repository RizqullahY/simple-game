class Player {
  constructor(canvas) {
    this.canvas = canvas;

    this.width = 64;
    this.height = 64;

    // jarak dari bawah canvas
    this.groundOffset = 40;
    
    // posisi ground sebenarnya
    this.groundY = this.canvas.height - this.height - this.groundOffset;

    // posisi awal (berdiri di lantai)
    // this.groundY = this.canvas.height - this.height;
    
    this.x = 100;
    this.y = this.groundY;

    this.velocityY = 0;
    this.gravity = 0.6;
    this.jumpPower = -13;
    this.speed = 4;

    this.frameIndex = 0;
    this.frameTimer = 0;
    this.frameInterval = 120;

    this.state = "idle";
    this.facing = "right";

    this.animations = {
      idle: [],
      walk: [],
      jump: []
    };

    this.loadFrames("idle", 4);
    this.loadFrames("walk", 4);
    this.loadFrames("jump", 4);
  }

  loadFrames(state, count) {
    for (let i = 1; i <= count; i++) {
      const img = new Image();
      img.src = `assets/player/${state}-${i}.png`;
      this.animations[state].push(img);
    }
  }

  update(deltaTime, keys) {
    let moving = false;

    // kanan
    if (keys["ArrowRight"]) {
      this.x += this.speed;
      this.state = "walk";
      this.facing = "right";
      moving = true;
    }

    // kiri
    if (keys["ArrowLeft"]) {
      this.x -= this.speed;
      this.state = "walk";
      this.facing = "left";
      moving = true;
    }

    // lompat
    if ((keys[" "] || keys["ArrowUp"]) && this.y >= this.groundY) {
      this.velocityY = this.jumpPower;
    }

    // gravity
    this.y += this.velocityY;
    this.velocityY += this.gravity;

    // collision dengan ground
    if (this.y > this.groundY) {
      this.y = this.groundY;
      this.velocityY = 0;
    }

    // state animasi
    if (this.y < this.groundY) {
      this.state = "jump";
    } else if (!moving) {
      this.state = "idle";
    }

    // animasi frame
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameIndex++;
      if (this.frameIndex >= this.animations[this.state].length) {
        this.frameIndex = 0;
      }
      this.frameTimer = 0;
    }

    // batas layar
    if (this.x < 0) this.x = 0;
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  draw(ctx) {
    const currentImage = this.animations[this.state][this.frameIndex];

    ctx.save();

    if (this.facing === "left") {
      ctx.scale(-1, 1);
      ctx.drawImage(
        currentImage,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(
        currentImage,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    ctx.restore();
  }
}