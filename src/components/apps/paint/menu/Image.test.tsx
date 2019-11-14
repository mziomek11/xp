import React from "react";
import { shallow } from "enzyme";

import { Image } from "./Image";
import { findByTestAtrr } from "../../../../../testingUtils";

type OptionalProps = {
  isTransparent: boolean;
};

const canvasWidth = 240;
const canvasHeight = 410;

let mockSetSelectOptionsFn: jest.Mock;
let mockFillRectFn: jest.Mock;

const createWrapper = (optProps: Partial<OptionalProps> = {}) => {
  const optionalProps: OptionalProps = {
    isTransparent: true,
    ...optProps
  };

  mockSetSelectOptionsFn = jest.fn();
  mockFillRectFn = jest.fn();

  const props = {
    paint: {
      setSelectOptions: mockSetSelectOptionsFn,
      canvasCtx: {
        fillRect: mockFillRectFn,
        canvas: { width: canvasWidth, height: canvasHeight }
      },
      options: { select: { isTransparent: optionalProps.isTransparent } }
    } as any
  };

  return shallow<Image>(<Image {...props} />);
};

const wrapper = createWrapper();

describe("Paint Image MenuItem Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "image").length).toBe(1);
    });
  });

  describe("handleClearImageClick", () => {
    it("should call fillRect with canvas width and height", () => {
      const instance = createWrapper().instance();
      instance.handleClearImageClick();

      const expectedArgs = [0, 0, canvasWidth, canvasHeight];
      expect(mockFillRectFn.mock.calls.length).toBe(1);
      expect(mockFillRectFn.mock.calls[0]).toEqual(expectedArgs);
    });
  });

  describe("handleDrawOpaqueClick", () => {
    it("should call setSelectOptions with toggled showToolBox", () => {
      let instance = createWrapper({ isTransparent: false }).instance();
      instance.handleDrawOpaqueClick();

      expect(mockSetSelectOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetSelectOptionsFn.mock.calls[0]).toEqual([
        { isTransparent: true }
      ]);

      instance = createWrapper({ isTransparent: true }).instance();
      instance.handleDrawOpaqueClick();

      expect(mockSetSelectOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetSelectOptionsFn.mock.calls[0]).toEqual([
        { isTransparent: false }
      ]);
    });
  });
});
