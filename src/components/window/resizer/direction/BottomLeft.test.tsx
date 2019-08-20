import React from "react";
import { shallow } from "enzyme";

import BottomLeftResizer from "./BottomLeft";
import { findByTestAtrr } from "../../../../../testingUtils";

const id = "aisfpiosdopfjspodjf";
const wrapper = shallow(<BottomLeftResizer id={id} />);
const resizer = findByTestAtrr(wrapper, "resizer");

describe("WindowBottomLeftResizer", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(resizer.length).toBe(1);
    });

    it("should have proper props", () => {
      expect(resizer.prop("resizesWidth")).toBe(true);
      expect(resizer.prop("isLeft")).toBe(true);
      expect(resizer.prop("resizesHeight")).toBe(true);
      expect(resizer.prop("isTop")).toBe(undefined);
    });
  });
});
