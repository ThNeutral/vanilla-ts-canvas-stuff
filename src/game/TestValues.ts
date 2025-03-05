import { Vector2 } from "../utils/Vector2";
import { Wall } from "../objects/Wall";
import { Player } from "../objects/Player";
import { Enemy } from "../objects/Enemy";

export class TestValues {
  private static getWallsAroundScreen() {
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

    return [left, right, top, bottom];
  }

  public static bulletBox() {
    const player = new Player(
      new Vector2(window.innerWidth / 2, window.innerHeight / 2),
      new Vector2(50, 50)
    )
      .addSpreadAngle(180)
      .addDestroyProjectileOnCollision(false)
      .addShootSpeed(0.01);

    return [...this.getWallsAroundScreen(), player];
  }

  public static playerAndEnemy() {
    const player = new Player(
      new Vector2((window.innerWidth - 500) / 2, (window.innerHeight - 50) / 2),
      new Vector2(50, 50)
    ).addSpreadAngle(5);

    const enemy = new Enemy(
      new Vector2((window.innerWidth + 500) / 2, (window.innerHeight - 50) / 2),
      new Vector2(50, 50)
    ).addSpreadAngle(10);

    return [...this.getWallsAroundScreen(), player, enemy];
  }
}
