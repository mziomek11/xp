import windowConfig from "../config/window";
import { clickedWindow } from "./window";

describe("Window utils functions", () => {
  describe("clickedWindow", () => {
    const left: number = 0;
    const top: number = 0;
    const width: number = windowConfig.INITIAL_WIDTH;
    const height: number = windowConfig.MINIMAL_HEIGHT;
    const fullScr: boolean = false;

    const clickEvent: any = {
      clientX: 150,
      clientY: 150
    };

    describe("return true", () => {
      it("window is fullscreened", () => {
        const result = clickedWindow(
          clickEvent,
          -100,
          top,
          width,
          height,
          true
        );
        expect(result).toBe(true);
      });

      it("coords are ok", () => {
        const result = clickedWindow(clickEvent, 100, 100, 200, 200, false);
        expect(result).toBe(true);
      });
    });

    describe("return false", () => {
      it("x is on left", () => {
        const result = clickedWindow(
          clickEvent,
          -100,
          top,
          10,
          height,
          fullScr
        );
        expect(result).toBe(false);
      });

      it("x is on right", () => {
        const result = clickedWindow(
          clickEvent,
          5000,
          top,
          10,
          height,
          fullScr
        );
        expect(result).toBe(false);
      });

      it("y is on top", () => {
        const result = clickedWindow(
          clickEvent,
          left,
          -100,
          width,
          10,
          fullScr
        );
        expect(result).toBe(false);
      });

      it("y is on bottom", () => {
        const result = clickedWindow(
          clickEvent,
          left,
          5000,
          width,
          10,
          fullScr
        );
        expect(result).toBe(false);
      });
    });
  });
});
