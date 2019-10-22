import React from "react";
import { shallow } from "enzyme";

import { Pick } from "./Pick";
import colors from "../../colors";
import { findByTestAtrr } from "../../../../../../testingUtils";

let mockSetOptionsFn: jest.Mock;
let mockSetContextFn: jest.Mock;

const createWrapper = (
  currentColor: string = colors[0],
  pixelR: number = 255,
  pixelG: number = 255,
  pixelB: number = 255
) => {
  mockSetOptionsFn = jest.fn();
  mockSetContextFn = jest.fn();

  const paint = {
    setOptions: mockSetOptionsFn,
    setContext: mockSetContextFn,
    canvasCtx: { getImageData: () => ({ data: [pixelR, pixelG, pixelB] }) },
    options: {
      pickColor: currentColor,
      lastSelectedTool: "brush"
    }
  } as any;

  return shallow<Pick>(<Pick paint={paint} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Pick Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("updatePickColor", () => {
    it("should NOT call setOptions when color is the same", () => {
      const instnace = createWrapper(colors[0], 0, 0, 0).instance();
      instnace.updatePickColor(10, 10);

      expect(mockSetOptionsFn.mock.calls.length).toBe(0);
    });

    it("should NOT call setOptions when color is NOT in colors", () => {
      const instnace = createWrapper(colors[0], 0, 0, 1).instance();
      instnace.updatePickColor(10, 10);

      expect(mockSetOptionsFn.mock.calls.length).toBe(0);
    });

    it("should call setOptions", () => {
      const instnace = createWrapper(colors[1], 0, 0, 0).instance();
      instnace.updatePickColor(10, 10);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
    });
  });

  describe("pixelToColor", () => {
    const rgbToString = (r: number, g: number, b: number) =>
      `rgb(${r},${g},${b})`;

    it("should convert pixel to rgb", () => {
      const { pixelToColor } = instance;

      expect(pixelToColor([0, 0, 0] as any)).toBe(rgbToString(0, 0, 0));
      expect(pixelToColor([1, 2, 3] as any)).toBe(rgbToString(1, 2, 3));
      expect(pixelToColor([2, 1, 3] as any)).toBe(rgbToString(2, 1, 3));
      expect(pixelToColor([255, 255, 255] as any)).toBe(
        rgbToString(255, 255, 255)
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
      const color = colors[3];
      const instance = createWrapper(color).instance();
      instance.handleMouseUp();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
    });
  });
});
