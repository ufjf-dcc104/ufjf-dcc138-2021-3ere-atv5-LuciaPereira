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
        this.cena.assets.img("porta"),
        this.x - this.w / 2,
        this.y - this.h / 2
      );
    
  }
}