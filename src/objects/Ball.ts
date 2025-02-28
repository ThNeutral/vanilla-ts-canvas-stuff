import { Input } from "../modules/Input";
import { Color } from "../utils/Color";
import { Vector2 } from "../utils/Vector2";
import { Circle } from "../figures/Circle";
import { MouseButton } from "../utils/Keys";

export class Ball extends Circle {
  private isThrown = false;
  private readonly throwPower = 500;

  constructor(
    center: Vector2,
    radius: number,
    color: Color = Color.getRandomColor()
  ) {
    super(center, radius, color);
    this.addCollider().addRigidbody(true);
  }

  public update(): void {
    if (!this.isThrown && Input.get(MouseButton.Left)) {
      this.isThrown = true;
      this.rb!.useGravity = true;
      const direction = Input.mousePosition.subtract(this.center).normalize();
      this.speed = direction.multiplyScalar(this.throwPower);
    }

    super.update();
  }
}
