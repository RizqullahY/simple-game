class ParallaxLayer {
  constructor(imageSrc, speedModifier, canvas) {
    this.image = new Image();
    this.image.src = imageSrc;

    this.speedModifier = speedModifier;
    this.canvas = canvas;

    this.x = 0;
    this.width = canvas.width;
    this.height = canvas.height;
  }

    update(worldSpeed) {
    this.x -= worldSpeed * this.speedModifier;

    // Loop seamless kiri & kanan
    if (this.x <= -this.width) {
        this.x += this.width;
    }

    if (this.x >= this.width) {
        this.x -= this.width;
    }
    }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, 0, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
    ctx.drawImage(this.image, this.x - this.width, 0, this.width, this.height);
  }
}