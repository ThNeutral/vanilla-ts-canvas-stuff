import { Bounds } from "../figures/Rect";
import { GameState } from "../game/Game";
import { Time } from "../modules/Time";
import { Color } from "../utils/Color";
import { Vector2 } from "../utils/Vector2";
import { Player } from "./Player";
import { Shooter } from "./Shooter";

export class Enemy extends Shooter {
  private readonly distance = 500;

  constructor(
    origin: Vector2,
    size: Vector2,
    color: Color = Color.getRandomColor()
  ) {
    super(origin, size, color);
  }

  public update(): void {
    this.handleShoot();
    this.handleAcceleration();
    super.update();
  }

  private handleShoot() {
    this.shootCooldown += Time.deltaTime;
    if (this.shootCooldown < this.shootRate) return;
    this.shootCooldown = 0;

    const player = GameState.figures.find(
      (f): f is Player => f.id !== this.id && f instanceof Player
    );
    if (!player) return;

    const bounds = Bounds.fromRect(player);
    this.shootAt(bounds.center);
  }

  private handleAcceleration() {
    const player = GameState.figures.find(
      (f): f is Player => f.id !== this.id && f instanceof Player
    );
    if (!player) return;

    const playerBounds = Bounds.fromRect(player);
    const thisBounds = Bounds.fromRect(this);
    let directionToPlayer = thisBounds.center.subtract(playerBounds.center);
    console.log(directionToPlayer.magnitude());
    if (directionToPlayer.magnitude() > this.distance) {
      directionToPlayer = directionToPlayer.reverse().normalize();
    } else {
      directionToPlayer = directionToPlayer.normalize();
    }
    this.speed = directionToPlayer.multiplyScalar(this.maxSpeed);
  }
}
