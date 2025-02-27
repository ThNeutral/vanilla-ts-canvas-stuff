import { Time } from "../modules/time";
import { Vector2 } from "../utils/vector2";

export class Rigidbody {
  public static gravityAcceleration = 10;
  public useGravity = true;
  public handleGravity(prevSpeed: Vector2) {
    if (!this.useGravity) return null;
    return new Vector2(prevSpeed.x, prevSpeed.y + Rigidbody.gravityAcceleration * Time.deltaTime);
  }
}