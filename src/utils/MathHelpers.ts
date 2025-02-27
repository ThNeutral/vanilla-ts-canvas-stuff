import { Vector2 } from "./Vector2";

export class MathHelpers {
    public static reflect(vector: Vector2, normal: Vector2) {
        const factor = normal.multiplyScalar(2).multiplyScalar(vector.dot(normal)).divideScalar(normal.magnitude() * normal.magnitude());
        return vector.subtract(factor);
    }
}