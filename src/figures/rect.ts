import { Color } from "../utils/color";
import { Rigidbody } from "../components/rigidbody";
import { Vector2 } from "../utils/vector2";
import { Time } from "../modules/time";
import { RectCollider } from "../components/colliders";
import { IFigure } from "./IFigure";

export class Rect implements IFigure {
  public speed = Vector2.zero();
  public rb: Rigidbody | null = null;
  public collider: RectCollider | null = null;

  constructor(
    public origin: Vector2,
    public size: Vector2,
    public color: Color
  ) {}

  public update() {
    this.handleCollider();
    this.handleRigidbody();
    this.handleMove();
  }

  private handleCollider() {
    if (this.collider) {
      const collisionResult = this.collider.isCollision();
      if (collisionResult) {
        switch (collisionResult) {
          case "top": {
            this.speed = new Vector2(
              this.speed.x,
              -Math.abs(this.speed.y * 0.8)
            );
            break;
          }
          case "bottom": {
            this.speed = new Vector2(
              this.speed.x,
              Math.abs(this.speed.y * 0.8)
            );
            break;
          }
          case "left": {
            this.speed = new Vector2(
              Math.abs(this.speed.x * 0.8),
              this.speed.y
            );
            break;
          }
          case "right": {
            this.speed = new Vector2(
              -Math.abs(this.speed.x * 0.8),
              this.speed.y
            );
            break;
          }
        }
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
