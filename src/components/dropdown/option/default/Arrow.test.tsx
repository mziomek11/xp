import React from "react";
import { shallow } from "enzyme";

import Arrow from "./Arrow";
import { findByTestAtrr } from "../../../../../testingUtils";

const arrowDirection = "left";
const wrapper = shallow(<Arrow direction={arrowDirection} />);

describe("DropdownArrow Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render arrow", () => {
      const arrow = findByTestAtrr(wrapper, "arrow");
      const expectedClass = "dropdown__arrow dropdown__arrow--left";

      expect(arrow.length).toBe(1);
      expect(arrow.prop("className")).toBe(expectedClass);
    });
  });
});
