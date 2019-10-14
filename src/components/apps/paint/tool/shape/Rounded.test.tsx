import React from "react";
import { shallow } from "enzyme";

import Rounded from "./Rounded";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Rounded />);

describe("Paint Rounded Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
