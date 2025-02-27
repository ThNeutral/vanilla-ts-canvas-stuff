export class Color {
    constructor(public r: number, public g: number, public b: number) {}

    public toColorString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}