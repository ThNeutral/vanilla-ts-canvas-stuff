import { Input } from "../modules/Input";
import { Rect } from "../figures/Rect";
import { Time } from "../modules/Time";
import { Camera } from "../modules/Camera";
import { Circle } from "../figures/Circle";
import { TestValues } from "./TestValues";

export interface GameConfig {}

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

  public startGame() {
    this.initializeValues();
    this.initializeModules();
    requestAnimationFrame(this.handleNextFrame);
  }

  private initializeValues() {
    GameState.figures = TestValues.aroundScreen();
  }

  private initializeModules() {
    Input.initializeListeners();
    Time.initialize(Date.now());
  }

  private handleNextFrame(offset: number) {
    const time = Time.frameOffsetToTime(offset);

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

    requestAnimationFrame(this.handleNextFrame);
  }
}
