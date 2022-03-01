import Sprite from "./Sprite.js";

export default class SpriteSaida extends Sprite {
    executar(dt) {
        this.quadro =
          this.quadro > this.poses[this.p].end
            ? this.poses[this.p].end
            : this.quadro + this.poses[this.p].vel * dt;
      }
    desenhar(ctx, dt) {
    if (this.cena.game.pontos >= 10) {
        this.executar(dt);
      }
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