import React from "react";
import { shallow } from "enzyme";

import { MainCanvas } from "./Main";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = (
  width: number = 10,
  height: number = 10,
  zoom: number = 1
) => {
  const props = {
    width,
    height,
    paint: { setContext: jest.fn(), options: { zoom } }
  } as any;

  return shallow<MainCanvas>(<MainCanvas {...props} />);
};

const wrapper = createWrapper();

describe("Paint MainCanvas component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });
  });

  describe("getInlineStyles", () => {
    it("should return with and height", () => {
      const width = 50;
      const height = 40;
      const instance = createWrapper(width, height).instance();
      const styles = instance.getInlineStyles();

      expect(styles).toEqual({ width, height });
    });

    it("should return zoomed width and height", () => {
      const width = 50;
      const height = 40;
      const zoom = 2;
      const instance = createWrapper(width, height, 2).instance();
      const styles = instance.getInlineStyles();

      expect(styles).toEqual({ width: width * zoom, height: height * zoom });
    });
  });
});
