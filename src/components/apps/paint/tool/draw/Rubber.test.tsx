import React from "react";
import { shallow } from "enzyme";

import Rubber from "./Rubber";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Rubber />);

describe("Paint Rubber Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
