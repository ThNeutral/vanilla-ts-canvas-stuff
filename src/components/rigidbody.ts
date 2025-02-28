import { Time } from "../modules/Time";
import { Vector2 } from "../utils/Vector2";

export class Rigidbody {
  public static gravityAcceleration = 40;
  public useGravity = true;
  public handleGravity(prevSpeed: Vector2) {
    if (!this.useGravity) return prevSpeed;
    return new Vector2(prevSpeed.x, prevSpeed.y + Rigidbody.gravityAcceleration * Time.deltaTime);
  }
}