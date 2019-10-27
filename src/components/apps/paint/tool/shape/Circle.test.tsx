import React from "react";
import { shallow } from "enzyme";

import Vector from "../../../../../classes/Vector";
import { Circle } from "./Circle";
import { findByTestAtrr } from "../../../../../../testingUtils";
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
      options: { shapeDrawMode: { circle: drawMode } }
    } as any
  };

  return shallow<Circle>(<Circle {...props} />);
};

const testVector: Vector = new Vector(12, 14);
const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Circle Tool component", () => {
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
    let instance: Circle;
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
    let instance: Circle;
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
    const fakeCtx = {
      lineTo: jest.fn(),
      moveTo: jest.fn(),
      beginPath: jest.fn(),
      fillRect: jest.fn(),
      stroke: jest.fn()
    } as any;

    describe("fill", () => {
      it("should call setColor with proper args", () => {
        const instance = createWrapper("fill").instance();
        instance.setState({ isMouseButtonLeft: true });
        instance.draw(testVector, fakeCtx);

        expect(mockSetColorFn.mock.calls.length).toBe(1);
        expect(mockSetColorFn.mock.calls[0][0]).toBe(true);
      });
    });

    describe("both", () => {
      it("should call setColor with proper args", () => {
        const instance = createWrapper("both").instance();
        instance.setState({ isMouseButtonLeft: true });
        instance.draw(testVector, fakeCtx);

        expect(mockSetColorFn.mock.calls.length).toBe(2);
        expect(mockSetColorFn.mock.calls[0][0]).toBe(false);
        expect(mockSetColorFn.mock.calls[1][0]).toBe(true);
      });
    });

    describe("stroke", () => {
      it("should call setColor with proper args", () => {
        const instance = createWrapper("stroke").instance();
        instance.setState({ isMouseButtonLeft: true });
        instance.draw(testVector, fakeCtx);

        expect(mockSetColorFn.mock.calls.length).toBe(1);
        expect(mockSetColorFn.mock.calls[0][0]).toBe(true);
      });
    });
  });
});
