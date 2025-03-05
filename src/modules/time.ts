export class Time {
  private static _deltaTime: number = 0;
  public static get deltaTime() {
    return this._deltaTime;
  }

  private static startTime: number = 0;
  private static lastFrameTime: number = 0;
  private static targetFPS: number = 0;

  public static timeScale = 1;

  public static initialize(startTime: number, targetFPS: number) {
    Time.startTime = startTime;
    Time.lastFrameTime = startTime;
    Time.targetFPS = targetFPS;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.timeScale = 0;
      } else {
        this.timeScale = 1;
      }
    })
  }

  public static update(lastFrameTime: number) {
    Time._deltaTime = this.timeScale * (lastFrameTime - Time.lastFrameTime) / 1000;
    document.getElementsByTagName('title')[0].innerText = (1 / Time._deltaTime).toFixed(2);  
    Time.lastFrameTime = lastFrameTime;
  }

  public static frameOffsetToTime(offset: number) {
    return Time.startTime + offset;
  }

  public static getFrameTime() {
    return 1000 / this.targetFPS;
  }

  public static getTimeUntilNextFrame() {
    return this.getFrameTime() - (Date.now() - this.lastFrameTime)
  }
}
