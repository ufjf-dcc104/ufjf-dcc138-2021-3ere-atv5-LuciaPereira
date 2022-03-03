import Sprite from './Sprite.js'

export default class SpriteInimigo extends Sprite {
  desenhar(ctx) {
    ctx.drawImage(
      this.cena.assets.img("ghost"),
      this.x - this.w / 2 -4,
      this.y - this.h / 2 -7,
      this.w + 8,
      this.h +8
    );
  }
}