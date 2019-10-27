import React from "react";
import { shallow } from "enzyme";

import { Rectangle } from "./Rectangle";
import { findByTestAtrr } from "../../../../../../testingUtils";
import Vector from "../../../../../classes/Vector";
import { ShapeDrawMode } from "../../models";

let mockSetContextFn: jest.Mock;
let mockSetColorFn: jest.Mock;
let mockClearTempCanvasFn: jest.Mock;

const tempCanvasCtx = 10 as any;
const canvasCtx = 20 as any;
const createWrapper = (drawMode: ShapeDrawMode = "fill") => {
  mockSetContextFn = jest.fn();
  mockSetColorFn = jest.fn();
  mockClearTempCanvasFn = jest.fn();

  const props = {
    paint: {
      setContext: mockSetContextFn,
      setColor: mockSetColorFn,
      clearTempCanvas: mockClearTempCanvasFn,
      tempCanvasCtx: tempCanvasCtx,
      canvasCtx: canvasCtx,
      options: { shapeDrawMode: { rect: drawMode } }
    } as any
  };

  return shallow<Rectangle>(<Rectangle {...props} />);
};

const testVector: Vector = new Vector(12, 14);
const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Rectangle Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    it("should call setContext with proper args", () => {
      const instance = createWrapper().instance();
      instance.handleMouseDown(testVector, true);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: true }
      ]);
    });

    it("should update state", () => {
      instance.setState({ startPoint: Vector.Zero, isMouseButtonLeft: false });
      instance.handleMouseDown(testVector, true);

      expect(instance.state.startPoint).toEqual(testVector);
      expect(instance.state.isMouseButtonLeft).toBe(true);
    });
  });

  describe("handleMouseMove", () => {
    let instance: Rectangle;
    let mockDrawFn: jest.Mock;

    beforeEach(() => {
      mockDrawFn = jest.fn();

      instance = createWrapper().instance();
      instance.draw = mockDrawFn;
      instance.handleMouseMove(testVector);
    });

    it("should call clearTempCanvas", () => {
      expect(mockClearTempCanvasFn.mock.calls.length).toBe(1);
    });

    it("should call draw with given vector and tempCtx", () => {
      expect(mockDrawFn.mock.calls.length).toBe(1);
      const [vector, ctx] = mockDrawFn.mock.calls[0];
      expect(vector).toEqual(testVector);
      expect(ctx).toBe(tempCanvasCtx);
    });
  });

  describe("handleMouseUp", () => {
    let instance: Rectangle;
    let mockDrawFn: jest.Mock;

    beforeEach(() => {
      mockDrawFn = jest.fn();

      instance = createWrapper().instance();
      instance.draw = mockDrawFn;
      instance.handleMouseUp(testVector);
    });

    it("should call clearTempCanvas", () => {
      expect(mockClearTempCanvasFn.mock.calls.length).toBe(1);
    });

    it("should call setContext with proper args", () => {
      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: false }
      ]);
    });

    it("should call draw with given vector and realCtx", () => {
      expect(mockDrawFn.mock.calls.length).toBe(1);
      const [vector, ctx] = mockDrawFn.mock.calls[0];
      expect(vector).toEqual(testVector);
      expect(ctx).toBe(canvasCtx);
    });
  });

  describe("draw", () => {
    let instance: Rectangle;

    const testFillRect = () => {
      const mockFillRectFn = jest.fn();
      const fakeCtx = {
        fillRect: mockFillRectFn,
        strokeRect: jest.fn()
      } as any;
      const [width, height] = Vector.getXYDistance(testVector, Vector.Zero);
      instance.setState({ startPoint: testVector });
      instance.draw(Vector.Zero, fakeCtx);

      expect(mockFillRectFn.mock.calls.length).toBe(1);
      expect(mockFillRectFn.mock.calls[0]).toEqual([
        testVector.x,
        testVector.y,
        width,
        height
      ]);
    };

    const testStroke = () => {
      const mockStrokeRectFn = jest.fn();
      const fakeCtx = {
        strokeRect: mockStrokeRectFn,
        fillRect: jest.fn()
      } as any;
      const [width, height] = Vector.getXYDistance(testVector, Vector.Zero);
      instance.setState({ startPoint: testVector });
      instance.draw(Vector.Zero, fakeCtx);

      expect(mockStrokeRectFn.mock.calls.length).toBe(1);
      expect(mockStrokeRectFn.mock.calls[0]).toEqual([
        testVector.x - 0.5,
        testVector.y - 0.5,
        width,
        height
      ]);
    };

    describe("fill", () => {
      beforeEach(() => {
        instance = createWrapper("fill").instance();
      });

      it("should call setColor with proper args", () => {
        instance.setState({ isMouseButtonLeft: true });
        instance.draw(testVector, { fillRect: jest.fn() } as any);

        expect(mockSetColorFn.mock.calls.length).toBe(1);
        expect(mockSetColorFn.mock.calls[0][0]).toBe(true);
      });

      it("should call fillRect with startX, startY, width, height", () => {
        testFillRect();
      });
    });

    describe("both", () => {
      beforeEach(() => {
        instance = createWrapper("both").instance();
      });

      const fakeCtx = { fillRect: jest.fn(), strokeRect: jest.fn() } as any;
      it("should call setColor with proper args", () => {
        instance.setState({ isMouseButtonLeft: true });
        instance.draw(testVector, fakeCtx);

        expect(mockSetColorFn.mock.calls.length).toBe(2);
        expect(mockSetColorFn.mock.calls[0][0]).toBe(false);
        expect(mockSetColorFn.mock.calls[1][0]).toBe(true);
      });

      it("should call fillRect with startX, startY, width, height", () => {
        testFillRect();
      });

      it("should call strokeRect with proper args", () => {
        testStroke();
      });
    });

    describe("stroke", () => {
      beforeEach(() => {
        instance = createWrapper("stroke").instance();
      });

      it("should call setColor with proper args", () => {
        const fakeCtx = { strokeRect: jest.fn() } as any;
        instance.setState({ isMouseButtonLeft: true });
        instance.draw(testVector, fakeCtx);

        expect(mockSetColorFn.mock.calls.length).toBe(1);
        expect(mockSetColorFn.mock.calls[0][0]).toBe(true);
      });

      it("should call strokeRect with proper args", () => {
        testStroke();
      });
    });
  });
});
