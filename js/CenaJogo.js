import Cena from './Cena.js'
import Mapa from "./Mapa.js"
import PcSprite from './PcSprite.js'
import InimigoSprite from './InimigoSprite.js'
import modeloMapa1 from './maps/mapa1.js'
import GeraSprite from './GeraSprite.js'
import SpriteSaida from './SpriteSaida.js'

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (!this.aRemover.includes(a));
            this.aRemover.push(a);

        if (!this.aRemover.includes(b));
            this.aRemover.push(b);

        if (a.tags.has('pc') && b.tags.has('enemy')) {
            this.game.selecionaCena('fim');
        }
    }
    preparar() {
        super.preparar();
        const mapa1 = new Mapa();
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new PcSprite({ x: 96, y: 96,image: this.assets?.getImage("garota"), tags: ["pc"],});
        
        this.adicionar(pc);

        const en1 = new InimigoSprite({
            x: 12 * 64 + 10,
            image: this.assets?.getImage("orc"),
            tags: ["enemy"],
          });
          const en2 = new InimigoSprite({
            x: 6 * 64 + 10,
            image: this.assets?.getImage("garoto"),
            tags: ["enemy"],
          });
          const en3 = new InimigoSprite({
            x: 64 + 10,
            y: 3 * 64 + 10,
            image: this.assets?.getImage("orc"),
            tags: ["enemy"],
          });
          en1.escolheAlvo(pc);
          en2.escolheAlvo(pc);
          en3.escolheAlvo(pc);
          this.adicionar(en1);
          this.adicionar(en2);
          this.adicionar(en3);

          const gerar = new GeraSprite(this);
            for (let i = 0; i < 5; i++) {
            gerar.create("coin", ["coin"]);
        }

        const sair = new SpriteSaida({
            x: 64 * 13 -16,
            y: 64 * 9 - 10,
            image: this.assets?.getImage("sair"),
            tags: ["sair"],
            p: 0,
            poses: [{ row: 0, init: 0, end: 4, vel: 5, action: "abrir" }]
        });
        this.adicionar(sair);
  

    }
}
        
    
    

