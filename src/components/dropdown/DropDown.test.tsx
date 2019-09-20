import React from "react";
import { shallow } from "enzyme";

import DropDown from "./DropDown";
import { findByTestAtrr } from "../../../testingUtils";

const wrapper = shallow(
  <DropDown>
    <h1 data-test="child">child</h1>
    <h1 data-test="child">child</h1>{" "}
  </DropDown>
);

describe("DropdownDropDown Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(2);
    });
  });
});
