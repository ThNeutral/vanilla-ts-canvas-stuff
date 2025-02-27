import { Input } from "../modules/input";
import { Rect } from "../figures/rect";
import { Rigidbody } from "../components/rigidbody";
import { getRandomColor } from "../utils/utils";
import { Vector2 } from "../utils/vector2";
import { Time } from "../modules/time";
import { Camera } from "../modules/camera";
import { RectCollider } from "../components/colliders";

export class GameConfig {
  constructor(public targetFPS: number) {}
}

export class GameState {
    public static figures: Rect[] = [];
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
    const object = new Rect(new Vector2(200, 200), new Vector2(50, 50), getRandomColor());
    object.rb = new Rigidbody();
    object.rb.useGravity = true;
    object.collider = new RectCollider(object);
    object.speed = new Vector2(1000, -1000);

    const wallBottom = new Rect(new Vector2(50, 500), new Vector2(500, 50), getRandomColor());
    wallBottom.collider = new RectCollider(wallBottom);

    const wallTop = new Rect(new Vector2(50, 100), new Vector2(500, 50), getRandomColor());
    wallTop.collider = new RectCollider(wallTop);
    
    const wallLeft = new Rect(new Vector2(25, 150), new Vector2(50, 350), getRandomColor());
    wallLeft.collider = new RectCollider(wallLeft);
    
    const wallRight = new Rect(new Vector2(550, 150), new Vector2(50, 350), getRandomColor());
    wallRight.collider = new RectCollider(wallRight);
    
    GameState.figures = [wallBottom, wallLeft, wallRight, wallTop, object];
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

    for (const figure of GameState.figures) {
      figure.update();
    }

    Input.update();

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const figure of GameState.figures) {
      this.context.fillStyle = figure.color.toColorString();
      const adjustedOrigin = figure.origin.add(Camera.offset)
      this.context.fillRect(adjustedOrigin.x, adjustedOrigin.y, figure.size.x, figure.size.y)  
    }

    requestAnimationFrame(this.handleNextFrame);
  }
}
