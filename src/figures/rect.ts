import { Color } from "../utils/Color";
import { Rigidbody } from "../components/Rigidbody";
import { Vector2 } from "../utils/Vector2";
import { Time } from "../modules/Time";
import { RectCollider } from "../components/RectCollider";
import { Camera } from "../modules/Camera";
import { MathHelpers } from "../utils/MathHelpers";

export class Rect {
  public speed = Vector2.zero();
  public rb: Rigidbody | null = null;
  public collider: RectCollider | null = null;

  constructor(
    public origin: Vector2,
    public size: Vector2,
    public color: Color
  ) {}

  public update() {
    this.handleRigidbody();
    this.handleMove();
    this.handleCollider();
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color.toColorString();
    const adjustedOrigin = this.origin.add(Camera.offset);
    context.fillRect(
      adjustedOrigin.x,
      adjustedOrigin.y,
      this.size.x,
      this.size.y
    );
  }

  private handleCollider() {
    if (this.collider) {
      const collisionResult = this.collider.isCollision();
      if (!collisionResult.isZero()) {
        this.speed = MathHelpers.reflect(this.speed, collisionResult);
        this.handleMove();
      }
    }
  }

  private handleRigidbody() {
    if (this.rb) {
      const newSpeed = this.rb.handleGravity(this.speed);
      if (newSpeed) {
        this.speed = newSpeed;
      }
    }
  }

  private handleMove() {
    this.origin = this.origin.add(this.speed.multiplyScalar(Time.deltaTime));
  }
}

export class Bounds {
  public center: Vector2;
  public extents: Vector2;
  constructor(rect: Rect) {
    this.extents = new Vector2(rect.size.x / 2, rect.size.y / 2);
    this.center = new Vector2(
      rect.origin.x + this.extents.x,
      rect.origin.y + this.extents.y
    );
  }
}
