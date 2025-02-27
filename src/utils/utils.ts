import { Color } from "./color";

export function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return new Color(r, g, b);
}

export function initializeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.addEventListener("click", async () => {
    await canvas.requestPointerLock();
  });
}
