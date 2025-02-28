import { Circle } from "../figures/Circle";
import { Bounds, Rect } from "../figures/Rect";
import { Time } from "../modules/Time";
import { Vector2 } from "./Vector2";

export class CollisionHelpers {
  public static isRectRectCollision(rect1: Rect, rect2: Rect, prediction = 0) {
    const predictedRect1Origin = rect1.origin.add(
      rect1.speed.multiplyScalar(Time.deltaTime * prediction)
    );
    const predictedRect2Origin = rect2.origin.add(
      rect2.speed.multiplyScalar(Time.deltaTime * prediction)
    );

    return (
      predictedRect1Origin.x <= predictedRect2Origin.x + rect2.size.x &&
      predictedRect1Origin.x + rect1.size.x >= predictedRect2Origin.x &&
      predictedRect1Origin.y <= predictedRect2Origin.y + rect2.size.y &&
      predictedRect1Origin.y + rect1.size.y >= predictedRect2Origin.y
    );
  }

  public static isCircleCircleCollision(
    circle1: Circle,
    circle2: Circle,
    prediction = 0
  ) {
    const predictedCircle1Center = circle1.center.add(
      circle1.speed.multiplyScalar(Time.deltaTime * prediction)
    );
    const predictedCircle2Center = circle2.center.add(
      circle2.speed.multiplyScalar(Time.deltaTime * prediction)
    );

    const distance = predictedCircle1Center
      .subtract(predictedCircle2Center)
      .magnitude();
    return distance <= circle1.radius + circle2.radius;
  }

  public static isRectCircleCollision(
    rect: Rect,
    circle: Circle,
    prediction = 0
  ) {
    const predictedRectOrigin = rect.origin.add(
      rect.speed.multiplyScalar(Time.deltaTime * prediction)
    );
    const predictedCircleCenter = circle.center.add(
      circle.speed.multiplyScalar(Time.deltaTime * prediction)
    );

    let test = Vector2.copy(predictedCircleCenter);

    if (predictedCircleCenter.x < predictedRectOrigin.x)
      test.x = predictedRectOrigin.x;
    else if (predictedCircleCenter.x > predictedRectOrigin.x + rect.size.x)
      test.x = predictedRectOrigin.x + rect.size.x;

    if (predictedCircleCenter.y < predictedRectOrigin.y)
      test.y = predictedRectOrigin.y;
    else if (predictedCircleCenter.y > predictedRectOrigin.y + rect.size.y)
      test.y = predictedRectOrigin.y + rect.size.y;

    const distance = predictedCircleCenter.subtract(test).magnitude();

    return distance <= circle.radius;
  }

  public static calculateRectRectCollisionNormal(
    rect1: Rect,
    rect2: Rect,
    prediction = 0
  ) {
    const predictedRect1Origin = rect1.origin.add(
      rect1.speed.multiplyScalar(Time.deltaTime * prediction)
    );
    const predictedRect2Origin = rect2.origin.add(
      rect2.speed.multiplyScalar(Time.deltaTime * prediction)
    );

    const thisBounds = Bounds.fromOriginSize(predictedRect1Origin, rect1.size);
    const otherBounds = Bounds.fromOriginSize(predictedRect2Origin, rect2.size);

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

  public static calculateCircleCircleCollisionNormal(
    circle1: Circle,
    circle2: Circle,
    prediction = 0
  ) {
    const predictedCircle1Center = circle1.center.add(
      circle1.speed.multiplyScalar(Time.deltaTime * prediction)
    );
    const predictedCircle2Center = circle2.center.add(
      circle2.speed.multiplyScalar(Time.deltaTime * prediction)
    );

    return predictedCircle1Center.subtract(predictedCircle2Center).normalize();
  }

  public static calculateCircleRectCollisionNormal(
    circle: Circle,
    rect: Rect,
    prediction = 0
  ) {
    const predictedRectOrigin = rect.origin.add(
      rect.speed.multiplyScalar(Time.deltaTime * prediction)
    );
    const predictedCircleCenter = circle.center.add(
      circle.speed.multiplyScalar(Time.deltaTime * prediction)
    );

    const thisBounds = Bounds.fromOriginSize(predictedRectOrigin, rect.size);
    const otherBounds = new Bounds(predictedCircleCenter, Vector2.one().multiplyScalar(circle.radius));

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

  public static calculateRectCircleCollisionNormal(
    rect: Rect,
    circle: Circle,
    prediction = 0
  ) {
    const predictedRectOrigin = rect.origin.add(
      rect.speed.multiplyScalar(Time.deltaTime * prediction)
    );
    const predictedCircleCenter = circle.center.add(
      circle.speed.multiplyScalar(Time.deltaTime * prediction)
    );

    const thisBounds = Bounds.fromOriginSize(predictedRectOrigin, rect.size);

    return thisBounds.center.subtract(predictedCircleCenter).normalize();
  }
}
