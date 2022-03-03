import InputManager from "./InputManager.js";
import Mixer from "./Mixer.js";
import AssetManager from "./AssetManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js"
import CenaJogo2 from "./CenaJogo2.js"
import CenaCarregando from "./CenaCarregando.js"
import CenaFim from "./CenaFim.js"



const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("arvores","assets/arvores.png");
assets.carregaImagem("chao","assets/chao.png");
assets.carregaImagem("parede","assets/parede.png");
assets.carregaImagem("moeda","assets/moeda.png");
assets.carregaImagem("porta","assets/porta.png");
assets.carregaImagem("garoto","assets/garoto.png");
assets.carregaImagem("ghost","assets/ghost.png");
assets.carregaAudio("hurt","assets/hurt.wav"); 
assets.carregaAudio("coin","assets/coin.wav");
assets.carregaAudio("boom","assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 14*32;
canvas.height = 10*32;

input.configurarTeclado({
    ArrowLeft : "MOVE_ESQUERDA",
    ArrowRight : "MOVE_DIREITA",
    ArrowUp : "MOVE_CIMA",
    ArrowDown : "MOVE_BAIXO",
    ' ': 'PROXIMA_CENA'
});
const game = new Game(canvas,assets,input);
const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaJogo2();
const cena3 = new CenaFim();
const cena4 = new CenaVitoria();

game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo",cena1);
game.adicionarCena("jogo2",cena2);
game.adicionarCena("fim", cena3);
game.adicionarCena("vitoria", cena4);

game.iniciar();


