export class Vector2 {
  public static zero() {
      return new Vector2(0, 0);
  }
  public static one() {
      return new Vector2(1, 1);
  }
  public static right() {
      return new Vector2(1, 0);
  }
  public static left() {
      return new Vector2(-1, 0);
  }
  public static up() {
      return new Vector2(0, 1);
  }
  public static down() {
      return new Vector2(0, -1);
  }

  constructor(public x: number, public y: number) {}

  public add(v: Vector2): Vector2 {
      return new Vector2(this.x + v.x, this.y + v.y);
  }

  public subtract(v: Vector2): Vector2 {
      return new Vector2(this.x - v.x, this.y - v.y);
  }

  public multiplyScalar(scalar: number): Vector2 {
      return new Vector2(this.x * scalar, this.y * scalar);
  }

  public divideScalar(scalar: number): Vector2 {
      if (scalar === 0) throw new Error("Cannot divide by zero");
      return new Vector2(this.x / scalar, this.y / scalar);
  }

  public dot(v: Vector2): number {
      return this.x * v.x + this.y * v.y;
  }

  public magnitude(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize(): Vector2 {
      const mag = this.magnitude();
      return mag === 0 ? Vector2.zero() : this.divideScalar(mag);
  }

  public distanceTo(v: Vector2): number {
      return this.subtract(v).magnitude();
  }

  public reverse(): Vector2 {
      return new Vector2(-this.x, -this.y);
  }

  public static lerp(a: Vector2, b: Vector2, t: number): Vector2 {
      return a.add(b.subtract(a).multiplyScalar(t));
  }

  public projectOnto(v: Vector2): Vector2 {
      const scalar = this.dot(v) / v.dot(v);
      return v.multiplyScalar(scalar);
  }

  public reflect(normal: Vector2): Vector2 {
      return this.subtract(normal.multiplyScalar(2 * this.dot(normal)));
  }

  public angleTo(v: Vector2): number {
      const dotProduct = this.dot(v);
      const magnitudes = this.magnitude() * v.magnitude();
      return Math.acos(dotProduct / magnitudes);
  }

  public equals(v: Vector2, epsilon: number = 1e-6): boolean {
      return (
          Math.abs(this.x - v.x) < epsilon &&
          Math.abs(this.y - v.y) < epsilon
      );
  }

  public toString(): string {
      return `Vector2(${this.x}, ${this.y})`;
  }
}