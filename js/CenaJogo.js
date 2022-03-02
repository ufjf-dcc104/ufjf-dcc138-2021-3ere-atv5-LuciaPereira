import Cena from './Cena.js'
import Mapa from "./Mapa.js"
import Sprite from './Sprite.js'
import modeloMapa1 from './maps/mapa1.js'


export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (a.tags.has("pc") && b.tags.has("saida")) {
            this.game.selecionaCena("vitoria");
        }
        else if (a.tags.has("pc") && b.tags.has("coin")) {
            this.aRemover.push(b);
            this.assets.play("coin");
            super.atualizaPontos();
        } 
        else {
            if (a.tags.has("pc") || (a.tags.has("enemy") && b.tags.has("enemy")))
            {
                if (!this.toRemove.includes(a)) {
                    this.toRemove.push(a);
                    this.assets.play("boom");
                }
                if (!this.aRemover.includes(b)) {
                    this.aRemover.push(b);
                    this.assets.play("boom");
                }
            }
            if (a.tags.has("pc") && b.tags.has("enemy")) 
            {
                this.game.selecionaCena("fim");
            }
        }
    
    }
    


    preparar(modeloMapa = modeloMapa1) {
        super.preparar(modeloMapa);
        this.atual = modeloMapa;
        const mapa1 = new Mapa(10,14,32);
        mapa1.carregaMapa(modeloMapa);
        this.configuraMapa(mapa1);

        const pc = new Sprite({ x: 50, y: 275 });
        //
        const cena = this;
        pc.controlar = function (dt) {
        if (cena.input.comandos.get("MOVE_LEFT")) {
            this.vx = -150;
        } else if (cena.input.comandos.get("MOVE_RIGHT")) {
            this.vx = +150;
        } else {
            this.vx = 0;
        }

        if (cena.input.comandos.get("MOVE_UP")) {
            this.vy = -150;
        } else if (cena.input.comandos.get("MOVE_DOWN")) {
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
      
          const en1 = new Sprite({   
            x: 360,
            color: "red",
            controlar: perserguirPC,
            tags: ["enemy"],
          });
          this.adicionar(en1);

          this.adicionar(
            new Sprite({
              x: 55,
              y: 160,
              color: "yellow",
              tags: ["coin"],
            })
          );
      
          this.adicionar(
            new Sprite({
              x: 345,
              y: 60,
              color: "yellow",
              tags: ["coin"],
            })
          );
      
          this.adicionar(
            new Sprite({
              x: 275,
              y: 260,
              color: "yellow",
              tags: ["coin"],
            })
          );
      
          this.adicionar(
            new Sprite({
              x: 400,
              y: 250,
              color: "blue",
              tags: ["porta"],
            })
          );
          
          this.adicionar(
            new Sprite({
              x: 115,
              y: 70,
              vy: 10,
              color: "red",
              controlar: perserguirPC,
              tags: ["enemy"],
            })
          );
          this.adicionar(
            new Sprite({
              x: 115,
              y: 160,
              vy: -10,
              color: "red",
              controlar: perserguirPC,
              tags: ["enemy"],
            })
          );
      
          
        }
      }
      
    

