import { Circle } from "../figures/Circle";
import { Color } from "../utils/Color";
import { Vector2 } from "../utils/Vector2";

export class Projectile extends Circle {
  constructor(
    center: Vector2,
    radius: number,
    speed: Vector2,
    color: Color = Color.getRandomColor()
  ) {
    super(center, radius, color);
    this.addCollider().addSpeed(speed);
  }
}
