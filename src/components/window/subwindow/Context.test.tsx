import React from "react";
import { shallow } from "enzyme";

import { Context } from "./Context";
import { findByTestAtrr } from "../../../../testingUtils";
import {
  getWindowNoResizableMinMaxProps,
  getWindowCustomMinMaxProps,
  getSubWindowStartLeftAndTop
} from "../../../utils/window";

const startWidth = 100;
const startHeight = 50;
const parentProps = {
  width: 200,
  height: 200,
  left: 10,
  top: 20
};

const createWrapper = (resizable: boolean = false) => {
  const props = {
    window: { getSubWindowProps: () => ({ ...parentProps }) },
    startWidth,
    startHeight,
    resizable,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  };

  return shallow<Context>(
    <Context {...(props as any)}>
      <p data-test="child" />
      <p data-test="child" />
    </Context>
  );
};
const wrapper = createWrapper();
const instance = wrapper.instance();

describe("SubWindowContext Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "provider").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(2);
    });
  });

  describe("getAdjustedSizeData", () => {
    let instance: Context;
    let mockGetMinMaxPropsFn: jest.Mock;
    let mockGetStartPositionFn: jest.Mock;

    const startPosResult = { startLeft: 5, startTop: 6 };
    const minMaxResult = {
      minWidth: 1,
      maxWidth: 2,
      minHeight: 2,
      maxHeight: 3
    };

    beforeEach(() => {
      instance = createWrapper().instance();
      mockGetMinMaxPropsFn = jest.fn(() => minMaxResult);
      mockGetStartPositionFn = jest.fn(() => startPosResult);

      instance.getMinMaxProps = mockGetMinMaxPropsFn;
      instance.getStartPosition = mockGetStartPositionFn;
      instance.getAdjustedSizeData();
    });
    it("should call getMinMaxProps", () => {
      expect(mockGetMinMaxPropsFn.mock.calls.length).toBe(1);
    });

    it("should call getStartPosition", () => {
      expect(mockGetStartPositionFn.mock.calls.length).toBe(1);
    });

    it("should return minMax and start props", () => {
      expect(instance.getAdjustedSizeData()).toEqual({
        ...minMaxResult,
        ...startPosResult
      });
    });
  });

  describe("getMinMaxProps", () => {
    it("should return getWindowNoResizableMinMaxProps when is NOT resizable", () => {
      const instance = createWrapper(false).instance();
      const result = instance.getMinMaxProps();
      const expRes = getWindowNoResizableMinMaxProps(startWidth, startHeight);

      expect(result).toEqual(expRes);
    });

    it("should return getWindowCustomMinMaxProps when is resizable", () => {
      const instance = createWrapper(true).instance();
      const result = instance.getMinMaxProps();
      const expRes = getWindowCustomMinMaxProps(
        startWidth,
        startHeight,
        window.innerWidth,
        window.innerHeight
      );

      expect(result).toEqual(expRes);
    });
  });

  describe("getStartPosition", () => {
    it("should return getSubWindowStartLeftAndTop", () => {
      const result = instance.getStartPosition();
      const expRes = getSubWindowStartLeftAndTop(
        startWidth,
        startHeight,
        parentProps.width,
        parentProps.height,
        parentProps.left,
        parentProps.top,
        window.innerWidth,
        window.innerHeight
      );

      expect(result).toEqual(expRes);
    });
  });
});
