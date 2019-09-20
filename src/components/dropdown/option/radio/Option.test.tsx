import React from "react";
import { shallow } from "enzyme";

import Option from "./Option";
import { findByTestAtrr } from "../../../../../testingUtils";

const onClick = jest.fn();
const props = { name: "Name", value: "Value", isChecked: true, onClick };
const wrapper = shallow(<Option {...props} />);
const option = findByTestAtrr(wrapper, "option");

describe("DropDownRadioOption Component", () => {
  describe("render", () => {
    it("should render without throwing an error with proper args", () => {
      expect(option.length).toBe(1);
    });
  });

  describe("onClick", () => {
    it("should be called once", () => {
      findByTestAtrr(option.dive(), "container").simulate("click");
      expect(onClick.mock.calls.length).toBe(1);
    });
  });
});
