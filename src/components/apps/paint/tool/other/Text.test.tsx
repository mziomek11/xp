import React from "react";
import { shallow } from "enzyme";

import { Text } from "./Text";
import { findByTestAtrr } from "../../../../../../testingUtils";
import Vector from "../../../../../classes/Vector";
import { getSelectPosAndSize } from "../../../../../utils/paint";

type OptProps = {
  isText: boolean;
};

let mockSetContextFn: jest.Mock;
let mockSetSelectOptions: jest.Mock;
let mockClearTempCanvasFn: jest.Mock;

const canvasCtx = { canvas: { width: 10, height: 10 } } as any;

const createWrapper = (opts: Partial<OptProps> = {}) => {
  const optionalProps: OptProps = {
    isText: false,
    ...opts
  };

  mockSetContextFn = jest.fn();
  mockSetSelectOptions = jest.fn();
  mockClearTempCanvasFn = jest.fn();

  const props = {
    paint: {
      setContext: mockSetContextFn,
      setSelectOptions: mockSetSelectOptions,
      clearTempCanvas: mockClearTempCanvasFn,
      canvasCtx: canvasCtx,
      options: { select: { isText: optionalProps.isText } }
    } as any
  };

  return shallow<Text>(<Text {...props} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Text Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleToolChange", () => {
    it("should call setContext with proper args", () => {
      const instance = createWrapper().instance();
      instance.handleToolChange();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: false }
      ]);
    });

    it("should call setSelectOptions with proper args", () => {
      const instance = createWrapper({ isText: true }).instance();
      instance.handleToolChange();

      expect(mockSetSelectOptions.mock.calls.length).toBe(1);
      expect(mockSetSelectOptions.mock.calls[0]).toEqual([{ isText: false }]);
    });

    it("should NOT cal setSelectOptions", () => {
      const instance = createWrapper({ isText: false }).instance();
      instance.handleToolChange();

      expect(mockSetSelectOptions.mock.calls.length).toBe(0);
    });
  });

  describe("handleMouseDown", () => {
    it("should NOT call setSelectOptions", () => {
      const instance = createWrapper({ isText: false }).instance();
      instance.handleMouseDown(Vector.Zero);

      expect(mockSetSelectOptions.mock.calls.length).toBe(0);
    });

    it("should call setSelectOptions with proper args", () => {
      const instance = createWrapper({ isText: true }).instance();
      instance.handleMouseDown(Vector.Zero);

      expect(mockSetSelectOptions.mock.calls.length).toBe(1);
      expect(mockSetSelectOptions.mock.calls[0]).toEqual([{ isText: false }]);
    });

    it("should call setContext with proper args", () => {
      const instance = createWrapper().instance();
      instance.handleMouseDown(Vector.Zero);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: true }
      ]);
    });

    it("should update state with given vector", () => {
      instance.setState({ startPoint: Vector.Zero });
      instance.handleMouseDown(Vector.One);

      expect(instance.state.startPoint).toEqual(Vector.One);
    });
  });

  describe("handleMouseUp", () => {
    it("should only call setSelectOptions", () => {
      const instance = createWrapper({ isText: true }).instance();
      instance.handleMouseUp(Vector.Zero);

      expect(mockSetSelectOptions.mock.calls.length).toBe(1);
      expect(mockSetSelectOptions.mock.calls[0]).toEqual([{ isText: false }]);
      expect(mockClearTempCanvasFn.mock.calls.length).toBe(0);
    });

    it("should call clearTempCanvas", () => {
      const instance = createWrapper({ isText: false }).instance();
      instance.handleMouseUp(Vector.Zero);

      expect(mockClearTempCanvasFn.mock.calls.length).toBe(1);
    });

    it("should call setContext", () => {
      const instance = createWrapper({ isText: false }).instance();
      instance.handleMouseUp(Vector.Zero);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: false }
      ]);
    });

    it("should call setSelectOptions with isText, size and position", () => {
      const canvasPos = new Vector(5, 5);
      const instance = createWrapper({ isText: false }).instance();
      instance.setState({ startPoint: Vector.Zero });
      instance.handleMouseUp(canvasPos);

      const [p, s] = getSelectPosAndSize(Vector.Zero, canvasPos, canvasCtx);
      const exprectedRes = { isText: true, position: p, size: s };

      expect(mockSetSelectOptions.mock.calls.length).toBe(1);
      expect(mockSetSelectOptions.mock.calls[0]).toEqual([exprectedRes]);
    });

    it("should NOT call setSelctOptions", () => {
      const instance = createWrapper({ isText: false }).instance();
      instance.setState({ startPoint: Vector.Zero });
      instance.handleMouseUp(Vector.Zero);

      expect(mockSetSelectOptions.mock.calls.length).toBe(0);
    });
  });
});
