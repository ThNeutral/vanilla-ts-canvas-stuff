import { Circle } from "../figures/Circle";
import { Figure, GameState } from "../game/Game";
import { Color } from "../utils/Color";
import { Vector2 } from "../utils/Vector2";
import { Launcher } from "./Launcher";

export class Projectile extends Circle {
  private readonly damage = 1;

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
    if (target instanceof Projectile) return true;
    if (target instanceof Launcher) target.receiveDamage(this.damage);
    GameState.deleteFigure(this.id);
  }
}
