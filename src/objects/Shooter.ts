import { Bounds, Rect } from "../figures/Rect";
import { Figure, GameState } from "../game/Game";
import { Input } from "../modules/Input";
import { Time } from "../modules/Time";
import { Color } from "../utils/Color";
import { Key, MouseButton } from "../utils/Keys";
import { Vector2 } from "../utils/Vector2";
import { Projectile } from "./Projectile";

export abstract class Shooter extends Rect {
  protected spreadAngle = 0;

  protected readonly projectileSpeed = 400;
  protected readonly projectileRadius = 5;

  protected shootRate = 0.1;
  protected shootCooldown = 0;

  protected readonly acceleration = 1000;
  protected readonly maxSpeed = 400;

  protected hp = 10;

  protected destroyOnCollision = true;

  constructor(
    origin: Vector2,
    size: Vector2,
    color: Color = Color.getRandomColor()
  ) {
    super(origin, size, color);
    this.addCollider(this.handleCollision.bind(this));
  }

  public addSpreadAngle(degree: number) {
    this.spreadAngle = degree;
    return this;
  }

  public addDestroyProjectileOnCollision(value = true) {
    this.destroyOnCollision = value;
    return this;
  }

  public addShootSpeed(value: number) {
    this.shootRate = value;
    return this;
  }

  protected handleCollision(target: Figure) {
    if (target instanceof Projectile) return true;
  }

  public receiveDamage(damage: number) {
    this.hp -= damage;
    if (this.hp < 0) {
      GameState.deleteFigure(this.id);
    }
  }

  public update(): void {
    super.update();
  }

  protected shootAt(targetCenter: Vector2) {
    const bounds = Bounds.fromRect(this);

    const direction = targetCenter
      .subtract(bounds.center)
      .normalize()
      .rotate(Math.random() * (2 * this.spreadAngle) - this.spreadAngle);

    const center = bounds.center.add(
      direction.multiplyScalar(bounds.extents.multiplyScalar(2).magnitude())
    );
    const speed = direction.multiplyScalar(this.projectileSpeed);

    GameState.figures.push(
      new Projectile(
        center,
        this.projectileRadius,
        speed,
        this.destroyOnCollision
      )
    );
  }
}
