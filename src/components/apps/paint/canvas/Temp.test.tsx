import React from "react";
import { shallow } from "enzyme";

import { TempCanvas } from "./Temp";
import { findByTestAtrr } from "../../../../../testingUtils";
import Vector from "../../../../classes/Vector";

let mockSetSelectOptionsFn: jest.Mock;
let mockSetContextFn: jest.Mock;

let mockGetMousePositionFn: jest.Mock;

type OptionalProps = {
  showTempCanvas: boolean;
  isRect: boolean;
  size: Vector;
  position: Vector;
  width: number;
  height: number;
  zoom: number;
};

const createWrapper = (optProps: Partial<OptionalProps> = {}) => {
  const optionalProps: OptionalProps = {
    showTempCanvas: true,
    isRect: true,
    size: Vector.Zero,
    position: Vector.One,
    width: 300,
    height: 300,
    zoom: 1,
    ...optProps
  };
  mockSetContextFn = jest.fn();
  mockSetSelectOptionsFn = jest.fn();
  const props = {
    width: optionalProps.width,
    height: optionalProps.height,
    paint: {
      canvasCtx: {
        canvas: {
          width: optionalProps.width,
          height: optionalProps.height
        }
      },
      setContext: mockSetContextFn,
      setSelectOptions: mockSetSelectOptionsFn,
      showTempCanvas: optionalProps.showTempCanvas,
      options: {
        zoom: optionalProps.zoom,
        select: {
          isRect: optionalProps.isRect,
          size: optionalProps.size,
          position: optionalProps.position
        }
      }
    }
  } as any;

  return shallow<TempCanvas>(<TempCanvas {...props} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();
const getEventPositionResult = Vector.One;

describe("Paint TempCanvas component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });
  });

  describe("getInlineStyles", () => {
    describe("display", () => {
      it("should be block", () => {
        const instance = createWrapper({ showTempCanvas: true }).instance();
        expect(instance.getInlineStyles(0, 0).display).toBe("block");
      });

      it("should be undefined", () => {
        const instance = createWrapper({ showTempCanvas: false }).instance();
        expect(instance.getInlineStyles(0, 0).display).toBe(undefined);
      });
    });

    it("should have given width and height", () => {
      const width = 10;
      const height = 20;
      const result = instance.getInlineStyles(width, height);

      expect(result.width).toBe(width);
      expect(result.height).toBe(height);
    });

    it("should have give width and height zoomed", () => {
      const width = 10;
      const height = 20;
      const zoom = 2;
      const instance = createWrapper({ zoom }).instance();
      const result = instance.getInlineStyles(width, height);

      expect(result.width).toBe(width * zoom);
      expect(result.height).toBe(height * zoom);
    });

    it("should have selecting styles when is selecting", () => {
      const canvasPos = new Vector(10, 15);
      const instance = createWrapper({ isRect: true }).instance();
      instance.setState({ lastCanvasPos: canvasPos });
      const styles = instance.getInlineStyles(0, 0);

      expect(styles.left).toBe(canvasPos.x);
      expect(styles.top).toBe(canvasPos.y);
    });

    it("should NOT have selecting styles when is NOT selecting", () => {
      const instance = createWrapper({ isRect: false }).instance();
      const styles = instance.getInlineStyles(0, 0);

      expect(styles.left).toBe(undefined);
      expect(styles.top).toBe(undefined);
    });
  });

  describe("getWidthAndHeight", () => {
    it("should return size from options", () => {
      const sizeVector = new Vector(10, 15);
      const wrapper = createWrapper({
        isRect: true,
        size: sizeVector,
        width: 200,
        height: 200
      });
      const instance = wrapper.instance();

      expect(instance.getWidthAndHeight()).toEqual([
        sizeVector.x,
        sizeVector.y
      ]);
    });

    it("should return size from props", () => {
      const width = 400;
      const height = 500;
      const wrapper = createWrapper({
        isRect: false,
        size: Vector.Zero,
        width,
        height
      });
      const instance = wrapper.instance();

      expect(instance.getWidthAndHeight()).toEqual([width, height]);
    });
  });

  describe("handleMouseDown", () => {
    let instance: TempCanvas;
    let mockSetStateFn: jest.Mock;
    let mockAddListenersFn: jest.Mock;

    beforeEach(() => {
      instance = createWrapper({ position: Vector.Down }).instance();
      mockGetMousePositionFn = jest.fn(() => getEventPositionResult);
      mockSetStateFn = jest.fn();
      mockAddListenersFn = jest.fn();

      instance.getMousePosition = mockGetMousePositionFn;
      instance.setState = mockSetStateFn;
      instance.addListeners = mockAddListenersFn;
      instance.handleMouseDown("Event" as any);
    });

    it("should call getMousePos with event", () => {
      expect(mockGetMousePositionFn.mock.calls.length).toBe(1);
      expect(mockGetMousePositionFn.mock.calls[0]).toEqual(["Event"]);
    });

    it("should update state with proper args", () => {
      expect(mockSetStateFn.mock.calls.length).toBe(1);
      expect(mockSetStateFn.mock.calls[0]).toEqual([
        { lastMousePos: getEventPositionResult, lastCanvasPos: Vector.Down }
      ]);
    });

    it("should add listeners", () => {
      expect(mockAddListenersFn.mock.calls.length).toBe(1);
    });

    it("should NOT call anything", () => {
      mockGetMousePositionFn = jest.fn(() => getEventPositionResult);
      instance = createWrapper({ isRect: false }).instance();
      instance.getMousePosition = mockGetMousePositionFn;
      instance.handleMouseDown("ev" as any);

      expect(mockGetMousePositionFn.mock.calls.length).toBe(0);
    });
  });

  describe("handleMouseMove", () => {
    let instance: TempCanvas;
    let mockaAdjustCanvasAndMousePosFn: jest.Mock;

    beforeEach(() => {
      instance = createWrapper().instance();
      mockGetMousePositionFn = jest.fn(() => getEventPositionResult);
      mockaAdjustCanvasAndMousePosFn = jest.fn(() => [Vector.Up, Vector.Down]);

      instance.getMousePosition = mockGetMousePositionFn;
      instance.adjustCanvasAndMousePos = mockaAdjustCanvasAndMousePosFn;
      instance.handleMouseMove("Event" as any);
    });

    it("should call getMousePos with event", () => {
      expect(mockGetMousePositionFn.mock.calls.length).toBe(1);
      expect(mockGetMousePositionFn.mock.calls[0]).toEqual(["Event"]);
    });

    it("should call adjustCanvasAndMousePos with canvasPos and mousePos", () => {
      instance.setState({
        lastMousePos: Vector.Left,
        lastCanvasPos: Vector.Right
      });
      expect(mockaAdjustCanvasAndMousePosFn.mock.calls.length).toBe(1);
      expect(mockaAdjustCanvasAndMousePosFn.mock.calls[0]).toEqual([
        new Vector(1, 1),
        new Vector(1, 1)
      ]);
    });

    it("should update state with adjusted canvas and mouse", () => {
      expect(instance.state.lastCanvasPos).toEqual(Vector.Up);
      expect(instance.state.lastMousePos).toEqual(Vector.Down);
    });
  });

  describe("getMousePosition", () => {
    it("should return floored Vector", () => {
      let ev: any = { screenX: 10, screenY: 20 };
      expect(instance.getMousePosition(ev)).toEqual(new Vector(10, 20));

      ev = { screenX: 10.9, screenY: 20.9 };
      expect(instance.getMousePosition(ev)).toEqual(new Vector(10, 20));

      ev = { screenX: 10.1, screenY: 20.1 };
      expect(instance.getMousePosition(ev)).toEqual(new Vector(10, 20));
    });
  });

  describe("handleMouseUp", () => {
    it("should call setSelectOptions with proper args", () => {
      const lastCanvasPos = new Vector(-900, 991);
      const instance = createWrapper().instance();
      instance.setState({ lastCanvasPos });
      instance.handleMouseUp();

      expect(mockSetSelectOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetSelectOptionsFn.mock.calls[0]).toEqual([
        { position: lastCanvasPos }
      ]);
    });

    it("should remove listeners", () => {
      const mockRemoveListenersFn = jest.fn();
      const instance = createWrapper().instance();
      instance.removeListeners = mockRemoveListenersFn;
      instance.handleMouseUp();

      expect(mockRemoveListenersFn.mock.calls.length).toBe(1);
    });
  });
});
