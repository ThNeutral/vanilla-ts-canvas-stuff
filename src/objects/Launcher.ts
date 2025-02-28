import { Bounds, Rect } from "../figures/Rect";
import { GameState } from "../game/Game";
import { Input } from "../modules/Input";
import { Time } from "../modules/Time";
import { Color } from "../utils/Color";
import { MouseButton } from "../utils/Keys";
import { Vector2 } from "../utils/Vector2";
import { Projectile } from "./Projectile";

export class Launcher extends Rect {
  private readonly spreadAngle = 180;
  private readonly projectileSpeed = 400;
  private readonly projectileRadius = 5;
  private readonly shootRate = 0.01;
  private shootCooldown = 0;

  constructor(
    origin: Vector2,
    size: Vector2,
    color: Color = Color.getRandomColor()
  ) {
    super(origin, size, color);
    this.addCollider();
  }

  public update(): void {
    this.shootCooldown += Time.deltaTime;
    if (this.shootCooldown > this.shootRate && Input.get(MouseButton.Left)) {
      this.shootCooldown = 0;

      const bounds = Bounds.fromRect(this);
      const direction = Input.mousePosition
        .subtract(bounds.center)
        .normalize()
        .rotate(Math.random() * (2 * this.spreadAngle) - this.spreadAngle);

      const center = bounds.center.add(
        direction.multiplyScalar(bounds.extents.multiplyScalar(2).magnitude())
      );
      const speed = direction.multiplyScalar(this.projectileSpeed);

      GameState.figures.push(
        new Projectile(center, this.projectileRadius, speed)
      );
    }

    super.update();
  }
}
