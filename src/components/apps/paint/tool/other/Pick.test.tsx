import React from "react";
import { shallow } from "enzyme";

import Pick from "./Pick";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Pick />);

describe("Paint Pick Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
