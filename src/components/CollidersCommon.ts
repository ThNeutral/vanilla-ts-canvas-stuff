import { Vector2 } from "../utils/Vector2";

export type ColliderTypes = "rect" | "circle";

export abstract class Collider {
  constructor(public readonly type: ColliderTypes) {}
  public abstract isCollision(): Vector2;
}