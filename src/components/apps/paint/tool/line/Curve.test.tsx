import React from "react";
import { shallow } from "enzyme";

import Curve from "./Curve";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Curve />);

describe("Paint Curve Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
