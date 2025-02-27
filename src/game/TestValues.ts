import { CircleCollider } from "../components/CircleCollider";
import { RectCollider } from "../components/RectCollider";
import { Rigidbody } from "../components/Rigidbody";
import { Circle } from "../figures/Circle";
import { Rect } from "../figures/Rect";
import { Color } from "../utils/Color";
import { Vector2 } from "../utils/Vector2";

export class TestValues {
  public static box() {
    const object = new Rect(
      new Vector2(200, 200),
      new Vector2(50, 50),
      Color.getRandomColor()
    );
    object.rb = new Rigidbody();
    object.rb.useGravity = true;
    object.collider = new RectCollider(object);
    object.speed = new Vector2(1000, 100);

    const wallBottom = new Rect(
      new Vector2(50, 500),
      new Vector2(500, 50),
      Color.getRandomColor()
    );
    wallBottom.collider = new RectCollider(wallBottom);

    const wallTop = new Rect(
      new Vector2(50, 100),
      new Vector2(500, 50),
      Color.getRandomColor()
    );
    wallTop.collider = new RectCollider(wallTop);

    const wallLeft = new Rect(
      new Vector2(25, 150),
      new Vector2(50, 350),
      Color.getRandomColor()
    );
    wallLeft.collider = new RectCollider(wallLeft);

    const wallRight = new Rect(
      new Vector2(550, 150),
      new Vector2(50, 350),
      Color.getRandomColor()
    );
    wallRight.collider = new RectCollider(wallRight);

    return [wallBottom, wallLeft, wallRight, wallTop, object];
  }

  public static circles() {
    const small = new Circle(new Vector2(100, 100), 25, Color.getRandomColor());
    small.rb = new Rigidbody();
    small.collider = new CircleCollider(small);
    small.speed = new Vector2(40, 0);

    const big = new Circle(new Vector2(300, 300), 50, Color.getRandomColor());
    big.collider = new CircleCollider(big);

    return [big, small];
  }

  public static circleRect() {
    const circle = new Circle(
      new Vector2(100, 100),
      25,
      Color.getRandomColor()
    );
    circle.rb = new Rigidbody();
    circle.collider = new CircleCollider(circle);
    circle.speed = new Vector2(40, 0);

    const rect = new Rect(
      new Vector2(300, 300),
      new Vector2(50, 50),
      Color.getRandomColor()
    );
    rect.collider = new RectCollider(rect);

    return [rect, circle];
  }

  public static rectCircle() {
    const rect = new Rect(
      new Vector2(100, 100),
      new Vector2(25, 25),
      Color.getRandomColor()
    );
    rect.rb = new Rigidbody();
    rect.collider = new RectCollider(rect);
    rect.speed = new Vector2(40, 0);

    const circle = new Circle(
      new Vector2(300, 300),
      50,
      Color.getRandomColor()
    );
    circle.collider = new CircleCollider(circle);

    return [circle, rect];
  }

  public static far() {
    const farBar = new Rect(
      new Vector2(1800, 500),
      new Vector2(25, 500),
      Color.getRandomColor()
    );
    farBar.collider = new RectCollider(farBar);

    const bottomBar = new Rect(
      new Vector2(100, 1000),
      new Vector2(1750, 25),
      Color.getRandomColor()
    );
    bottomBar.collider = new RectCollider(bottomBar);

    const object = new Circle(
      new Vector2(100, 900),
      40,
      Color.getRandomColor()
    );
    object.collider = new CircleCollider(object);
    object.rb = new Rigidbody();
    object.speed = new Vector2(200, -200)

    return [farBar, bottomBar, object];
  }
}
