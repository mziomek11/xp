import React from "react";
import { shallow } from "enzyme";

import Calculator from "./Calculator";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow<Calculator>(<Calculator />);

describe("Calculator Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "calculator").length).toBe(1);
    });
  });
});
