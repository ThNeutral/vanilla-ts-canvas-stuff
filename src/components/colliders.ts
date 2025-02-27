import { Bounds, Rect } from "../figures/rect";
import { GameState } from "../game/game";
import { Vector2 } from "../utils/vector2";

export type ColliderTypes = "rect" | "circle";

export type CollisionDirection = "top" | "bottom" | "left" | "right";

export abstract class Collider {
  constructor(protected readonly type: ColliderTypes) {}
  public abstract isCollision(): CollisionDirection | null;
}

export class RectCollider extends Collider {
  constructor(private readonly belongs: Rect) {
    super("rect");
  }

  public isCollision(): CollisionDirection | null {
    let result: CollisionDirection | null = null;

    for (const figure of GameState.figures) {
      if (figure === this.belongs) continue;

      if (figure.collider) {
        if (figure.collider.type === "rect") {
          result = this.handleRectRectCollision(figure);
          if (result) break;
        } else if (figure.collider.type === "circle") {}
      }
    }

    return result;
  }

  private handleRectRectCollision(other: Rect): CollisionDirection | null {
    if (!this.isRectRectCollision(other)) {
      return null;
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
          return 'left';
        } else {
          return 'right';
        }
      } else {
        if (depth.y < 0) {
          return 'top';
        } else {
          return 'bottom';
        }
      }
    }

    return null;
  }

  private isRectRectCollision(figure: Rect) {
    return (
      this.belongs.origin.x <= figure.origin.x + figure.size.x &&
      this.belongs.origin.x + this.belongs.size.x >= figure.origin.x &&
      this.belongs.origin.y <= figure.origin.y + figure.size.y &&
      this.belongs.origin.y + this.belongs.size.y >= figure.origin.y
    );
  }
}
