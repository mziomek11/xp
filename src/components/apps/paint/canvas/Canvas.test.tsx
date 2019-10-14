import React from "react";
import { shallow } from "enzyme";

import Canvas from "./Canvas";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow<Canvas>(<Canvas />);

describe("Paint Canvas component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });

    it("should render right CanvasResizer", () => {
      const resizer = findByTestAtrr(wrapper, "E");

      expect(resizer.length).toBe(1);
      expect(resizer.prop("isHorizontal")).toBe(true);
      expect(resizer.prop("isVertical")).toBe(false);
    });

    it("should render bottom CanvasResizer", () => {
      const resizer = findByTestAtrr(wrapper, "S");

      expect(resizer.length).toBe(1);
      expect(resizer.prop("isHorizontal")).toBe(false);
      expect(resizer.prop("isVertical")).toBe(true);
    });

    it("should render bottom right CanvasResizer", () => {
      const resizer = findByTestAtrr(wrapper, "SE");

      expect(resizer.length).toBe(1);
      expect(resizer.prop("isHorizontal")).toBe(true);
      expect(resizer.prop("isVertical")).toBe(true);
    });
  });

  describe("resize", () => {
    it("should update state", () => {
      const newWidth: number = 1;
      const newHeight: number = 2;
      wrapper.instance().setState({ width: 0, height: 0 });
      wrapper.instance().resize(newWidth, newHeight);

      expect(wrapper.instance().state).toEqual({
        width: newWidth,
        height: newHeight
      });
    });
  });
});
