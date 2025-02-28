import { Color } from "../utils/Color";
import { Rigidbody } from "../components/Rigidbody";
import { Vector2 } from "../utils/Vector2";
import { Time } from "../modules/Time";
import { RectCollider } from "../components/RectCollider";
import { Camera } from "../modules/Camera";
import { MathHelpers } from "../utils/MathHelpers";
import * as uuid from "uuid";
import { CollisionCallback } from "../components/CollidersCommon";

export class Rect {
  public readonly id: string;
  public speed = Vector2.zero();
  public rb: Rigidbody | null = null;
  public collider: RectCollider | null = null;

  constructor(
    public origin: Vector2,
    public size: Vector2,
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
    this.collider = new RectCollider(this);
    this.collider.callback = callback;
    return this;
  }

  public addSpeed(sp: Vector2) {
    this.speed = sp;
    return this;
  }

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
    this.origin = this.origin.add(this.speed.multiplyScalar(Time.deltaTime));
  }
}

export class Bounds {
  public static fromRect(rect: Rect) {
    return Bounds.fromOriginSize(rect.origin, rect.size);
  }

  public static fromOriginSize(origin: Vector2, size: Vector2) {
    const extents = new Vector2(size.x / 2, size.y / 2);
    const center = new Vector2(origin.x + extents.x, origin.y + extents.y);

    return new Bounds(center, extents);
  }

  constructor(public center: Vector2, public extents: Vector2) {}
}
