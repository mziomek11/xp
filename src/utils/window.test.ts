import { toolbarConfig, windowConfig } from "../config";
import {
  clickedWindow,
  getWindowNoResizableMinMaxProps,
  getWindowDefaultMinMaxProps,
  getWindowCustomMinMaxProps,
  getWindowStartWidthAndHeight,
  getWindowStartLeftAndTop,
  getSubWindowStartLeftAndTop
} from "./window";

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

  describe("getWindowNoResizableMinMaxProps", () => {
    it("should return minMax width and height equal to start", () => {
      const result = getWindowNoResizableMinMaxProps(10, 20);
      expect(result).toEqual({
        minWidth: 10,
        maxWidth: 10,
        minHeight: 20,
        maxHeight: 20
      });
    });
  });

  describe("getWindowDefaultMinMaxProps", () => {
    it("should return minimals from config", () => {
      const result = getWindowDefaultMinMaxProps(10, 20);

      expect(result.minWidth).toBe(windowConfig.MINIMAL_WIDTH);
      expect(result.minHeight).toBe(windowConfig.MINIMAL_HEIGHT);
    });

    it("should return maximals as screenWidth and screenHeight - toolbarHeight", () => {
      const result = getWindowDefaultMinMaxProps(100, 200);

      expect(result.maxWidth).toBe(100);
      expect(result.maxHeight).toBe(200 - toolbarConfig.HEIGHT);
    });
  });

  describe("getWindowCustomMinMaxProps", () => {
    it("should return minimals as start", () => {
      const result = getWindowCustomMinMaxProps(10, 20, 150, 160);

      expect(result.minWidth).toBe(10);
      expect(result.minHeight).toBe(20);
    });

    describe("maxWidth", () => {
      it("should be startWidth", () => {
        const result = getWindowCustomMinMaxProps(100, 20, 90, 160);

        expect(result.maxWidth).toBe(100);
      });

      it("should be screenWidth", () => {
        const result = getWindowCustomMinMaxProps(90, 20, 100, 160);

        expect(result.maxWidth).toBe(100);
      });
    });

    describe("maxHeight", () => {
      it("should be startHeight", () => {
        const result = getWindowCustomMinMaxProps(40, 100, 90, 50);

        expect(result.maxHeight).toBe(100);
      });

      it("should be screenHeight - toolbarHeight", () => {
        const result = getWindowCustomMinMaxProps(90, 20, 40, 160);

        expect(result.maxHeight).toBe(160 - toolbarConfig.HEIGHT);
      });
    });
  });

  describe("getWindowStartWidthAndHeight", () => {
    const minMaxProps = {
      minWidth: 200,
      maxWidth: 400,
      minHeight: 300,
      maxHeight: 500
    };

    describe("startWidth", () => {
      it("should be startWidth", () => {
        const result = getWindowStartWidthAndHeight(300, 400, minMaxProps);

        expect(result.startWidth).toBe(300);
      });

      it("should be minWidth", () => {
        const result = getWindowStartWidthAndHeight(100, 400, minMaxProps);

        expect(result.startWidth).toBe(minMaxProps.minWidth);
      });

      it("should be maxWidth", () => {
        const result = getWindowStartWidthAndHeight(500, 400, minMaxProps);

        expect(result.startWidth).toBe(minMaxProps.maxWidth);
      });
    });

    describe("startHeight", () => {
      it("should be startHeight", () => {
        const result = getWindowStartWidthAndHeight(300, 400, minMaxProps);

        expect(result.startHeight).toBe(400);
      });

      it("should be minHeight", () => {
        const result = getWindowStartWidthAndHeight(100, 200, minMaxProps);

        expect(result.startHeight).toBe(minMaxProps.minHeight);
      });

      it("should be maxHeight", () => {
        const result = getWindowStartWidthAndHeight(500, 600, minMaxProps);

        expect(result.startHeight).toBe(minMaxProps.maxHeight);
      });
    });
  });

  describe("getWindowStartLeftAndTop", () => {
    it("should return proper values", () => {
      const result = getWindowStartLeftAndTop(100, 200, 400, 800);

      expect(result.startLeft).toBe(150);
      expect(result.startTop).toBe(300);
    });
  });

  describe("getSubWindowStartLeftAndTop", () => {
    describe("startLeft", () => {
      it("should return default calculated", () => {
        const res = getSubWindowStartLeftAndTop(
          100,
          0,
          400,
          0,
          300,
          0,
          1000,
          0
        );

        expect(res.startLeft).toBe(450);
      });

      it("should return minimal", () => {
        const res = getSubWindowStartLeftAndTop(
          100,
          0,
          -10000,
          0,
          300,
          0,
          1000,
          0
        );

        expect(res.startLeft).toBe(-100 + windowConfig.PIXELS_TO_LEAVE);
      });

      it("should return maximal", () => {
        const res = getSubWindowStartLeftAndTop(
          100,
          0,
          10000,
          0,
          300,
          0,
          1000,
          0
        );

        expect(res.startLeft).toBe(1000 - windowConfig.PIXELS_TO_LEAVE);
      });
    });

    describe("startTop", () => {
      it("should return default calculated", () => {
        const res = getSubWindowStartLeftAndTop(
          0,
          100,
          0,
          400,
          0,
          300,
          0,
          1000
        );

        expect(res.startTop).toBe(450);
      });

      it("should return minimal", () => {
        const res = getSubWindowStartLeftAndTop(
          0,
          100,
          0,
          -10000,
          0,
          300,
          0,
          1000
        );

        expect(res.startTop).toBe(0);
      });

      it("should return maximal", () => {
        const res = getSubWindowStartLeftAndTop(
          0,
          100,
          0,
          10000,
          0,
          300,
          0,
          1000
        );

        expect(res.startTop).toBe(
          1000 - windowConfig.PIXELS_TO_LEAVE - toolbarConfig.HEIGHT
        );
      });
    });
  });
});
