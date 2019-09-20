import React from "react";
import { shallow } from "enzyme";

import Option from "./Option";
import { findByTestAtrr } from "../../../../../testingUtils";

const props = { name: "", dropdown: <div /> };
const wrapper = shallow(<Option {...props} />);
const option = findByTestAtrr(wrapper, "option");
describe("DropDownWithDropDownOption Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(option.length).toBe(1);
    });
  });

  describe("showDropdown", () => {
    it("should be false at start", () => {
      expect(option.prop("showDropDown")).toBe(false);
    });
  });
});
