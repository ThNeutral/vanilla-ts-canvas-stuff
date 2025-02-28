import { Bounds, Rect } from "../figures/Rect";
import { Figure, GameState } from "../game/Game";
import { Input } from "../modules/Input";
import { Time } from "../modules/Time";
import { Color } from "../utils/Color";
import { Key, MouseButton } from "../utils/Keys";
import { Vector2 } from "../utils/Vector2";
import { Projectile } from "./Projectile";

export class Launcher extends Rect {
  private readonly spreadAngle = 10;

  private readonly projectileSpeed = 400;
  private readonly projectileRadius = 5;

  private readonly shootRate = 0.1;
  private shootCooldown = 0;

  private readonly acceleration = 1000;
  private readonly maxSpeed = 400;

  constructor(
    origin: Vector2,
    size: Vector2,
    color: Color = Color.getRandomColor()
  ) {
    super(origin, size, color);
    this.addCollider(this.handleCollision.bind(this));
  }

  private handleCollision(target: Figure) {
    if (target instanceof Projectile) return true;
  }

  public update(): void {
    this.handleShoot();
    this.handleAcceleration();
    super.update();
  }

  private handleShoot() {
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
  }

  private handleAcceleration() {
    let newDirection = Vector2.zero();
    if (Input.get(Key.KeyW)) newDirection.y -= 1;
    if (Input.get(Key.KeyS)) newDirection.y += 1;
    if (Input.get(Key.KeyA)) newDirection.x -= 1;
    if (Input.get(Key.KeyD)) newDirection.x += 1;
    if (Input.get(Key.Space)) newDirection = this.speed.normalize().reverse();

    let newSpeed = this.speed.add(newDirection.multiplyScalar(this.acceleration).multiplyScalar(Time.deltaTime))
    if (newSpeed.magnitude() > this.maxSpeed) {
      newSpeed = newSpeed.normalize().multiplyScalar(this.maxSpeed);
    }
    if (newSpeed.equals(Vector2.zero(), 1e-2)) {
      newSpeed = Vector2.zero();
    }

    this.speed = newSpeed;
  }
}
