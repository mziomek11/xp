import React from "react";
import { shallow } from "enzyme";

import TopRightResizer from "./TopRight";
import { findByTestAtrr } from "../../../../../testingUtils";

const id = "aisfpiosdopfjspodjf";
const wrapper = shallow(<TopRightResizer id={id} />);
const resizer = findByTestAtrr(wrapper, "resizer");

describe("WindowTopRightResizer", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(resizer.length).toBe(1);
    });

    it("should have proper props", () => {
      expect(resizer.prop("resizesWidth")).toBe(true);
      expect(resizer.prop("isLeft")).toBe(undefined);
      expect(resizer.prop("resizesHeight")).toBe(true);
      expect(resizer.prop("isTop")).toBe(true);
    });
  });
});
