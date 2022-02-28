import Cena from './Cena.js'
import Mapa from "./Mapa.js"
import Sprite from './PcSprite.js'
import modeloMapa1 from './maps/mapa1.js'

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
        super.preparar()
        const mapa1 = new Mapa(16, 20, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new PcSprite({ x: 96, y: 96,image: this.assets?.getImagem("garota"), tags: ["pc"]});

        this.adicionar(pc);
        
    }
}
