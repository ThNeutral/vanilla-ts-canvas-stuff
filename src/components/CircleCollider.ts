import { Circle } from "../figures/Circle";
import { Rect } from "../figures/Rect";
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
    return Vector2.zero();
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
