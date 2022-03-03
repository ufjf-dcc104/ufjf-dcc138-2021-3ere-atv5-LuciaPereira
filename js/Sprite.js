
export default class Sprite{
    /*
    è responsavel por modelar algo que  se move na tela
    */
    constructor({
        x=100, 
        y=100, 
        w=20, 
        h=20, 
        assets,
        imagem,
        vx = 0,
        vy = 0,
        controlar = () => { },
        tags = [],
        } = {}) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.cena = null;
        this.mx = 0;
        this.my = 0;
        controlar = controlar;
        this.assets =  this.assets;
        this.imagem = imagem;
        this.tags = new Set();
        tags.forEach(tag => this.tags.add(tag));        
    }
    desenhar(ctx,assets){
        if(this.imagem == "garoto"){
            ctx.drawImage(this.cena.assets.img("garoto"), 2, 2*64, 64, 64, this.x -24, this.y , 35, 35);                      
        }
    }
    controlar(dt){
    }
    mover(dt){
        this.x = this.x + this.vx*dt;
        this.y = this.y + this.vy*dt;
        this.mx = Math.floor(this.x/this.cena.mapa.SIZE);
        this.my = Math.floor(this.y/this.cena.mapa.SIZE);
    }
    passo(dt){
       this.controlar(dt);
       this.mover(dt);
    }
    colidiuCom(outro){
        return !(
            (this.x - this.w/2 > outro.x + outro.w/2) || 
            (this.x + this.w/2 < outro.x - outro.w/2) ||
            (this.y - this.h/2 > outro.y + outro.h/2) || 
            (this.y + this.h/2 < outro.y - outro.h/2)
        );
    }
    aplicaRestricoes(dt){
       
        this.aplicaRestricoesDireita(this.mx + 1,this.my -1);
        this.aplicaRestricoesDireita(this.mx + 1,this.my);
        this.aplicaRestricoesDireita(this.mx + 1,this.my +1);
        this.aplicaRestricoesEsquerda(this.mx -1,this.my -1);
        this.aplicaRestricoesEsquerda(this.mx -1,this.my);
        this.aplicaRestricoesEsquerda(this.mx -1,this.my + 1);
        this.aplicaRestricoesBaixo(this.mx -1,this.my + 1);
        this.aplicaRestricoesBaixo(this.mx,this.my + 1);
        this.aplicaRestricoesBaixo(this.mx + 1,this.my + 1);
        this.aplicaRestricoesCima(this.mx - 1, this.my -1);  
        this.aplicaRestricoesCima(this.mx, this.my -1);
        this.aplicaRestricoesCima(this.mx +1, this.my -1);   
    }
    aplicaRestricoesDireita(pmx,pmy){
        const SIZE = this.cena.mapa.SIZE;
        if(this.vx>0){
            if(this.cena.mapa.tiles[pmy][pmx] !== 0){
                const tile = {
                    x:pmx*SIZE + SIZE/2, 
                    y:pmy*SIZE + SIZE/2,  
                    w:SIZE, 
                    h:SIZE
                };
                if(this.colidiuCom(tile)){
                    this.vx =0;
                    this.x = tile.x - tile.w/2 - this.w/2 -1;
                }
            }
        }
                    
    }
    aplicaRestricoesEsquerda(pmx,pmy){
        const SIZE = this.cena.mapa.SIZE;
        if(this.vx<0){
            if(this.cena.mapa.tiles[pmy][pmx] !== 0){
                const tile = {
                    x:pmx*SIZE + SIZE/2, 
                    y:pmy*SIZE + SIZE/2,  
                    w:SIZE, 
                    h:SIZE
                };
               
                if(this.colidiuCom(tile)){
                    this.vx =0;
                    this.x = tile.x + tile.w/2 + this.w/2 + 1;
                }
            }
        }
                    
    }
    
    
    aplicaRestricoesBaixo(pmx, pmy){
        const SIZE = this.cena.mapa.SIZE;
        if(this.vy>0){
            if(this.cena.mapa.tiles[pmy][pmx] !== 0){
                const tile = {
                    x:pmx*SIZE + SIZE/2, 
                    y:pmy*SIZE + SIZE/2,  
                    w:SIZE, 
                    h:SIZE
                };
               
                if(this.colidiuCom(tile)){
                    this.vy =0;
                    this.y = tile.y - tile.h/2 - this.h/2 -1;
                }
            }
        }
                    
    }
    aplicaRestricoesCima(pmx,pmy){
        const SIZE = this.cena.mapa.SIZE;
        if(this.vy<0){
            if(this.cena.mapa.tiles[pmy][pmx] !==0){
                const tile = {
                    x:pmx*SIZE + SIZE/2, 
                    y:pmy*SIZE + SIZE/2,  
                    w:SIZE, 
                    h:SIZE
                };
                
                if(this.colidiuCom(tile)){
                    this.vy =0;
                    this.y = tile.y + tile.h/2 + this.h/2 + 1;
                }
            }
        }
                    
    }
}