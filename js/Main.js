import InputManager from "./InputManager.js";
import Mixer from "./Mixer.js";
import AssetManager from "./AssetManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js"
import CenaCarregando from "./CenaCarregando.js"
import CenaFim from "./CenaFim.js"
import CenaVitoria from "./CenaVitoria.js";


const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto","assets/garoto.png");
assets.carregaImagem("ghost","assets/ghost.png");
assets.carregaImagem("chao","assets/chao.png");
assets.carregaImagem("parede","assets/parede.png");
assets.carregaImagem("coin","assets/coin.png");
assets.carregaImagem("clay","assets/clay.png");
assets.carregaImagem("porta","assets/porta.png");
assets.carregaAudio("moeda","assets/coin.wav");
assets.carregaAudio("boom","assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 16*64;
canvas.height = 14*64;

input.configurarTeclado({
    "ArrowLeft" : "MOVE_ESQUERDA",
    "ArrowRight" : "MOVE_DIREITA",
    "ArrowUp" : "MOVE_CIMA",
    "ArrowDown" : "MOVE_BAIXO",
    ' ': 'PROXIMA_CENA'
});
const game = new Game(canvas,assets,input);
const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaFim();
const cena3 = new CenaVitoria();
game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo",cena1);
game.adicionarCena("fim", cena2);
game.adicionarCena("vitoria", cena3);

game.iniciar();

document.addEventListener("keydown" , (e)=>{
    switch (e.key) {
        case "s":
            game.iniciar();
            break;
            case "S":
                game.parar();
                break;
                case "c":
                    assets.play("moeda");
                    break;
                    case "b":
                        assets.play("boom");
                        break;
                        default:
                        break;                      

     
    }
});
