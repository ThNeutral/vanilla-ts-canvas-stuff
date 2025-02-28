import { Circle } from "../figures/Circle";
import { Rect } from "../figures/Rect";
import { Figure, GameState } from "../game/Game";
import { CollisionHelpers } from "../utils/CollisionHelpers";
import { Vector2 } from "../utils/Vector2";
import { Collider } from "./CollidersCommon";

export class CircleCollider extends Collider {
  constructor(private belongs: Circle) {
    super("circle");
  }

  public isCollision() {
    let result = Vector2.zero();
    let target: Figure | null = null;

    for (const figure of GameState.figures) {
      if (figure === this.belongs) continue;

      if (figure.collider) {
        if (figure.collider.type === "rect") {
          result = this.handleCircleRectCollision(figure as Rect);
        } else if (figure.collider.type === "circle") {
          result = this.handleCircleCircleCollision(figure as Circle);
        }
        if (!result.isZero()) {
          target = figure;
          break;
        };
      }
    }

    return { result, target };
  }

  private handleCircleRectCollision(other: Rect) {
    if (
      !CollisionHelpers.isRectCircleCollision(
        other,
        this.belongs,
        this.standardPrediction
      )
    ) {
      return Vector2.zero();
    }

    return CollisionHelpers.calculateCircleRectCollisionNormal(
      this.belongs,
      other,
      this.standardPrediction
    );
  }

  private handleCircleCircleCollision(other: Circle) {
    if (
      !CollisionHelpers.isCircleCircleCollision(
        this.belongs,
        other,
        this.standardPrediction
      )
    ) {
      return Vector2.zero();
    }

    return CollisionHelpers.calculateCircleCircleCollisionNormal(
      this.belongs,
      other,
      this.standardPrediction
    );
  }
}
