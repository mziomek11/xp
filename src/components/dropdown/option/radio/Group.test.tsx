import React from "react";
import { shallow } from "enzyme";

import Group from "./Group";
import { findByTestAtrr } from "../../../../../testingUtils";

const options = [
  { name: "one", value: "first" },
  { name: "two", value: "second" },
  { name: "three", value: "third" }
];
const props = { onClick: jest.fn(), checkedValue: "first", options };
const wrapper = shallow(<Group {...props} />);
const wrapperOptions = findByTestAtrr(wrapper, "option");

describe("DropDownRadioGroup Component", () => {
  describe("render", () => {
    it("should render options", () => {
      expect(wrapperOptions.length).toBe(options.length);
    });

    it("first element should be checked", () => {
      const first = wrapperOptions.first();

      expect(first.prop("isChecked")).toBe(true);
      expect(first.prop("name")).toBe(options[0].name);
      expect(first.prop("value")).toBe(options[0].value);
    });

    it("last element should NOT be checked", () => {
      expect(wrapperOptions.last().prop("isChecked")).toBe(false);
    });
  });
});
