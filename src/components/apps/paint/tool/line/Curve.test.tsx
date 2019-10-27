import React from "react";
import { shallow } from "enzyme";

import { Curve } from "./Curve";
import { findByTestAtrr } from "../../../../../../testingUtils";
import Vector from "../../../../../classes/Vector";

const canvasWidth = 200;
const canvasHeight = 300;
let mockSetContextFn: jest.Mock;
let mockSetColorFn: jest.Mock;
let mockClearTempCanvasFn: jest.Mock;
let mockPutImageFn: jest.Mock;
let mockGetImageFn: jest.Mock;

const createWrapper = () => {
  mockSetContextFn = jest.fn();
  mockSetColorFn = jest.fn();
  mockClearTempCanvasFn = jest.fn();
  mockGetImageFn = jest.fn();
  mockPutImageFn = jest.fn();

  const props = {
    paint: {
      setContext: mockSetContextFn,
      setColor: mockSetColorFn,
      clearTempCanvas: mockClearTempCanvasFn,
      canvasCtx: {
        putImageData: mockPutImageFn,
        getImageData: mockGetImageFn,
        canvas: { width: canvasWidth, height: canvasHeight }
      }
    } as any,
    drawOnTempCanvas: jest.fn(),
    drawOnRealCanvas: jest.fn()
  };

  return shallow<Curve>(<Curve {...props} />);
};

const testVector = new Vector(10, 15);
const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Curve Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleToolChange", () => {
    it("should update state", () => {
      instance.setState({ drawPhase: 3, imageCopy: 10 as any });
      instance.handleToolChange();

      expect(instance.state.drawPhase).toBe(0);
      expect(instance.state.imageCopy).toBe(null);
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
      instance.setState({ drawPhase: 1 });
      instance.handleMouseDown(testVector, true);

      expect(instance.state.drawPhase).toBe(2);
    });
  });

  describe("handleFirstMouseDown", () => {
    it("should update state", () => {
      instance.setState({ startPoint: { x: 0, y: 0 } });
      instance.handleFirstMouseDown(testVector);

      expect(instance.state.startPoint).toEqual(testVector);
    });

    describe("it should call setColor", () => {
      it("with true argument", () => {
        const instance = createWrapper().instance();
        instance.setState({ isMouseButtonLeft: true });
        instance.handleFirstMouseDown(testVector);

        expect(mockSetColorFn.mock.calls.length).toEqual(1);
        expect(mockSetColorFn.mock.calls[0]).toEqual([true]);
      });

      it("with false argument", () => {
        const instance = createWrapper().instance();
        instance.setState({ isMouseButtonLeft: false });
        instance.handleFirstMouseDown(testVector);

        expect(mockSetColorFn.mock.calls.length).toEqual(1);
        expect(mockSetColorFn.mock.calls[0]).toEqual([false]);
      });
    });
  });

  describe("handleSecondMouseDown", () => {
    it("should call pasteImageData", () => {
      const mockPasteImageDataFn = jest.fn();
      const instance = createWrapper().instance();

      instance.pasteImageData = mockPasteImageDataFn;
      instance.handleSecondMouseDown(testVector);

      expect(mockPasteImageDataFn.mock.calls.length).toBe(1);
    });

    it("should call drawBezierWithPointsBetween with given vector", () => {
      const mockDrawBezier = jest.fn();
      const instance = createWrapper().instance();

      instance.drawBezierWithPointsBetween = mockDrawBezier;
      instance.handleSecondMouseDown(testVector);

      expect(mockDrawBezier.mock.calls.length).toBe(1);
      expect(mockDrawBezier.mock.calls[0][0]).toEqual([testVector]);
      expect(mockDrawBezier.mock.calls[0][1]).toBeTruthy();
    });
  });

  describe("handleThirdMouseDown", () => {
    it("should call pasteImageData", () => {
      const mockPasteImageDataFn = jest.fn();
      const instance = createWrapper().instance();

      instance.pasteImageData = mockPasteImageDataFn;
      instance.handleThirdMouseDown(testVector);

      expect(mockPasteImageDataFn.mock.calls.length).toBe(1);
    });

    it("should call drawBezierBetween with state and given vector", () => {
      const mockDrawBezier = jest.fn();
      const stateVector = { x: 50, y: 100 };
      const instance = createWrapper().instance();
      instance.setState({ firstControlPoint: stateVector });

      instance.drawBezierWithPointsBetween = mockDrawBezier;
      instance.handleThirdMouseDown(testVector);

      expect(mockDrawBezier.mock.calls.length).toBe(1);
      const [arg1, arg2] = mockDrawBezier.mock.calls[0];
      expect(arg1).toEqual([stateVector, testVector]);
      expect(arg2).toBeTruthy();
    });
  });

  describe("copyImageData", () => {
    it("should call getImageData with 0s and canvas size", () => {
      const instance = createWrapper().instance();
      instance.copyImageData();

      expect(mockGetImageFn.mock.calls.length).toBe(1);
      const expectedArgs = [0, 0, canvasWidth, canvasHeight];
      expect(mockGetImageFn.mock.calls[0]).toEqual(expectedArgs);
    });

    it("should update state", () => {
      instance.setState({ imageCopy: 10 } as any);
      instance.copyImageData();

      expect(instance.state.imageCopy).not.toEqual(10);
    });
  });

  describe("pasteImageData", () => {
    it("should call putImageData with proper args", () => {
      const imageCopy = 10 as any;
      const instance = createWrapper().instance();
      instance.setState({ imageCopy });
      instance.pasteImageData();

      expect(mockPutImageFn.mock.calls.length).toBe(1);
      expect(mockPutImageFn.mock.calls[0]).toEqual([imageCopy, 0, 0]);
    });
  });

  describe("handleMouseMove", () => {
    it("should call clearTempCanvas", () => {
      const instance = createWrapper().instance();
      instance.handleMouseMove(testVector);

      expect(mockClearTempCanvasFn.mock.calls.length).toBe(1);
    });

    it("should call handleFirstMouseMove with given vector", () => {
      const mockHandleFirstMouseMoveFn = jest.fn();
      const instance = createWrapper().instance();
      instance.setState({ drawPhase: 1 });
      instance.handleFirstMouseMove = mockHandleFirstMouseMoveFn;

      instance.handleMouseMove(testVector);
      expect(mockHandleFirstMouseMoveFn.mock.calls.length).toBe(1);
      expect(mockHandleFirstMouseMoveFn.mock.calls[0]).toEqual([testVector]);
    });

    it("should call handleSecondMouseMove with given vector", () => {
      const mockHandleSecondMouseMoveFn = jest.fn();
      const instance = createWrapper().instance();
      instance.setState({ drawPhase: 2 });
      instance.handleSecondMouseMove = mockHandleSecondMouseMoveFn;

      instance.handleMouseMove(testVector);
      expect(mockHandleSecondMouseMoveFn.mock.calls.length).toBe(1);
      expect(mockHandleSecondMouseMoveFn.mock.calls[0]).toEqual([testVector]);
    });

    it("should call handleThrirdMouseMove with given vector", () => {
      const mockHandleThirdMouseMoveFn = jest.fn();
      const instance = createWrapper().instance();
      instance.setState({ drawPhase: 3 });
      instance.handleThrirdMouseMove = mockHandleThirdMouseMoveFn;

      instance.handleMouseMove(testVector);
      expect(mockHandleThirdMouseMoveFn.mock.calls.length).toBe(1);
      expect(mockHandleThirdMouseMoveFn.mock.calls[0]).toEqual([testVector]);
    });
  });

  describe("handleSecondMouseMove", () => {
    it("should call bezierBetween with given vector ", () => {
      const mockDrawBezier = jest.fn();
      const instance = createWrapper().instance();

      instance.drawBezierWithPointsBetween = mockDrawBezier;
      instance.handleSecondMouseMove(testVector);

      expect(mockDrawBezier.mock.calls.length).toBe(1);
      expect(mockDrawBezier.mock.calls[0][0]).toEqual([testVector]);
      expect(mockDrawBezier.mock.calls[0][1]).toBeTruthy();
    });
  });

  describe("handleThrirdMouseMove", () => {
    it("should call drawBezierBetween with state and given vector", () => {
      const mockDrawBezier = jest.fn();
      const stateVector = { x: 50, y: 100 };
      const instance = createWrapper().instance();
      instance.setState({ firstControlPoint: stateVector });

      instance.drawBezierWithPointsBetween = mockDrawBezier;
      instance.handleThrirdMouseMove(testVector);

      expect(mockDrawBezier.mock.calls.length).toBe(1);
      const [arg1, arg2] = mockDrawBezier.mock.calls[0];
      expect(arg1).toEqual([stateVector, testVector]);
      expect(arg2).toBeTruthy();
    });
  });

  describe("handleMouseUp", () => {
    it("should call clearTempCanvas", () => {
      const instance = createWrapper().instance();
      instance.handleMouseUp(testVector);

      expect(mockClearTempCanvasFn.mock.calls.length).toBe(1);
    });

    it("should call setContext with proper args", () => {
      const instance = createWrapper().instance();
      instance.handleMouseUp(testVector);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: false }
      ]);
    });

    it("should call handleFirstMouseUp with given vector", () => {
      const mockFirstMouseUpFn = jest.fn();
      const instance = createWrapper().instance();
      instance.setState({ drawPhase: 1 });
      instance.handleFirstMouseUp = mockFirstMouseUpFn;

      instance.handleMouseUp(testVector);
      expect(mockFirstMouseUpFn.mock.calls.length).toBe(1);
      expect(mockFirstMouseUpFn.mock.calls[0]).toEqual([testVector]);
    });

    it("should call handleSecondMouseUp with given vector", () => {
      const mockSecondMouseUpFn = jest.fn();
      const instance = createWrapper().instance();
      instance.setState({ drawPhase: 2 });
      instance.handleSecondMouseUp = mockSecondMouseUpFn;

      instance.handleMouseUp(testVector);
      expect(mockSecondMouseUpFn.mock.calls.length).toBe(1);
      expect(mockSecondMouseUpFn.mock.calls[0]).toEqual([testVector]);
    });

    it("should call handleThirdMouseUp with given vector", () => {
      const mockThirdMouseUpFn = jest.fn();
      const instance = createWrapper().instance();
      instance.setState({ drawPhase: 3 });
      instance.handleThirdMouseUp = mockThirdMouseUpFn;

      instance.handleMouseUp(testVector);
      expect(mockThirdMouseUpFn.mock.calls.length).toBe(1);
      expect(mockThirdMouseUpFn.mock.calls[0]).toEqual([testVector]);
    });
  });

  describe("handleFirstMouseUp", () => {
    it("shoud call copyImageData", () => {
      const mockCopyImageData = jest.fn();
      const instance = createWrapper().instance();

      instance.copyImageData = mockCopyImageData;
      instance.handleFirstMouseUp(testVector);

      expect(mockCopyImageData.mock.calls.length).toBe(1);
    });

    it("should update state", () => {
      instance.setState({ endPoint: { x: 0, y: 0 } });
      instance.handleFirstMouseUp(testVector);

      expect(instance.state.endPoint).toEqual(testVector);
    });
  });

  describe("handleSecondMouseUp", () => {
    it("shoud call copyImageData", () => {
      const mockCopyImageData = jest.fn();
      const instance = createWrapper().instance();

      instance.copyImageData = mockCopyImageData;
      instance.handleSecondMouseUp(testVector);

      expect(mockCopyImageData.mock.calls.length).toBe(1);
    });

    it("should update state", () => {
      instance.setState({ firstControlPoint: { x: 0, y: 0 } });
      instance.handleSecondMouseUp(testVector);

      expect(instance.state.firstControlPoint).toEqual(testVector);
    });

    it("should call bezierBetween with given vector ", () => {
      const mockDrawBezier = jest.fn();
      const instance = createWrapper().instance();

      instance.drawBezierWithPointsBetween = mockDrawBezier;
      instance.handleSecondMouseUp(testVector);

      expect(mockDrawBezier.mock.calls.length).toBe(1);
      expect(mockDrawBezier.mock.calls[0][0]).toEqual([testVector]);
      expect(mockDrawBezier.mock.calls[0][1]).toBeTruthy();
    });
  });

  describe("handleThirdMouseUp", () => {
    it("should update state", () => {
      instance.setState({ drawPhase: 3, imageCopy: 10 as any });
      instance.handleThirdMouseUp(testVector);

      expect(instance.state.drawPhase).toBe(0);
      expect(instance.state.imageCopy).toBe(null);
    });

    it("should call drawBezierBetween with state and given vector", () => {
      const mockDrawBezier = jest.fn();
      const stateVector = { x: 50, y: 100 };
      const instance = createWrapper().instance();
      instance.setState({ firstControlPoint: stateVector });

      instance.drawBezierWithPointsBetween = mockDrawBezier;
      instance.handleThirdMouseUp(testVector);

      expect(mockDrawBezier.mock.calls.length).toBe(1);
      const [arg1, arg2] = mockDrawBezier.mock.calls[0];
      expect(arg1).toEqual([stateVector, testVector]);
      expect(arg2).toBeTruthy();
    });
  });
});
