import { Vector2 } from "../utils/Vector2";

export type ColliderTypes = "rect" | "circle";

export abstract class Collider {
  protected readonly standardPrediction = 1;
  constructor(public readonly type: ColliderTypes) {}
  public abstract isCollision(): Vector2;
}