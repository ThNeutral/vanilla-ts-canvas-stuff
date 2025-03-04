import { CircleCollider } from "../components/CircleCollider";
import { CollisionCallback } from "../components/CollidersCommon";
import { Rigidbody } from "../components/Rigidbody";
import { Camera } from "../modules/Camera";
import { Time } from "../modules/Time";
import { Color } from "../utils/Color";
import { MathHelpers } from "../utils/MathHelpers";
import { Vector2 } from "../utils/Vector2";
import * as uuid from "uuid";

export class Circle {
  public readonly id: string;
  public rb: Rigidbody | null = null;
  public collider: CircleCollider | null = null;
  public speed = Vector2.zero();

  constructor(
    public center: Vector2,
    public radius: number,
    public color: Color
  ) {
    this.id = uuid.v4();
  }

  public addRigidbody(useGravity = true) {
    this.rb = new Rigidbody();
    this.rb.useGravity = useGravity;
    return this;
  }

  public addCollider(callback: CollisionCallback | null = null) {
    this.collider = new CircleCollider(this);
    this.collider.callback = callback;
    return this;
  }

  public addSpeed(sp: Vector2) {
    this.speed = sp;
    return this;
  }

  public update() {
    this.handleRigidbody();
    this.handleCollider();
    this.handleMove();
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color.toColorString();
    const adjustedCenter = this.center.add(Camera.offset);
    context.beginPath();
    context.arc(
      adjustedCenter.x,
      adjustedCenter.y,
      this.radius,
      0,
      2 * Math.PI
    );
    context.fill();
  }

  private handleCollider() {
    if (this.collider) {
      const collisionResult = this.collider.isCollision();
      if (this.collider.callback && collisionResult.target) {
        const ignoreCollision = this.collider.callback(collisionResult.target);
        if (!ignoreCollision) {
          this.speed = MathHelpers.reflect(this.speed, collisionResult.result);
          this.handleMove();
        }
      }
    }
  }

  private handleRigidbody() {
    if (this.rb) {
      this.speed = this.rb.handleGravity(this.speed);
    }
  }

  private handleMove() {
    this.center = this.center.add(this.speed.multiplyScalar(Time.deltaTime));
  }
}
