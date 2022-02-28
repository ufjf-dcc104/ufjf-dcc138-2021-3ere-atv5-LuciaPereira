import InputManager from "./InputManager.js";
import Mixer from "./Mixer.js";
import AssetManager from "./AssetManager.js";
import Sprite from "./Sprite.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js"
import CenaCarregando from "./CenaCarregando.js"
import CenaFim from "./CenaFim.js"


const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto","assets/garoto.png");
assets.carregaImagem("orc","assets/orc.png");
assets.carregaAudio("moeda","assets/coin.wav");
assets.carregaAudio("boom","assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 16*32;
canvas.height = 14*32;

input.configurarTeclado({
    "ArrowLeft" : "MOVE_ESQUERDA",
    "ArrowRight" : "MOVE_DIREITA",
    "ArrowUp" : "MOVE_CIMA",
    "ArrowDown" : "MOVE_BAIXO",
    a: "MOVE_LEFT",
    b: "MOVE_RIGHT",
    c: "MOVE_UP",
    d: "MOVE_DOWN",
    ' ': 'PROXIMA_CENA'
});
const game = new Game(canvas,assets,input);
const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaFim();
game.adicionarCena('carregando', cena0);
game.adicionarCena("jogo",cena1);


game.adicionarCena("fim", cena2);

game.iniciar();
//cena1.iniciar();
///novoInimigo();


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
                       

     
    }
});
