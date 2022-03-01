import Sprite from "./Sprite.js";

export default class InimigoSprite extends Sprite {
  desenhar(ctx, dt) {
        this.executar(dt);
    super.desenhar(ctx, dt);
  }

  escolheAlvo(alvo) {
    this.alvo = alvo;
      if (alvo.x < this.x) {
        this.p = 1;
      } else {
        this.p = 3;
      }
  }

  controlar(dt) {
    this.vx = 30 * Math.sign(this.alvo.x - this.x);
    this.vy = 30 * Math.sign(this.alvo.y - this.y);
    if (this.vx < 0) {
      this.p = 1;
    } else if (this.vx > 0) {
      this.p = 3;
    } else if (this.vy < 0) {
      this.p = 0;
    } else if (this.vy > 0) {
      this.p = 2;
    }
  }
}