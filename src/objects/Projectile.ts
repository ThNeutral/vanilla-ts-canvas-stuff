import { Circle } from "../figures/Circle";
import { Figure, GameState } from "../game/Game";
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
    this.addCollider(this.handleCollision.bind(this)).addSpeed(speed);
  }

  private handleCollision(target: Figure) {
    if (target instanceof Projectile) return false;
    GameState.deleteFigure(this.id);
  }
}
