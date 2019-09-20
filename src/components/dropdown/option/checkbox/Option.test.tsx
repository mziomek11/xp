import React from "react";
import { shallow } from "enzyme";

import Option from "./Option";
import { findByTestAtrr } from "../../../../../testingUtils";

const props = { name: "", isChecked: true, onClick: jest.fn() };
const wrapper = shallow(<Option {...props} />);

describe("DropDownCheckboxOption Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "option").length).toBe(1);
    });
  });
});
