export default class Sprite{
    /*
    è responsavel por modelar algo que  se move na tela
    */
    constructor({
        x=100, 
        y=100, 
        w=20, 
        h=20, 
        color = "white", vx = 0, vy = 0,
        controlar = () => { },
        tags = [],
        image, 
        p = 3,
        poses = [
            { row: 8, init: 0, end: 8, vel: 5, action: "up" },
            { row: 9, init: 0, end: 8, vel: 5, action: "left" },
            { row: 10, init: 0, end: 8, vel: 5, action: "down" },
            { row: 11, init: 0, end: 8, vel: 5, action: "right" },
          ]
        } = {}) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.color = color;
        this.cena = null;
        this.mx = 0;
        this.my = 0;
        this.tags = new Set();
        tags.forEach(tag => this.tags.add(tag));
        this.p = p;
        this.poses = poses;
        this.image = image;
        this.quadro = this.poses[this.p].init;
    }
    desenhar(ctx,dt){
                //console.log(typeof images[this.spriteCostumeCount]);
                ctx.drawImage(
                this.cena.assets.img("ghost"), 
                Math.floor(this.quadro) * 64,
                this.poses[this.p].row * 64,
                64,
                64,
                this.x - this.cena.mapa.SIZE/2,
                this.y - this.cena.mapa.SIZE/2 - this.h,
                this.cena.mapa.SIZE,
                this.cena.mapa.SIZE);                
   }
    executar(dt) {
        this.quadro =
          this.quadro > this.poses[this.p].end
            ? this.poses[this.p].init
            : this.quadro + this.poses[this.p].vel * dt;
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
        const aplica = [
            { pmx: this.mx + 1, pmy: this.my - 1, direcao: "Direita" },
            { pmx: this.mx + 1, pmy: this.my, direcao: "Direita" },
            { pmx: this.mx + 1, pmy: this.my + 1, direcao: "Direita" },
            { pmx: this.mx - 1, pmy: this.my - 1, direcao: "Esquerda" },
            { pmx: this.mx - 1, pmy: this.my, direcao: "Esquerda" },
            { pmx: this.mx - 1, pmy: this.my + 1, direcao: "Esquerda" },
            { pmx: this.mx - 1, pmy: this.my + 1, direcao: "Baixo" },
            { pmx: this.mx, pmy: this.my + 1, direcao: "Baixo" },
            { pmx: this.mx + 1, pmy: this.my + 1, direcao: "Baixo" },
            { pmx: this.mx - 1, pmy: this.my - 1, direcao: "Cima" },
            { pmx: this.mx, pmy: this.my - 1, direcao: "Cima" },
            { pmx: this.mx + 1, pmy: this.my - 1, direcao: "Cima" },
          ];
          for (const at of aplica) {
            const SIZE = this.cena.mapa.SIZE;
            const tile = {
              x: at.pmx * SIZE + SIZE / 2,
              y: at.pmy * SIZE + SIZE / 2,
              w: SIZE,
              h: SIZE,
            };
            this[`aplicaRestricoes${at.direcao}`](at.pmx, at.pmy, tile);
          }
       /* this.aplicaRestricoesDireita(this.mx + 1,this.my -1);
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
        this.aplicaRestricoesCima(this.mx +1, this.my -1);  */ 
    }
    aplicaRestricoesDireita(pmx,pmy,tile){
        //const SIZE = this.cena.mapa.SIZE;
        if(this.vx>0){
            if(this.cena.mapa.tiles[pmy][pmx] !== 0){
                if (this.colidiuCom(tile)) {
                    this.vx = 0;
                    this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
                  }
                /*const tile = {
                    x:pmx*SIZE + SIZE/2, 
                    y:pmy*SIZE + SIZE/2,  
                    w:SIZE, 
                    h:SIZE
                };
               this.cena.ctx.strokeStyle = "white";
               this.cena.ctx.strokeRect(tile.x - SIZE/2, tile.y-SIZE/2, SIZE,SIZE)
                if(this.colidiuCom(tile)){
                    this.vx =0;
                    this.x = tile.x - tile.w/2 - this.w/2 -1;
                }*/
            }
        }
                    
    }
    aplicaRestricoesEsquerda(pmx,pmy,tile){
        //const SIZE = this.cena.mapa.SIZE;
        if(this.vx<0){
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                if (this.colidiuCom(tile)) {
                  this.vx = 0;
                  this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
                }
            
            /*if(this.cena.mapa.tiles[pmy][pmx] !== 0){
                const tile = {
                    x:pmx*SIZE + SIZE/2, 
                    y:pmy*SIZE + SIZE/2,  
                    w:SIZE, 
                    h:SIZE
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(tile.x - SIZE/2, tile.y-SIZE/2, SIZE,SIZE)
                if(this.colidiuCom(tile)){
                    this.vx =0;
                    this.x = tile.x + tile.w/2 + this.w/2 + 1;
                }*/
            }
        }
                    
    }
    
    aplicaRestricoesBaixo(pmx, pmy, tile){
       // const SIZE = this.cena.mapa.SIZE;
        if(this.vy>0){
            if(this.cena.mapa.tiles[pmy][pmx] !== 0){
                
                    if (this.colidiuCom(tile)) {
                      this.vy = 0;
                      this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
                    }
                }
            }
    }
                /*const tile = {
                    x:pmx*SIZE + SIZE/2, 
                    y:pmy*SIZE + SIZE/2,  
                    w:SIZE, 
                    h:SIZE
                };
               this.cena.ctx.strokeStyle = "white";
               this.cena.ctx.strokeRect(tile.x - SIZE/2, tile.y-SIZE/2, SIZE,SIZE)
                if(this.colidiuCom(tile)){
                    this.vy =0;
                    this.y = tile.y - tile.h/2 - this.h/2 -1;
                }*/
            
        
                    
    //}
    aplicaRestricoesCima(pmx,pmy,tile){
       // const SIZE = this.cena.mapa.SIZE;
        if(this.vy<0){
            if (this.cena.mapa.tiles[pmy][pmx] != 0) {
                if (this.colidiuCom(tile)) {
                  this.vy = 0;
                  this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
                }
            }
          }
        }
      }
            /*if(this.cena.mapa.tiles[pmy][pmx] !==0){
                const tile = {
                    x:pmx*SIZE + SIZE/2, 
                    y:pmy*SIZE + SIZE/2,  
                    w:SIZE, 
                    h:SIZE
                };
                this.cena.ctx.strokeStyle = "white";
                this.cena.ctx.strokeRect(tile.x - SIZE/2, tile.y-SIZE/2, SIZE,SIZE)
                if(this.colidiuCom(tile)){
                    this.vy =0;
                    this.y = tile.y + tile.h/2 + this.h/2 + 1;
                }
            }*/
        