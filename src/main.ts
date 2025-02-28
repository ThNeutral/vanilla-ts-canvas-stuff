import "./style.css";
import { Game, GameConfig } from "./game/Game.ts";
import { initializeCanvas } from "./utils/Utils.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <canvas id="canvas" />
`;

const canvas = document.querySelector<HTMLCanvasElement>("canvas")!;
initializeCanvas(canvas);

const config: GameConfig = {};

const game = new Game(config, canvas);
game.startGame();
