import Sprite from "./Sprite.js"
import SpriteInimigo from "./SpriteInimigo.js";
export default class Cena{
    /* E responsavel por desenhar elementos na tela eum uma animaçãco
    */
   
    constructor(canvas=null, assets=null){
        this.canvas = canvas;
        this.ctx = canvas?.getContext("2d");       
        this.assets = assets;
        this.game = null;
        this.sprites = [];
        this.pontos = 0;
        this.preparar();
        
    }
    desenhar(){
        this.ctx.fillStyle = "#2f8136";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.mapa?.desenhar(this.ctx, this.assets);
        
        if(this.assets.acabou()){
            for (let s = 0; s < this.sprites.length; s++) {
            const sprite = this.sprites[s];
            sprite.desenhar(this.ctx);
            sprite.aplicaRestricoes()
            }            
        }
        
    }
    adicionar(sprite){
        sprite.cena = this;
        this.sprites.push(sprite);
    }
    passo(dt){
        if(this.assets.acabou()){
            for (const sprite of this.sprites) {
                sprite.passo(dt);                
            }
        }        
    }
    quadro(t){
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        this.passo(this.dt);
        this.desenhar();
        this.checaColisao();
        this.removerSprites();
        
        if (this.rodando){ this.iniciar();}
        this.t0 = t;
    }
    iniciar(){
        this.rodando = true;
        this.idAdnin = requestAnimationFrame((t) => this.quadro(t));
    }
    parar(){
        this.rodando = false;
        cancelAnimationFrame(this.idAdnin);
        this.t0 = null;
        this.dt = 0;
    }
    checaColisao(){
        for (let a = 0; a < this.sprites.length - 1; a++) {
            const spriteA = this.sprites[a];
            for (let b = a + 1; b < this.sprites.length; b++) {
                const spriteB = this.sprites[b];
                if (spriteA.colidiuCom(spriteB) )  {
                    //this.assets.play("hurt");
                    this.quandoColidir(spriteA,spriteB); 
                }
                           
            }
        }
    }
    quandoColidir(a, b){
        if(this.aRemover.includes(a)){
            this.aRemover.push(a); 
            
        }
        if (!this.aRemover.includes(b)) {
            this.aRemover.push(b); 
        }
        this.assets.play("hurt");
        console.log(this.aRemover);
    }
    removerSprites(){
        for(const alvo of this.aRemover){
            const idx = this.sprites.indexOf(alvo);
            if(idx >= 0){
                this.sprites.splice(idx,1);
            }
        }
      this.aRemover = []; 
    }
    configuraMapa(mapa){
        this.mapa = mapa;
        this.mapa.cena = this;
    }
    preparar() {
        this.sprites = [];
        this.aRemover = [];
        this.t0 = null;
        this.dt = 0;
        this.idAnim = null;
        this.mapa = null;
        this.rodando = true;
        
    }
    atualizaPontos(){
        document.getElementById("pontos").textContent = parseInt(document.getElementById("pontos").textContent) + 1;
    }
    criaSprites(num = 1, per, randomC) {
        let sprites = [];
        for (let i = 0; i < num; i++) {
          let sprite = new SpriteInimigo({
            x: this.getRandomInt(40, 400),
            y: this.getRandomInt(50, 275),
            vx: this.getRandomInt(-10, 10),
            vy: this.getRandomInt(-10, 10),
            imagem: randomC == true ? this.getRandomC() : "ghost", 
            tags: ["boom"],
            controlar: per,
    
          });
          sprites.push(sprite);
        }
        return sprites;
    }
    adicionaSprites(num, per, randomC)
    {
      let sprites = this.criaSprites(num, per, randomC);
      for (let i = 0; i < sprites.length; i++) {
        this.adicionar(sprites[i]);
      }
    }
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
      getRandomC() {
        let letters = "0123456789ABCDEF";
        let imagem = "#";
        for (let i = 0; i < 6; i++) {
          imagem += letters[Math.floor(Math.random() * 16)];
        }
        return imagem;
      }
      geraSprite(interval){
          setInterval(() => { this.adicionaSprites(1);}, interval);
      
      }
      
    
     
    
}