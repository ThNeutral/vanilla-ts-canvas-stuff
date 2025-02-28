import { Rect } from "../figures/Rect";
import { Color } from "../utils/Color";
import { Vector2 } from "../utils/Vector2";

export class Wall extends Rect {
  constructor(
    origin: Vector2,
    size: Vector2,
    color: Color = Color.getRandomColor()
  ) {
    super(origin, size, color);
    this.addCollider();
  }

  public update(): void {
    super.update();
  }
}
