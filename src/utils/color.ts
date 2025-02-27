export class Color {
  public static getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return new Color(r, g, b);
  }

  constructor(public r: number, public g: number, public b: number) {}

  public toColorString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
