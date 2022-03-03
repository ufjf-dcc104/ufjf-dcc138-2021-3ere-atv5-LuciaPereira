import Sprite from './Sprite.js'

export default class SpriteInimigo extends Sprite {
  desenhar(ctx) {
    ctx.drawImage(
      this.cena.assets.img("ghost"),
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w +8,
      this.h +8
    );
  }
}