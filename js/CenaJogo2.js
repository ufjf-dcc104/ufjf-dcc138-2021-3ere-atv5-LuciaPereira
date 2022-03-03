
import Cena from "./Cena.js"
import Sprite from "./Sprite.js"
import Mapa from "./Mapa.js"
import modeloMapa2 from "./maps/mapa2.js"
import SpriteMoeda from "./SpriteMoeda.js";
import SpritePorta from "./SpritePorta.js";
import SpriteInimigo from "./SpriteInimigo.js";

export default class CenaJogo2 extends Cena {
    quandoColidir(a, b) {    
    if ((a.tags.has("pc") && b.tags.has("hurt")) ||(b.tags.has("pc") && a.tags.has("hurt")))
    {
      this.assets.play("hurt");
      this.game.selecionaCena("vitoria");
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
    if (!this.aRemover.includes(a)){
         this.aRemover.push(a);}
    if (!this.aRemover.includes(b)) {
        this.aRemover.push(b);}

    if (a.tags.has("pc") && b.tags.has("boom") || b.tags.has("pc") && a.tags.has("boom")) 
    {
      this.assets.play("boom");
      this.game.selecionaCena("fim");
    }
    //this.assets.play("boom");
    console.log(this.aRemover);

  }

  preparar() {
    super.preparar();
    const mapa2 = new Mapa(10, 14, 32,this.assets);
    mapa2.carregaMapa(modeloMapa2);
    this.configuraMapa(mapa2);
    this.adicionaSprites(3, perseguirPC, false);
    this.geraSprite(4000);
    
    const pc = new Sprite({x: 50, vx: 275, imagem: "garoto", assets:this.assets});
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

    function perseguirPC() {
      this.vx = 25 * Math.sign(pc.x - this.x);
      this.vy = 25 * Math.sign(pc.y - this.y);
    }

    const en1 = new SpriteInimigo({x: 360,y:250, cena: this,controlar: perseguirPC,tags: ["boom"]});
    en1.controlar = perseguirPC;
    this.adicionar(en1);

    const en2 = new SpriteInimigo({ x: 115,y: 70,vy: 10,cena: this,controlar: perseguirPC,tags: ["boom"]});
    en2.controlar = perseguirPC;
    this.adicionar(en2);

    const en3 = new SpriteInimigo({x: 115,y: 160,vy: -10,cena: this,controlar: perseguirPC,tags: ["boom"]});
    en3.controlar = perseguirPC;
    this.adicionar(en3);

    this.adicionar(new SpriteMoeda({x: 50,y: 50,cena: this,tags: ["coin"],}));
    
    this.adicionar(new SpriteMoeda({x: 345,y: 60,cena: this,tags: ["coin"],}));
  
    this.adicionar(new SpriteMoeda({x: 205, y: 260,cena: this,tags: ["coin"],}));

    this.adicionar(new SpriteMoeda({x: 200,y: 100,cena: this,tags: ["coin"],}));  
  
    this.adicionar( new SpritePorta({x: 400,y: 270, w:32, h:32, cena: this,tags: ["hurt"],}));

       
  }
  
}
  