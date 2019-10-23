import React from "react";
import { shallow } from "enzyme";

import { Pick } from "./Pick";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { rgbToHex } from "../../../../../utils/paint";

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

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Pick Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    it("should update state", () => {
      instance.setState({ isMouseButtonLeft: false });
      instance.handleMouseDown(10, 10);

      expect(instance.state.isMouseButtonLeft).toBe(true);
    });
  });

  describe("handleContextMenu", () => {
    it("should update state", () => {
      instance.setState({ isMouseButtonLeft: true });
      instance.handleContextMenu(10, 10);

      expect(instance.state.isMouseButtonLeft).toBe(false);
    });
  });

  describe("isMouseOutsideCanvas", () => {
    it("shoud return true", () => {
      expect(instance.isMouseOutsideCanvas(-100, -100)).toBe(true);
      expect(instance.isMouseOutsideCanvas(1000, -100)).toBe(true);
      expect(instance.isMouseOutsideCanvas(1000, 1000)).toBe(true);
      expect(instance.isMouseOutsideCanvas(-100, 1000)).toBe(true);

      expect(instance.isMouseOutsideCanvas(10, -1000)).toBe(true);
      expect(instance.isMouseOutsideCanvas(10, 1000)).toBe(true);

      expect(instance.isMouseOutsideCanvas(-1000, 10)).toBe(true);
      expect(instance.isMouseOutsideCanvas(1000, 10)).toBe(true);
    });

    it("should return false", () => {
      expect(instance.isMouseOutsideCanvas(10, 10)).toBe(false);
    });
  });

  describe("updatePickColor", () => {
    it("should NOT call setOptions when color is the same", () => {
      const instnace = createWrapper(initialColor, 0, 0, 0).instance();
      instnace.updatePickColor(10, 10);

      expect(mockSetOptionsFn.mock.calls.length).toBe(0);
    });

    it("should call setOptions", () => {
      const instnace = createWrapper("#123123", 0, 0, 0).instance();
      instnace.updatePickColor(10, 10);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { pickColor: initialColor }
      ]);
    });

    it("should call setOptions with white when is outside canvas", () => {
      const instnace = createWrapper("#123123", 0, 0, 0).instance();
      instnace.updatePickColor(-100, -100);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { pickColor: "#ffffff" }
      ]);
    });
  });

  describe("pixelToColor", () => {
    it("should convert pixel to rgb", () => {
      const { pixelToColor } = instance;

      expect(pixelToColor([2, 5, 3] as any)).toBe(rgbToHex(2, 5, 3));
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
