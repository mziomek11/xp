import React from "react";
import { shallow } from "enzyme";

import { Pick } from "./Pick";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { rgbToHex } from "../../../../../utils/paint";
import Vector from "../../../../../classes/Vector";

const initialColor = "#000000";
let mockSetOptionsFn: jest.Mock;
let mockSetContextFn: jest.Mock;

const createWrapper = (
  currentColor: string = initialColor,
  pixelR: number = 0,
  pixelG: number = 0,
  pixelB: number = 0
) => {
  mockSetOptionsFn = jest.fn();
  mockSetContextFn = jest.fn();

  const paint = {
    setOptions: mockSetOptionsFn,
    setContext: mockSetContextFn,
    canvasCtx: {
      getImageData: () => ({ data: [pixelR, pixelG, pixelB] }),
      canvas: { width: 200, height: 200 }
    },
    options: {
      pickColor: currentColor,
      lastSelectedTool: "brush"
    }
  } as any;

  return shallow<Pick>(<Pick paint={paint} />);
};

const testVector: Vector = new Vector(10, 15);
const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Pick Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("isMouseOutsideCanvas", () => {
    it("shoud return true", () => {
      expect(instance.isMouseOutsideCanvas({ x: -100, y: -100 })).toBe(true);
      expect(instance.isMouseOutsideCanvas({ x: 1000, y: -100 })).toBe(true);
      expect(instance.isMouseOutsideCanvas({ x: 1000, y: 1000 })).toBe(true);
      expect(instance.isMouseOutsideCanvas({ x: -100, y: 1000 })).toBe(true);

      expect(instance.isMouseOutsideCanvas({ x: 10, y: -1000 })).toBe(true);
      expect(instance.isMouseOutsideCanvas({ x: 10, y: 1000 })).toBe(true);

      expect(instance.isMouseOutsideCanvas({ x: -1000, y: 10 })).toBe(true);
      expect(instance.isMouseOutsideCanvas({ x: 1000, y: 10 })).toBe(true);
    });

    it("should return false", () => {
      expect(instance.isMouseOutsideCanvas(testVector)).toBe(false);
    });
  });

  describe("updatePickColor", () => {
    it("should NOT call setOptions when color is the same", () => {
      const instnace = createWrapper(initialColor, 0, 0, 0).instance();
      instnace.updatePickColor(testVector);

      expect(mockSetOptionsFn.mock.calls.length).toBe(0);
    });

    it("should call setOptions", () => {
      const instnace = createWrapper("#123123", 0, 0, 0).instance();
      instnace.updatePickColor(testVector);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { pickColor: initialColor }
      ]);
    });

    it("should call setOptions with white when is outside canvas", () => {
      const instnace = createWrapper("#123123", 0, 0, 0).instance();
      instnace.updatePickColor({ x: -100, y: -100 });

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { pickColor: "#ffffff" }
      ]);
    });
  });

  describe("pixelToColor", () => {
    it("should convert pixel to rgb", () => {
      const { pixelToColor } = instance;

      expect(pixelToColor([2, 5, 3] as any)).toBe(
        rgbToHex({ r: 2, g: 5, b: 3 })
      );
    });
  });

  describe("handleMouseUp", () => {
    it("should call setOptions", () => {
      const instance = createWrapper().instance();
      instance.handleMouseUp();

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { pickColor: "transparent" }
      ]);
    });

    it("should call setContext", () => {
      const color = "red";
      const instance = createWrapper(color).instance();
      instance.handleMouseUp();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
    });
  });
});
