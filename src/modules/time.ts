export class Time {
  private static _deltaTime: number = 0;
  public static get deltaTime() {
    return this._deltaTime;
  }

  private static startTime: number = 0;
  private static lastFrameTime: number = 0;

  private static targetFPS: number = 0;

  public static initialize(startTime: number, targetFPS: number) {
    Time.startTime = startTime;
    Time.lastFrameTime = startTime;
    Time.targetFPS = targetFPS;
  }

  public static update(lastFrameTime: number) {
    Time._deltaTime = (lastFrameTime - Time.lastFrameTime) / 1000;
    Time.lastFrameTime = lastFrameTime;
  }

  public static frameOffsetToTime(offset: number) {
    return Time.startTime + offset;
  }

  public static getFrameTime() {
    return 1000 / Time.targetFPS;
  }

  public static isNextFrame(time: number) {
    return Time.lastFrameTime + Time.getFrameTime() <= time;
  }
}
