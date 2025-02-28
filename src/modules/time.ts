export class Time {
  private static _deltaTime: number = 0;
  public static get deltaTime() {
    return this._deltaTime;
  }

  private static startTime: number = 0;
  private static lastFrameTime: number = 0;

  public static initialize(startTime: number) {
    Time.startTime = startTime;
    Time.lastFrameTime = startTime;
  }

  public static update(lastFrameTime: number) {
    Time._deltaTime = (lastFrameTime - Time.lastFrameTime) / 1000;
    document.getElementsByTagName('title')[0].innerText = (1 / Time._deltaTime).toFixed(2);  
    Time.lastFrameTime = lastFrameTime;
  }

  public static frameOffsetToTime(offset: number) {
    return Time.startTime + offset;
  }
}
