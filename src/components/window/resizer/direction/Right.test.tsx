import React from "react";
import { shallow } from "enzyme";

import RightResizer from "./Right";
import { findByTestAtrr } from "../../../../../testingUtils";

const id = "aisfpiosdopfjspodjf";
const wrapper = shallow(<RightResizer id={id} />);
const resizer = findByTestAtrr(wrapper, "resizer");

describe("WindowRightResizer", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(resizer.length).toBe(1);
    });

    it("should have proper props", () => {
      expect(resizer.prop("resizesWidth")).toBe(true);
      expect(resizer.prop("isLeft")).toBe(undefined);
      expect(resizer.prop("resizesHeight")).toBe(undefined);
      expect(resizer.prop("isTop")).toBe(undefined);
    });
  });
});
