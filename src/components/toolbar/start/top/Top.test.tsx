import React from "react";
import { shallow } from "enzyme";

import StartContentTop from "./Top";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<StartContentTop />);

describe("StartContentTop Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "top").length).toBe(1);
    });
  });
});
