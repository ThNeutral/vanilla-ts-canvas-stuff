import { Circle } from "../figures/Circle";
import { Bounds, Rect } from "../figures/Rect";
import { GameState } from "../game/Game";
import { Vector2 } from "../utils/Vector2";
import { Collider, CollisionDirection } from "./CollidersCommon";

export class CircleCollider extends Collider {
  constructor(private belongs: Circle) {
    super("circle");
  }

  public isCollision(): Vector2 {
    let result = Vector2.zero();

    for (const figure of GameState.figures) {
      if (figure === this.belongs) continue;

      if (figure.collider) {
        if (figure.collider.type === "rect") {
          result = this.handleCircleRectCollision(figure as Rect);
          if (!result.isZero()) break;
        } else if (figure.collider.type === "circle") {
          result = this.handleCircleCircleCollision(figure as Circle);
          if (!result.isZero()) break;
        }
      }
    }

    return result;
  }

  private handleCircleRectCollision(other: Rect) {
    if (!this.isCircleRectCollision(other)) {
      return Vector2.zero();
    }
    
    return this.belongs.center.subtract(new Bounds(other).center);
  }

  private isCircleRectCollision(other: Rect) {
    let test = new Vector2(this.belongs.center.x, this.belongs.center.y);

    if (this.belongs.center.x < other.origin.x) test.x = other.origin.x;
    else if (this.belongs.center.x > other.origin.x + other.size.x) test.x = other.origin.x + other.size.x;
    
    if (this.belongs.center.y < other.origin.y) test.y = other.origin.y;
    else if (this.belongs.center.y > other.origin.y + other.size.y) test.y = other.origin.y + other.size.y;
    
    const distance = this.belongs.center.subtract(test).magnitude();

    return distance <= this.belongs.radius;
  }

  private handleCircleCircleCollision(other: Circle) {
    if (!this.isCircleCircleCollision(other)) {
      return Vector2.zero();
    }

    return this.belongs.center.subtract(other.center).normalize();
  }

  private isCircleCircleCollision(other: Circle) {
    const distance = this.belongs.center.subtract(other.center).magnitude();
    return distance <= this.belongs.radius + other.radius;
  }
}
