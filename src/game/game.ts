import { Input } from "../modules/input";
import { Rect } from "../figures/rect";
import { Rigidbody } from "../components/rigidbody";
import { getRandomColor } from "../utils/utils";
import { Vector2 } from "../utils/vector2";
import { Time } from "../modules/time";
import { Camera } from "../modules/camera";

export class GameConfig {
  constructor(public targetFPS: number) {}
}

class GameState {
    public figures: Rect[] = [];
    public input = new Input();
}

export class Game {
  private context: CanvasRenderingContext2D;
  private gameState: GameState;

  constructor(
    private gameConfig: GameConfig,
    private canvas: HTMLCanvasElement
  ) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get context from context");
    }

    this.context = context;
    this.gameState = new GameState();

    this.handleNextFrame = this.handleNextFrame.bind(this);
  }

  public startGame() {
    this.initializeValues();
    this.initializeModules();
    requestAnimationFrame(this.handleNextFrame);
  }

  private initializeValues() {
    const obj = new Rect(new Vector2(100, 100), new Vector2(50, 50), getRandomColor());
    obj.rb = new Rigidbody();
    obj.rb.useGravity = false;
    obj.speed = new Vector2(0, 0);
    this.gameState.figures = [obj];
  }

  private initializeModules() {
    Input.initializeListeners();
    Time.initialize(Date.now(), this.gameConfig.targetFPS);
  }

  private handleNextFrame(offset: number) {
    if (!Time.isNextFrame(Time.frameOffsetToTime(offset))) {
      requestAnimationFrame(this.handleNextFrame);
      return;
    }

    Time.update(Time.frameOffsetToTime(offset))
    Camera.update();

    for (const figure of this.gameState.figures) {
      figure.updateSelf();
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const figure of this.gameState.figures) {
      this.context.fillStyle = figure.color.toColorString();
      const adjustedOrigin = figure.origin.add(Camera.offset)
      this.context.fillRect(adjustedOrigin.x, adjustedOrigin.y, figure.size.x, figure.size.y)  
    }

    Input.update();

    requestAnimationFrame(this.handleNextFrame);
  }
}
