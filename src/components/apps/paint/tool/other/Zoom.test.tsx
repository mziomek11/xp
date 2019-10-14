import React from "react";
import { shallow } from "enzyme";

import Zoom from "./Zoom";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Zoom />);

describe("Paint Zoom Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
