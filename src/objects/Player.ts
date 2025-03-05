import { Input } from "../modules/Input";
import { Time } from "../modules/Time";
import { Color } from "../utils/Color";
import { MouseButton, Key } from "../utils/Keys";
import { Vector2 } from "../utils/Vector2";
import { Shooter } from "./Shooter";

export class Player extends Shooter {
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
    if (this.shootCooldown > this.shootRate && Input.get(MouseButton.Left)) {
      this.shootCooldown = 0;

      this.shootAt(Input.mousePosition);
    }
  }

  private handleAcceleration() {
    let newDirection = Vector2.zero();
    if (Input.get(Key.KeyW)) newDirection.y -= 1;
    if (Input.get(Key.KeyS)) newDirection.y += 1;
    if (Input.get(Key.KeyA)) newDirection.x -= 1;
    if (Input.get(Key.KeyD)) newDirection.x += 1;
    if (Input.get(Key.Space)) newDirection = this.speed.normalize().reverse();

    let newSpeed = this.speed.add(
      newDirection
        .normalize()
        .multiplyScalar(this.acceleration)
        .multiplyScalar(Time.deltaTime)
    );
    if (newSpeed.magnitude() > this.maxSpeed) {
      newSpeed = newSpeed.normalize().multiplyScalar(this.maxSpeed);
    }
    if (newSpeed.equals(Vector2.zero(), 1e1)) {
      newSpeed = Vector2.zero();
    }

    this.speed = newSpeed;
  }
}
