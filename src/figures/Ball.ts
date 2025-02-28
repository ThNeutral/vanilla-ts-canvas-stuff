import { Input } from "../modules/Input";
import { Color } from "../utils/Color";
import { Vector2 } from "../utils/Vector2";
import { Circle } from "./Circle";

export class Ball extends Circle {
  private isThrown = false;
  private readonly throwPower = 500;

  constructor(
    public center: Vector2,
    public radius: number,
    public color: Color
  ) {
    super(center, radius, color);
    this.addCollider().addRigidbody(true);
  }

  public update(): void {
    if (!this.isThrown && Input.get(0)) {
        this.isThrown = true;
        this.rb!.useGravity = true;
        const direction = Input.mousePosition.subtract(this.center).normalize();
        this.speed = direction.multiplyScalar(this.throwPower); 
    }
    
    super.update();
  }
}
