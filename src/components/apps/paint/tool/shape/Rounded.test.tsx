import React from "react";
import { shallow } from "enzyme";

import { Rounded, cornerRadius } from "./Rounded";
import { findByTestAtrr } from "../../../../../../testingUtils";
import Vector, { Corner } from "../../../../../classes/Vector";
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
      options: { shapeDrawMode: { rounded: drawMode } }
    } as any
  };

  return shallow<Rounded>(<Rounded {...props} />);
};

const minV = new Vector(5, 2);
const maxV = new Vector(10, 4);
const cornerNW = new Vector(14, 21);
const cornerSE = new Vector(15, 22);
const rx = 10;
const ry = 20;
const ctx = 5 as any;
const testVector: Vector = new Vector(12, 14);

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Rounded Tool component", () => {
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
    let instance: Rounded;
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
    let instance: Rounded;
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
    let instance: Rounded = createWrapper().instance();
    let mockFillFn: jest.Mock;
    let mockStrokeFn: jest.Mock;

    beforeEach(() => {
      mockFillFn = jest.fn();
      mockStrokeFn = jest.fn();
    });

    const minV = Vector.getCorner(Vector.Zero, testVector, Corner.TopLeft);
    const maxV = Vector.getCorner(Vector.Zero, testVector, Corner.BottomRight);
    const [x, y] = instance.getXYradius(testVector);
    const [NW, SE] = instance.getNWAndSECircleCenters(minV, maxV, x, y);

    describe("helper function calls", () => {
      beforeEach(() => {
        instance = createWrapper().instance();
        instance.fill = jest.fn();
        instance.stroke = jest.fn();
      });

      it("should call getXYradius with given vector", () => {
        const mockGetXYradius = jest.fn(() => [10, 10]);
        instance.getXYradius = mockGetXYradius as any;
        instance.draw(testVector, 10 as any);

        expect(mockGetXYradius.mock.calls.length).toBe(1);
        expect(mockGetXYradius.mock.calls[0]).toEqual([testVector]);
      });

      it("should call getNWAndSECircleCenters with minX, winY, rx, ry", () => {
        const mockGetNWAndSECircleCenters = jest.fn(() => [
          testVector,
          testVector
        ]);
        instance.getNWAndSECircleCenters = mockGetNWAndSECircleCenters as any;
        instance.draw(testVector, 10 as any);

        expect(mockGetNWAndSECircleCenters.mock.calls.length).toBe(1);
        expect(mockGetNWAndSECircleCenters.mock.calls[0].length).toBe(4);
        expect(mockGetNWAndSECircleCenters.mock.calls[0]).toEqual([
          minV,
          maxV,
          ...instance.getXYradius(testVector)
        ]);
      });
    });

    describe("fill", () => {
      beforeEach(() => {
        instance = createWrapper("fill").instance();
        instance.fill = mockFillFn;
      });

      it("should call setColor with proper args", () => {
        instance.setState({ isMouseButtonLeft: true });
        instance.draw(testVector, 10 as any);

        expect(mockSetColorFn.mock.calls.length).toBe(1);
        expect(mockSetColorFn.mock.calls[0][0]).toBe(true);
      });

      it("should call fiil with proper args", () => {
        instance.draw(testVector, 1 as any);
        expect(mockFillFn.mock.calls.length).toBe(1);
        expect(mockFillFn.mock.calls[0]).toEqual([minV, maxV, NW, SE, x, y, 1]);
      });
    });

    describe("stroke", () => {
      beforeEach(() => {
        instance = createWrapper("stroke").instance();
        instance.stroke = mockStrokeFn;
      });

      it("should call setColor with proper args", () => {
        instance.setState({ isMouseButtonLeft: true });
        instance.draw(testVector, 10 as any);

        expect(mockSetColorFn.mock.calls.length).toBe(1);
        expect(mockSetColorFn.mock.calls[0][0]).toBe(true);
      });

      it("should call stroke with proper args", () => {
        instance.draw(testVector, 1 as any);
        expect(mockStrokeFn.mock.calls.length).toBe(1);
        const [callArgs] = mockStrokeFn.mock.calls;
        expect(callArgs).toEqual([minV, maxV, NW, SE, x, y, 1]);
      });
    });

    describe("both", () => {
      beforeEach(() => {
        instance = createWrapper("both").instance();
        instance.stroke = mockStrokeFn;
        instance.fill = mockFillFn;
      });

      it("should call setColor with proper args", () => {
        instance.setState({ isMouseButtonLeft: true });
        instance.draw(testVector, 10 as any);

        expect(mockSetColorFn.mock.calls.length).toBe(2);
        expect(mockSetColorFn.mock.calls[0][0]).toBe(false);
        expect(mockSetColorFn.mock.calls[1][0]).toBe(true);
      });

      it("should call stroke with proper args", () => {
        instance.draw(testVector, 1 as any);
        expect(mockStrokeFn.mock.calls.length).toBe(1);
        const [callArgs] = mockStrokeFn.mock.calls;
        expect(callArgs).toEqual([minV, maxV, NW, SE, x, y, 1]);
      });

      it("should call fiil with proper args", () => {
        instance.draw(testVector, 1 as any);
        expect(mockFillFn.mock.calls.length).toBe(1);
        expect(mockFillFn.mock.calls[0]).toEqual([minV, maxV, NW, SE, x, y, 1]);
      });
    });
  });

  describe("getXYradius", () => {
    it("should return proper value", () => {
      const { getXYradius, setState } = instance;

      setState({ startPoint: new Vector(10, 20) });
      expect(getXYradius(new Vector(40, -40))).toEqual([
        cornerRadius,
        cornerRadius
      ]);

      setState({ startPoint: new Vector(3, 2) });
      expect(getXYradius(new Vector(5, 7))).toEqual([1, 2]);

      setState({ startPoint: new Vector(4, 2) });
      expect(getXYradius(new Vector(5, 7))).toEqual([0, 2]);
    });
  });

  describe("getNWAndSECircleCenters", () => {
    it("should return proper value", () => {
      const vMin = new Vector(15, 30);
      const vMax = new Vector(30, 45);
      const result = instance.getNWAndSECircleCenters(vMin, vMax, 10, 5);
      expect(result).toEqual([{ x: 25, y: 35 }, { x: 20, y: 40 }]);
    });
  });

  describe("stroke", () => {
    let instance: Rounded;
    beforeEach(() => {
      instance = createWrapper().instance();
      instance.strokeCorners = jest.fn();
      instance.strokeLines = jest.fn();
    });

    it("should call strokeCorners with proper args", () => {
      const mockStrokeCornersFn = jest.fn();
      instance.strokeCorners = mockStrokeCornersFn;

      instance.stroke(minV, maxV, cornerNW, cornerSE, rx, ry, ctx);
      expect(mockStrokeCornersFn.mock.calls.length).toBe(1);
      const [callArgs] = mockStrokeCornersFn.mock.calls;
      expect(callArgs).toEqual([cornerNW, cornerSE, rx, ry, ctx]);
    });

    it("should call strokeLines with proper args", () => {
      const mockStrokeLinefn = jest.fn();
      instance.strokeLines = mockStrokeLinefn;

      instance.stroke(minV, maxV, cornerNW, cornerSE, rx, ry, ctx);
      expect(mockStrokeLinefn.mock.calls.length).toBe(1);
      const [callArgs] = mockStrokeLinefn.mock.calls;
      expect(callArgs).toEqual([cornerNW, cornerSE, minV, maxV, ctx]);
    });
  });

  describe("fill", () => {
    let instance: Rounded;
    beforeEach(() => {
      instance = createWrapper().instance();
      instance.fillCorners = jest.fn();
      instance.fillRest = jest.fn();
    });

    it("should call fillCorners with proper args", () => {
      const mockFillCornersFn = jest.fn();
      instance.fillCorners = mockFillCornersFn;

      instance.fill(minV, maxV, cornerNW, cornerSE, rx, ry, ctx);
      expect(mockFillCornersFn.mock.calls.length).toBe(1);
      const [callArgs] = mockFillCornersFn.mock.calls;
      expect(callArgs).toEqual([cornerNW, cornerSE, rx, ry, ctx]);
    });

    it("should call fillRest with proper args", () => {
      const mockFillRestFn = jest.fn();
      instance.fillRest = mockFillRestFn;

      instance.fill(minV, maxV, cornerNW, cornerSE, rx, ry, ctx);
      expect(mockFillRestFn.mock.calls.length).toBe(1);
      const [callArgs] = mockFillRestFn.mock.calls;
      expect(callArgs).toEqual([minV, maxV, cornerNW, cornerSE, ctx]);
    });
  });
});
