import React from "react";
import { shallow } from "enzyme";

import Aero from "./Aero";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Aero />);

describe("Paint Aero Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
