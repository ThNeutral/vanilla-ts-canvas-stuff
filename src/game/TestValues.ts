import { CircleCollider } from "../components/CircleCollider";
import { RectCollider } from "../components/RectCollider";
import { Rigidbody } from "../components/Rigidbody";
import { Ball } from "../figures/Ball";
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
    )
      .addRigidbody()
      .addCollider()
      .addSpeed(new Vector2(1000, 100));

    const wallBottom = new Rect(
      new Vector2(50, 500),
      new Vector2(500, 50),
      Color.getRandomColor()
    ).addCollider();

    const wallTop = new Rect(
      new Vector2(50, 100),
      new Vector2(500, 50),
      Color.getRandomColor()
    ).addCollider();

    const wallLeft = new Rect(
      new Vector2(25, 150),
      new Vector2(50, 350),
      Color.getRandomColor()
    ).addCollider();

    const wallRight = new Rect(
      new Vector2(550, 150),
      new Vector2(50, 350),
      Color.getRandomColor()
    ).addCollider();

    return [wallBottom, wallLeft, wallRight, wallTop, object];
  }

  public static circles() {
    const small = new Circle(new Vector2(100, 100), 25, Color.getRandomColor())
      .addRigidbody()
      .addCollider()
      .addSpeed(new Vector2(40, 0));

    const big = new Circle(
      new Vector2(300, 300),
      50,
      Color.getRandomColor()
    ).addCollider();

    return [big, small];
  }

  public static circleRect() {
    const circle = new Circle(new Vector2(100, 100), 25, Color.getRandomColor())
      .addRigidbody()
      .addCollider()
      .addSpeed(new Vector2(40, 0));

    const rect = new Rect(
      new Vector2(300, 300),
      new Vector2(50, 50),
      Color.getRandomColor()
    ).addCollider();

    return [rect, circle];
  }

  public static rectCircle() {
    const rect = new Rect(
      new Vector2(100, 100),
      new Vector2(25, 25),
      Color.getRandomColor()
    )
      .addRigidbody()
      .addCollider()
      .addSpeed(new Vector2(40, 0));

    const circle = new Circle(
      new Vector2(300, 300),
      50,
      Color.getRandomColor()
    ).addCollider();

    return [circle, rect];
  }

  public static farCircle() {
    const farBar = new Rect(
      new Vector2(1800, 500),
      new Vector2(25, 500),
      Color.getRandomColor()
    ).addCollider();

    const bottomBar = new Rect(
      new Vector2(100, 1000),
      new Vector2(1750, 25),
      Color.getRandomColor()
    ).addCollider();

    const object = new Circle(new Vector2(100, 900), 40, Color.getRandomColor())
      .addCollider()
      .addRigidbody()
      .addSpeed(new Vector2(200, -200));

    return [farBar, bottomBar, object];
  }

  public static farRect() {
    const farCircle = new Circle(
      new Vector2(1800, 750),
      400,
      Color.getRandomColor()
    ).addCollider();

    const bottomCircle = new Circle(
      new Vector2(1000, 1500),
      700,
      Color.getRandomColor()
    ).addCollider();

    const object = new Rect(
      new Vector2(100, 900),
      Vector2.one().multiplyScalar(40),
      Color.getRandomColor()
    )
      .addCollider()
      .addRigidbody()
      .addSpeed(new Vector2(200, -200));

    return [farCircle, bottomCircle, object];
  }

  public static aroundScreen() {
    const left = new Rect(
      new Vector2(-25, 0),
      new Vector2(50, window.innerHeight),
      Color.getRandomColor()
    ).addCollider();

    const right = new Rect(
      new Vector2(window.innerWidth - 25, 0),
      new Vector2(50, window.innerHeight),
      Color.getRandomColor()
    ).addCollider();

    const top = new Rect(
      new Vector2(25, -25),
      new Vector2(window.innerWidth - 50, 50),
      Color.getRandomColor()
    ).addCollider();

    const bottom = new Rect(
      new Vector2(25, window.innerHeight - 25),
      new Vector2(window.innerWidth - 50, 50),
      Color.getRandomColor()
    ).addCollider();

    const ball = new Ball(new Vector2(500, 500), 25, Color.getRandomColor());

    return [left, right, top, bottom, ball];
  }
}
