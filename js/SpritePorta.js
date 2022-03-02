import Sprite from './Sprite.js'

export default class SpritePorta extends Sprite {
  desenhar(ctx) {
    ctx.drawImage(
      this.cena.assets.img("porta"),
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  }
}