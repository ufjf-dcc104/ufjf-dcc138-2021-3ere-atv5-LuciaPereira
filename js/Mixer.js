export default class Mixer{
    constructor(numCanais){
        this.CANAIS = 0;
        this.canais = [];
        this.configuraCanais(numCanais);
    }
    configuraCanais(numCanais=50){
        this.CANAIS = numCanais;
        this.canais = [];
        for (let c = 0;c <this.CANAIS; c++ ) {
            const canal = {
                end: new Date().getTime(),
                audio: new Audio()
            };
            this.canais[c] = canal;            
        }
    }
    play(audio){
        const agora = new Date().getTime();
        for (let c = 0;c <this.CANAIS; c++ ) {
            const canal =   this.canais[c];
            if(canal.end < agora){
                canal.audio.src = audio.src;
                canal.end = agora + audio.duration * 1000;
                canal.audio.volume = 0.5;
                canal.audio.play();
                //console.log(`play canal ${c}${canal.fim}`);
                break;

            }            
        }
    }
}