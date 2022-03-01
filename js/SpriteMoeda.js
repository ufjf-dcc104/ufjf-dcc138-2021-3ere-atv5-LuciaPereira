import Sprite from "./Sprite.js";

export default class SpriteMoeda extends Sprite {
  draw(ctx, dt) {
    this.executar(dt);
    ctx.drawImage(
      this.cena.assets.img("coin"),
      Math.floor(this.quadro) * 16,
      this.poses[this.p].row * 16,
      16,
      16,
      this.x - this.cena.mapa.SIZE / 2,
      this.y - this.cena.mapa.SIZE / 2 - this.h,
      this.cena.mapa.SIZE / 2,
      this.cena.mapa.SIZE / 2
    );
  }
}