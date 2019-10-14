import React from "react";
import { shallow } from "enzyme";

import Fill from "./Fill";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Fill />);

describe("Paint Fill Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
