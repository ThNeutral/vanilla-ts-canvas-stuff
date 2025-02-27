import { Color } from "../utils/color";
import { Rigidbody } from "../components/rigidbody";
import { Vector2 } from "../utils/vector2";
import { Time } from "../modules/time";

export class Rect {
  public speed = Vector2.zero(); 
  public rb: Rigidbody | null = null

  constructor(
    public origin: Vector2,
    public size: Vector2,
    public color: Color,
  ) {}

  public updateSelf() {
    if (this.rb) {
      const newSpeed = this.rb.handleGravity(this.speed);
      if (newSpeed) {
        this.speed = newSpeed;
      }
    }

    this.origin = this.origin.add(this.speed.multiplyScalar(Time.deltaTime));
  }
}
