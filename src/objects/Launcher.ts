import { Bounds, Rect } from "../figures/Rect";
import { Figure, GameState } from "../game/Game";
import { Input } from "../modules/Input";
import { Time } from "../modules/Time";
import { Color } from "../utils/Color";
import { Key, MouseButton } from "../utils/Keys";
import { Vector2 } from "../utils/Vector2";
import { Projectile } from "./Projectile";

export class Launcher extends Rect {
  private spreadAngle = 0;

  private readonly projectileSpeed = 400;
  private readonly projectileRadius = 5;

  private readonly shootRate = 0.1;
  private shootCooldown = 0;

  private readonly acceleration = 1000;
  private readonly maxSpeed = 400;

  private hp = 10;

  private playerControlled = true;

  constructor(
    origin: Vector2,
    size: Vector2,
    color: Color = Color.getRandomColor()
  ) {
    super(origin, size, color);
    this.addCollider(this.handleCollision.bind(this));
  }

  public disablePlayerControls() {
    this.playerControlled = false;
    return this;
  }

  public addSpreadAngle(degree: number) {
    this.spreadAngle = degree;
    return this;
  }

  private handleCollision(target: Figure) {
    if (target instanceof Projectile) return true;
  }

  public receiveDamage(damage: number) {
    this.hp -= damage;
    if (this.hp < 0) {
      GameState.deleteFigure(this.id);
    }
  }

  public update(): void {
    if (this.playerControlled) {
      this.handlePlayerShoot();
      this.handlePlayerAcceleration();
    } else {
      this.handleAlgorithmShoot();
      this.handleAlgorithmAcceleration();
    }
    super.update();
  }

  private handlePlayerShoot() {
    this.shootCooldown += Time.deltaTime;
    if (this.shootCooldown > this.shootRate && Input.get(MouseButton.Left)) {
      this.shootCooldown = 0;

      this.shootAt(Input.mousePosition);
    }
  }

  private handlePlayerAcceleration() {
    let newDirection = Vector2.zero();
    if (Input.get(Key.KeyW)) newDirection.y -= 1;
    if (Input.get(Key.KeyS)) newDirection.y += 1;
    if (Input.get(Key.KeyA)) newDirection.x -= 1;
    if (Input.get(Key.KeyD)) newDirection.x += 1;
    if (Input.get(Key.Space)) newDirection = this.speed.normalize().reverse();

    let newSpeed = this.speed.add(
      newDirection
        .multiplyScalar(this.acceleration)
        .multiplyScalar(Time.deltaTime)
    );
    if (newSpeed.magnitude() > this.maxSpeed) {
      newSpeed = newSpeed.normalize().multiplyScalar(this.maxSpeed);
    }
    if (newSpeed.equals(Vector2.zero(), 1e-2)) {
      newSpeed = Vector2.zero();
    }

    this.speed = newSpeed;
  }

  private handleAlgorithmShoot() {
    this.shootCooldown += Time.deltaTime;
    if (this.shootCooldown < this.shootRate) return;
    this.shootCooldown = 0;

    const enemy = GameState.figures.find(
      (f): f is Launcher => f.id !== this.id && f instanceof Launcher
    );
    if (!enemy) return;

    const bounds = Bounds.fromRect(enemy);
    this.shootAt(bounds.center);
  }

  private handleAlgorithmAcceleration() {}

  private shootAt(targetCenter: Vector2) {
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
      new Projectile(center, this.projectileRadius, speed)
    );
  }
}
