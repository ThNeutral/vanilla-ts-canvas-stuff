import { Circle } from "../figures/Circle";
import { Bounds, Rect } from "../figures/Rect";
import { GameState } from "../game/Game";
import { CollisionHelpers } from "../utils/CollisionHelpers";
import { Vector2 } from "../utils/Vector2";
import { Collider } from "./CollidersCommon";

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
    if (
      !CollisionHelpers.isRectRectCollision(
        this.belongs,
        other,
        this.standardPrediction
      )
    ) {
      return Vector2.zero();
    }

    return CollisionHelpers.calculateRectRectCollisionNormal(
      this.belongs,
      other,
      this.standardPrediction
    );
  }

  private handleRectCircleCollision(other: Circle): Vector2 {
    if (
      !CollisionHelpers.isRectCircleCollision(
        this.belongs,
        other,
        this.standardPrediction
      )
    ) {
      return Vector2.zero();
    }

    return CollisionHelpers.calculateRectCircleCollisionNormal(
      this.belongs,
      other,
      this.standardPrediction
    );
  }
}
