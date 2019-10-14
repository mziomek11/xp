import React from "react";
import { shallow } from "enzyme";

import Straight from "./Straight";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Straight />);

describe("Paint Straight Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
