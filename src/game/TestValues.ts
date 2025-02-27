import { CircleCollider } from "../components/CircleCollider";
import { RectCollider } from "../components/RectCollider";
import { Rigidbody } from "../components/Rigidbody";
import { Circle } from "../figures/Circle";
import { Rect } from "../figures/Rect";
import { getRandomColor } from "../utils/utils";
import { Vector2 } from "../utils/Vector2";

export class TestValues {
  public static box() {
    const object = new Rect(
      new Vector2(200, 200),
      new Vector2(50, 50),
      getRandomColor()
    );
    object.rb = new Rigidbody();
    object.rb.useGravity = true;
    object.collider = new RectCollider(object);
    object.speed = new Vector2(1000, 100);

    const wallBottom = new Rect(
      new Vector2(50, 500),
      new Vector2(500, 50),
      getRandomColor()
    );
    wallBottom.collider = new RectCollider(wallBottom);

    const wallTop = new Rect(
      new Vector2(50, 100),
      new Vector2(500, 50),
      getRandomColor()
    );
    wallTop.collider = new RectCollider(wallTop);

    const wallLeft = new Rect(
      new Vector2(25, 150),
      new Vector2(50, 350),
      getRandomColor()
    );
    wallLeft.collider = new RectCollider(wallLeft);

    const wallRight = new Rect(
      new Vector2(550, 150),
      new Vector2(50, 350),
      getRandomColor()
    );
    wallRight.collider = new RectCollider(wallRight);

    return [wallBottom, wallLeft, wallRight, wallTop, object];
  }

  public static circles() {
    const small = new Circle(new Vector2(100, 100), 25, getRandomColor());
    small.rb = new Rigidbody();
    small.collider = new CircleCollider(small);
    small.speed = new Vector2(40, 0);

    const big = new Circle(new Vector2(300, 300), 50, getRandomColor());
    big.collider = new CircleCollider(big);

    return [big, small];
  }
}
