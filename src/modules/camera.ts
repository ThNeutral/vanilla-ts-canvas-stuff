import { Vector2 } from "../utils/vector2";
import { Input } from "./input";

export class Camera {
  private static _offset = Vector2.zero();
  public static get offset() {
    return this._offset;
  }

  public static update() {
    if (Input.get(1)) {
      this._offset = this._offset.add(Input.mouseMove)
    }
  }
}
