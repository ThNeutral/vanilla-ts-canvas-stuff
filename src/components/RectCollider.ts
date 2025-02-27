import { Circle } from "../figures/Circle";
import { Bounds, Rect } from "../figures/Rect";
import { GameState } from "../game/Game";
import { Vector2 } from "../utils/Vector2";
import { Collider, CollisionDirection } from "./CollidersCommon";

export class RectCollider extends Collider {
  constructor(private readonly belongs: Rect) {
    super("rect");
  }

  public isCollision(): Vector2 {
    let result = Vector2.zero();

    for (const figure of GameState.figures) {
      if (figure === this.belongs) continue;

      if (figure.collider) {
        if (figure.collider.type === "rect") {
          result = this.handleRectRectCollision(figure as Rect);
          if (!result.isZero()) break;
        } else if (figure.collider.type === "circle") {
          result = this.handleRectCircleCollision(figure as Circle);
          if (!result.isZero()) break;
        }
      }
    }

    return result;
  }

  private handleRectRectCollision(other: Rect): Vector2 {
    if (!this.isRectRectCollision(other)) {
      return Vector2.zero();
    }

    const thisBounds = new Bounds(this.belongs);
    const otherBounds = new Bounds(other);

    const diff = thisBounds.center.subtract(otherBounds.center);
    const minDist = thisBounds.extents.add(otherBounds.extents);

    const depth = new Vector2(
      diff.x > 0 ? minDist.x - diff.x : -minDist.x - diff.x,
      diff.y > 0 ? minDist.y - diff.y : -minDist.y - diff.y
    );


    if (depth.x != 0 && depth.y != 0) {
      if (Math.abs(depth.x) < Math.abs(depth.y)) {
        if (depth.x > 0) {
          return Vector2.left();
        } else {
          return Vector2.right();
        }
      } else {
        if (depth.y < 0) {
          return Vector2.up();
        } else {
          return Vector2.down();
        }
      }
    }

    return Vector2.zero();
  }

  private isRectRectCollision(other: Rect) {
    return (
      this.belongs.origin.x <= other.origin.x + other.size.x &&
      this.belongs.origin.x + this.belongs.size.x >= other.origin.x &&
      this.belongs.origin.y <= other.origin.y + other.size.y &&
      this.belongs.origin.y + this.belongs.size.y >= other.origin.y
    );
  }

  private handleRectCircleCollision(other: Circle): Vector2 {
    if (!this.isRectCircleCollision(other)) {
      return Vector2.zero()
    }

    return new Bounds(this.belongs).center.subtract(other.center);
  }

  private isRectCircleCollision(other: Circle) {
    let test = new Vector2(other.center.x, other.center.y);

    if (other.center.x < this.belongs.origin.x) test.x = this.belongs.origin.x;
    else if (other.center.x > this.belongs.origin.x + this.belongs.size.x) test.x = this.belongs.origin.x + this.belongs.size.x;
    
    if (other.center.y < this.belongs.origin.y) test.y = this.belongs.origin.y;
    else if (other.center.y > this.belongs.origin.y + this.belongs.size.y) test.y = this.belongs.origin.y + this.belongs.size.y;
    
    const distance = other.center.subtract(test).magnitude();

    return distance <= other.radius;
  }
}
