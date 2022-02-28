import Sprite from "./Sprite.js";

export default class SpriteSaida extends Sprite {
  draw(ctx, dt) {
    ctx.drawImage(
      this.image,
      Math.floor(this.quadro) * 16,
      this.poses[this.p].row * 32,
      16,
      32,
      this.x - this.cena.mapa.SIZE / 2,
      this.y - this.cena.mapa.SIZE / 2 - this.h,
      this.cena.mapa.SIZE/2,
      this.cena.mapa.SIZE
    );
  }
}