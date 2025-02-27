import { Vector2 } from "../utils/Vector2";

export class Input {
  private static pressed: {
    [x: string | number]: boolean;
  } = {};

  private static previousMousePosition = Vector2.zero();
  private static _mouseMove = Vector2.zero(); 
  public static get mouseMove() {
    return Input._mouseMove;
  }

  public static get(key: string | number) {
    return !!Input.pressed[key];
  }

  public static update() {
    Input.previousMousePosition = Input.previousMousePosition.add(Input._mouseMove);
    Input._mouseMove = Vector2.zero();
  }

  public static initializeListeners() {
    document.addEventListener("keydown", Input.listenerKeyDown);
    document.addEventListener("keyup", Input.listenerKeyUp);

    document.addEventListener("mousedown", Input.listenerMouseDown);
    document.addEventListener("mouseup", Input.listenerMouseUp);

    document.addEventListener("mousemove", Input.listenerMouseMove);
  }

  public static listenerKeyDown(event: KeyboardEvent) {
    Input.pressed[event.key] = true;
  }

  public static listenerKeyUp(event: KeyboardEvent) {
    if (!Input.pressed[event.key]) return;
    Input.pressed[event.key] = false;
  }

  public static listenerMouseDown(event: MouseEvent) {
    Input.pressed[event.button] = true;
  }

  public static listenerMouseUp(event: MouseEvent) {
    if (!Input.pressed[event.button]) return;
    Input.pressed[event.button] = false;
  }

  public static listenerMouseMove(event: MouseEvent) {
    const currentMousePosition = new Vector2(event.x, event.y);
    Input._mouseMove = currentMousePosition.subtract(Input.previousMousePosition);
  }
}
