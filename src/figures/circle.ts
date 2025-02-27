import { Color } from "../utils/color";
import { Vector2 } from "../utils/vector2";

export class Rect {
  constructor(
    public center: Vector2,
    public radius: number,
    public color: Color
  ) {};
}
