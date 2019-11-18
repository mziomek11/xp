import React from "react";
import { shallow } from "enzyme";

import { Application as App } from "../../store/models";
import { OpenData } from "../../store/window/models";
import { Application } from "./Application";
import { windowConfig } from "../../config";
import { findByTestAtrr } from "../../../testingUtils";
import {
  getWindowDefaultMinMaxProps,
  getWindowStartWidthAndHeight,
  getWindowStartLeftAndTop,
  getWindowNoResizableMinMaxProps
} from "../../utils/window";
import { getMinesweeperSize } from "../../utils/minesweeper";

const id = "this is id";
const screenWidth: number = window.innerWidth;
const screenHeight: number = window.innerHeight;

const createWrapper = (
  application: App,
  openData: OpenData = { content: "", path: [] }
) => {
  const window = { openData: openData, application } as any;

  return shallow<Application>(
    <Application
      id={id}
      window={window}
      screenHeight={screenHeight}
      screenWidth={screenWidth}
    />
  );
};

const wrapper = createWrapper("filesystem");
const instance = wrapper.instance();

const startSizeResult = { startWidth: 15, startHeight: 25 };
const minMaxResult = {
  minWidth: 10,
  minHeight: 20,
  maxWidth: 30,
  maxHeight: 40
};

describe("Application Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "ctx").length).toBe(1);
    });
    it("should render Filesystem app", () => {
      const wrapper = createWrapper("filesystem");

      expect(findByTestAtrr(wrapper, "filesystem").length).toBe(1);
    });

    it("should render Notepad app", () => {
      const wrapper = createWrapper("notepad", { content: "a", path: [] });

      expect(findByTestAtrr(wrapper, "notepad").length).toBe(1);
    });

    it("should render Paint app", () => {
      const wrapper = createWrapper("paint", { content: undefined, path: [] });

      expect(findByTestAtrr(wrapper, "paint").length).toBe(1);
    });

    it("should render Minesweeper app", () => {
      const wrapper = createWrapper("minesweeper");

      expect(findByTestAtrr(wrapper, "minesweeper").length).toBe(1);
    });

    it("should throw an error", () => {
      expect(() => createWrapper("+++" as any)).toThrowError();
    });
  });

  describe("getWindowCtxProps", () => {
    const startPositionResult = { startLeft: 1, startTop: 2 };
    const specialAppPropsResult = { special1: "x", special2: "y" };
    let instance: Application;
    let mockGetMinMaxPropsFn: jest.Mock;
    let mockGetStartSizeFn: jest.Mock;
    let mockGetStartPositionFn: jest.Mock;
    let mockGetSpecialAppPropsFn: jest.Mock;

    beforeEach(() => {
      instance = createWrapper("filesystem").instance();
      mockGetMinMaxPropsFn = jest.fn(() => minMaxResult);
      mockGetStartSizeFn = jest.fn(() => startSizeResult);
      mockGetStartPositionFn = jest.fn(() => startPositionResult);
      mockGetSpecialAppPropsFn = jest.fn(() => specialAppPropsResult);

      instance.getMinMaxProps = mockGetMinMaxPropsFn;
      instance.getStartSize = mockGetStartSizeFn;
      instance.getStartPosition = mockGetStartPositionFn;
      instance.getSpecialAppProps = mockGetSpecialAppPropsFn;
      instance.getWindowCtxProps();
    });

    it("should call getMinMaxProps", () => {
      expect(mockGetMinMaxPropsFn.mock.calls.length).toBe(1);
    });

    it("should call getStartSize with minMaxProps", () => {
      expect(mockGetStartSizeFn.mock.calls.length).toBe(1);
      expect(mockGetStartSizeFn.mock.calls[0]).toEqual([minMaxResult]);
    });

    it("should call getStartPosition with startSize", () => {
      expect(mockGetStartPositionFn.mock.calls.length).toBe(1);
      expect(mockGetStartPositionFn.mock.calls[0]).toEqual([startSizeResult]);
    });

    it("should call getAppSpecialProps", () => {
      expect(mockGetSpecialAppPropsFn.mock.calls.length).toBe(1);
    });

    it("should return proper object", () => {
      const result = instance.getWindowCtxProps();

      expect(result).toEqual({
        id,
        startFullscreened: false,
        ...minMaxResult,
        ...startSizeResult,
        ...startPositionResult,
        ...specialAppPropsResult
      });
    });
  });

  describe("getSpecialAppProps", () => {
    it("should return paint special props", () => {
      const instance = createWrapper("paint").instance();
      const result = instance.getSpecialAppProps();

      expect(result).toEqual({ startFullscreened: true });
    });

    it("should return minesweeper special props", () => {
      const instance = createWrapper("minesweeper").instance();
      const result = instance.getSpecialAppProps();

      expect(result).toEqual({ resizable: false, hideFullscreen: true });
    });

    it("should return empty object", () => {
      const instance = createWrapper("notepad").instance();
      const result = instance.getSpecialAppProps();

      expect(result).toEqual({});
    });
  });

  describe("getMinMaxProps", () => {
    it("should return getWindowNoResizableMinMaxProps with minesweeper easy", () => {
      const instance = createWrapper("minesweeper").instance();
      const result = instance.getMinMaxProps();

      const easyVector = getMinesweeperSize("easy");
      expect(result).toEqual(
        getWindowNoResizableMinMaxProps(easyVector.x, easyVector.y)
      );
    });
    
    it("should return getWindowDefaultMinMaxProps result with proper props", () => {
      const result = instance.getMinMaxProps();
      expect(result).toEqual(
        getWindowDefaultMinMaxProps(screenWidth, screenHeight)
      );
    });
  });

  describe("getStartSize", () => {
    it("should return getWindowStartWidthAndHeight with proper props", () => {
      const result = instance.getStartSize(minMaxResult);
      expect(result).toEqual(
        getWindowStartWidthAndHeight(
          windowConfig.INITIAL_WIDTH,
          windowConfig.INITIAL_HEIGHT,
          minMaxResult
        )
      );
    });
  });

  describe("getStartPosition", () => {
    it("should return getWindowStartLeftAndTop with proper props", () => {
      const result = instance.getStartPosition(startSizeResult);
      expect(result).toEqual(
        getWindowStartLeftAndTop(
          startSizeResult.startWidth,
          startSizeResult.startHeight,
          screenWidth,
          screenHeight
        )
      );
    });
  });
});
