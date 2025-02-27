import { Vector2 } from "../utils/Vector2";

export type ColliderTypes = "rect" | "circle";

export type CollisionDirection = "top" | "bottom" | "left" | "right";

export abstract class Collider {
  constructor(public readonly type: ColliderTypes) {}
  public abstract isCollision(): Vector2;
}