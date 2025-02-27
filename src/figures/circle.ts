import { CircleCollider } from "../components/CircleCollider";
import { Rigidbody } from "../components/Rigidbody";
import { Camera } from "../modules/Camera";
import { Time } from "../modules/Time";
import { Color } from "../utils/Color";
import { MathHelpers } from "../utils/MathHelpers";
import { Vector2 } from "../utils/Vector2";

export class Circle {
  public rb: Rigidbody | null = null;
  public collider: CircleCollider | null = null;
  public speed = Vector2.zero();

  constructor(
    public center: Vector2,
    public radius: number,
    public color: Color
  ) {}

  public update() {
    this.handleRigidbody();
    this.handleCollider();
    this.handleMove();
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color.toColorString();
    const adjustedCenter = this.center.add(Camera.offset);
    context.beginPath();
    context.arc(adjustedCenter.x, adjustedCenter.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }

  private handleCollider() {
    if (this.collider) {
      const collisionResult = this.collider.isCollision();
      if (!collisionResult.isZero()) {
        this.speed = MathHelpers.reflect(this.speed, collisionResult);
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
    this.center = this.center.add(this.speed.multiplyScalar(Time.deltaTime));
  }
}
