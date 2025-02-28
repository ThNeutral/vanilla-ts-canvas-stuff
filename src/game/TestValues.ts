import { Vector2 } from "../utils/Vector2";
import { Wall } from "../objects/Wall";
import { Launcher } from "../objects/Launcher";

export class TestValues {
  public static aroundScreen() {
    const left = new Wall(
      new Vector2(-25, 0),
      new Vector2(50, window.innerHeight)
    );

    const right = new Wall(
      new Vector2(window.innerWidth - 25, 0),
      new Vector2(50, window.innerHeight)
    );

    const top = new Wall(
      new Vector2(25, -25),
      new Vector2(window.innerWidth - 50, 50)
    );

    const bottom = new Wall(
      new Vector2(25, window.innerHeight - 25),
      new Vector2(window.innerWidth - 50, 50)
    );

    const launcher = new Launcher(
      new Vector2((window.innerWidth - 500) / 2, (window.innerHeight - 50) / 2),
      new Vector2(50, 50)
    ).addSpreadAngle(5);

    const target = new Launcher(
      new Vector2((window.innerWidth + 500) / 2, (window.innerHeight - 50) / 2),
      new Vector2(50, 50)
    )
      .disablePlayerControls()
      .addSpreadAngle(10);

    return [left, right, top, bottom, launcher, target];
  }
}
