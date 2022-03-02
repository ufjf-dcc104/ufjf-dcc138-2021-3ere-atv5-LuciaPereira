
import Cena from "./Cena.js"
import Sprite from "./Sprite.js"
import Mapa from "./Mapa.js"
import modeloMapa2 from "./maps/mapa2.js"

export default class CenaJogo2 extends Cena {
    quandoColidir(a, b) {    
    if ((a.tags.has("pc") && b.tags.has("hurt")) ||(b.tags.has("pc") && a.tags.has("hurt")))
    {
      this.assets.play("hurt");
      this.game.selecionaCena("fim");
      return;
    }
    if ((a.tags.has("pc") && b.tags.has("coin")) || (b.tags.has("pc") && a.tags.has("coin"))) 
    {
        if (!this.aRemover.includes(a) && a.tags.has("coin"))
            this.aRemover.push(a);
        if (!this.aRemover.includes(b) && b.tags.has("coin"))
            this.aRemover.push(b);
        this.assets.play("coin");
        super.atualizaPontos();
        return;
    }
    if (!this.aRemover.includes(a))
         this.aRemover.push(a);
    if (!this.aRemover.includes(b)) 
        this.aRemover.push(b);

    if (a.tags.has("pc") && b.tags.has("enemy") || b.tags.has("pc") && a.tags.has("enemy")) 
    {
        this.game.selecionaCena("fim");
    }

  }

  preparar() {
    super.preparar();
    const mapa2 = new Mapa(10, 14, 32);
    mapa2.carregaMapa(modeloMapa2);
    this.configuraMapa(mapa2);
    this.adicionaSprites(3, perserguirPC, false);
    this.geraSprite(4000);
    
    const pc = new Sprite({ x: 50, y: 275 });
    pc.tags.add("pc");
    const cena = this;
    pc.controlar = function (dt) {
      if (cena.input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -150;
      } else if (cena.input.comandos.get("MOVE_DIREITA")) {
        this.vx = +150;
      } else {
        this.vx = 0;
      }

      if (cena.input.comandos.get("MOVE_CIMA")) {
        this.vy = -150;
      } else if (cena.input.comandos.get("MOVE_BAIXO")) {
        this.vy = +150;
      } else {
        this.vy = 0;
      }
    };
    this.adicionar(pc);

    function perserguirPC(dt) {
      this.vx = 25 * Math.sign(pc.x - this.x);
      this.vy = 25 * Math.sign(pc.y - this.y);
    }

    const en1 = new Sprite({x: 360,color: "red",controlar: perserguirPC,tags: ["enemy"],});
    this.adicionar(en1);

    this.adicionar(new Sprite({ x: 115,y: 70,vy: 10,color: "red",controlar: perserguirPC,tags: ["enemy"],}));
    this.adicionar(new Sprite({x: 115,y: 160,vy: -10,color: "red",controlar: perserguirPC,tags: ["enemy"],}));

    this.adicionar(new Sprite({x: 50,y: 50,color: "yellow",tags: ["coin"],}));
    
    this.adicionar(new Sprite({x: 345,y: 60,color: "yellow",tags: ["coin"],}));
  
    this.adicionar(new Sprite({x: 205, y: 260,color: "yellow",tags: ["coin"],}));
  
    this.adicionar( new Sprite({x: 400,y: 270, color: "blue",tags: ["hurt"],}));

       
  }
}
  