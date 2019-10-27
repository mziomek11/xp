import React from "react";
import { shallow } from "enzyme";

import { Straight } from "./Straight";
import { findByTestAtrr } from "../../../../../../testingUtils";
import Vector from "../../../../../classes/Vector";

let mockSetContextFn: jest.Mock;
let mockSetColorFn: jest.Mock;
let mockClearTempCanvasFn: jest.Mock;

const createWrapper = () => {
  mockSetContextFn = jest.fn();
  mockSetColorFn = jest.fn();
  mockClearTempCanvasFn = jest.fn();

  const props = {
    paint: {
      setContext: mockSetContextFn,
      setColor: mockSetColorFn,
      clearTempCanvas: mockClearTempCanvasFn
    } as any,
    drawOnTempCanvas: jest.fn(),
    drawOnRealCanvas: jest.fn()
  };

  return shallow<Straight>(<Straight {...props} />);
};

const testVector: Vector = new Vector(10, 15);
const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Straight Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    it("should update state", () => {
      instance.setState({ startPos: Vector.Zero });
      instance.handleMouseDown(testVector, true);

      expect(instance.state.startPos).toEqual(testVector);
    });

    it("should call setContext with proper args", () => {
      const instance = createWrapper().instance();
      instance.handleMouseDown(testVector, true);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: true }
      ]);
    });

    describe("it should call setColor", () => {
      it("with false argument", () => {
        const instance = createWrapper().instance();
        instance.handleMouseDown(testVector, false);

        expect(mockSetColorFn.mock.calls.length).toBe(1);
        expect(mockSetColorFn.mock.calls[0]).toEqual([false]);
      });

      it("with true argument", () => {
        const instance = createWrapper().instance();
        instance.handleMouseDown(testVector, true);

        expect(mockSetColorFn.mock.calls.length).toBe(1);
        expect(mockSetColorFn.mock.calls[0]).toEqual([true]);
      });
    });
  });

  describe("handleMouseMove", () => {
    it("should call clearTempCanvas", () => {
      const instance = createWrapper().instance();
      instance.handleMouseMove(testVector);

      expect(mockClearTempCanvasFn.mock.calls.length).toBe(1);
    });
  });

  describe("handleMouseUp", () => {
    it("should call setContext with proper args", () => {
      const instance = createWrapper().instance();
      instance.handleMouseUp(testVector);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: false }
      ]);
    });

    it("should call clearTempCanvas", () => {
      const instance = createWrapper().instance();
      instance.handleMouseUp(testVector);

      expect(mockClearTempCanvasFn.mock.calls.length).toBe(1);
    });
  });
});
