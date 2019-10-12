import React from "react";
import { shallow } from "enzyme";

import { windowConfig, toolbarConfig } from "../../config";
import { Application as App } from "../../store/models";
import { OpenData } from "../../store/window/models";
import { Application } from "./Application";
import { findByTestAtrr } from "../../../testingUtils";

const id: string = "abcde";
const screenHeight: number = window.innerHeight;
const screenWidth: number = window.innerWidth;

const createWrapper = (application: App, openData?: OpenData) => {
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

    it("should throw an error", () => {
      expect(() => createWrapper("+++" as any)).toThrowError();
    });
  });

  describe("getDefaultWindowSizes", () => {
    it("should return proper object", () => {
      expect(wrapper.instance().getDefaultWindowSizes()).toEqual({
        minWidth: windowConfig.MINIMAL_WIDTH,
        maxWidth: screenWidth,
        minHeight: windowConfig.MINIMAL_HEIGHT,
        maxHeight: screenHeight - toolbarConfig.HEIGHT
      });
    });
  });

  describe("getDefaultStartProps", () => {
    it("should return initial width and height", () => {
      const instance = wrapper.instance();
      const sizes = { maxWidth: 10, maxHeight: 20 } as any;

      const { startHeight, startWidth } = instance.getDefaultStartProps(sizes);

      expect(startWidth).toBe(sizes.maxWidth);
      expect(startHeight).toBe(sizes.maxHeight);
    });

    it("should return max width and height", () => {
      const instance = wrapper.instance();
      const sizes = {
        maxWidth: windowConfig.INITIAL_WIDTH + 1,
        maxHeight: windowConfig.INITIAL_HEIGHT + 1
      } as any;

      const { startHeight, startWidth } = instance.getDefaultStartProps(sizes);

      expect(startWidth).toBe(windowConfig.INITIAL_WIDTH);
      expect(startHeight).toBe(windowConfig.INITIAL_HEIGHT);
    });
  });

  describe("getStartPosition", () => {
    it("should calculate startLeft and startTop", () => {
      const instance = wrapper.instance();
      const width: number = 100;
      const maxWidth: number = 200;
      const height: number = 400;
      const maxHeight: number = 800;

      const expectedResult = { startLeft: 50, startTop: 200 };
      const result = instance.getStartPosition(
        width,
        maxWidth,
        height,
        maxHeight
      );

      expect(result).toEqual(expectedResult);
    });
  });
});
