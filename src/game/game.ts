import { Input } from "../modules/Input";
import { Rect } from "../figures/Rect";
import { Time } from "../modules/Time";
import { Camera } from "../modules/Camera";
import { Circle } from "../figures/Circle";
import { TestValues } from "./TestValues";
import { timeout } from "../utils/Utils";

export interface GameConfig {
  targetFPS: number;
}

type Figures = Rect | Circle;

export class GameState {
  public static figures: Figures[] = [];
  public static input = new Input();
}

export class Game {
  private context: CanvasRenderingContext2D;

  constructor(
    private gameConfig: GameConfig,
    private canvas: HTMLCanvasElement
  ) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get context from context");
    }

    this.context = context;

    this.handleNextFrame = this.handleNextFrame.bind(this);
  }

  public async startGame() {
    this.initializeValues();
    this.initializeModules();
    while (true) {
      this.handleNextFrame();
      await timeout(Time.getTimeUntilNextFrame());
    }
  }

  private initializeValues() {
    GameState.figures = TestValues.aroundScreen();
  }

  private initializeModules() {
    Input.initializeListeners();
    Time.initialize(Date.now(), this.gameConfig.targetFPS);
  }

  private handleNextFrame() {
    const time = Date.now();

    Time.update(time);
    Camera.update();

    for (const figure of GameState.figures) {
      figure.update();
    }

    Input.update();

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const figure of GameState.figures) {
      figure.draw(this.context);
    }
  }
}
