import React from "react";
import { shallow } from "enzyme";

import Display from "./Display";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Display />);

describe("Calculator Display Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "display").length).toBe(1);
    });
  });
});
