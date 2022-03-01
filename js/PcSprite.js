import Sprite from "./Sprite.js";

export default class PcSprite extends Sprite {
  desenhar(ctx, dt) {
    if (this.vx || this.vy) {
         this.executar(dt);
    } else {
      this.quadro = 0;
    }

    super.desenhar(ctx, dt);
  }

  controlar(dt) {
    if (this.cena.input.comandos.get("MOVE_LEFT")) {
      this.vx = -64;
      this.p = 1;
    } else if (this.cena.input.comandos.get("MOVE_RIGHT")) {
      this.vx = 64;
      this.p = 3;
    } else {
      this.vx = 0;
    }
    if (this.cena.input.comandos.get("MOVE_UP")) {
      this.vy = -64;
      this.p = 0;
    } else if (this.cena.input.comandos.get("MOVE_DOWN")) {
      this.vy = 64;
      this.p = 2;
    } else {
      this.vy = 0;
    }
  }
}