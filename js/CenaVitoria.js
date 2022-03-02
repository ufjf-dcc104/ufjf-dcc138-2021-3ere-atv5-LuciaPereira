import Cena from './Cena.js'
export default class CenaVitoria extends Cena {
  desenhar() {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "20px Impact";
    this.ctx.fillStyle = "green";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
        "Parabéns, você ganhou!",
      this.canvas.width / 2,
      this.canvas.height / 2
    );

    this.ctx.fillText(
      "Pontos: "+ document.getElementById("pontos").textContent,
      this.canvas.width / 2,
      this.canvas.height / 2 + 40
    );

    if (this.assets.acabou()) {
      this.ctx.fillText(
        'Aperte espaço para jogar novamente',
        this.canvas.width / 2,
        this.canvas.height / 2 + 80
      );
    }

  }

  quadro(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    if (this.assets.acabou() && this.input.comandos.get("PROXIMA_CENA")) {
      this.game.selecionaCena('jogo');
      return;
    }
    this.desenhar();
    this.iniciar();
    this.t0 = t;
  }
}
