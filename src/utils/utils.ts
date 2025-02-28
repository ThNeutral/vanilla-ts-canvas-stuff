export function initializeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // canvas.addEventListener("click", async () => {
  //   await canvas.requestPointerLock();
  // });
}

export async function timeout(time: number) {
  await new Promise((res) => setTimeout(res, time));
}
