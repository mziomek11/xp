import React from "react";
import { shallow } from "enzyme";

import Circle from "./Circle";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Circle />);

describe("Paint Circle Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
