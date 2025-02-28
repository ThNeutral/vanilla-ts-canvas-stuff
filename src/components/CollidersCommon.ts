import { Figure } from "../game/Game";
import { Vector2 } from "../utils/Vector2";

export type ColliderTypes = "rect" | "circle";

export type CollisionCallback = (other: Figure) => boolean | undefined;

export abstract class Collider {
  protected readonly standardPrediction = 1;
  constructor(public readonly type: ColliderTypes) {}
  public abstract isCollision(): { result: Vector2, target: Figure | null };
  public callback: CollisionCallback | null = null;
}