import React from "react";
import { shallow } from "enzyme";

import Brush from "./Brush";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Brush />);

describe("Paint Brush Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
