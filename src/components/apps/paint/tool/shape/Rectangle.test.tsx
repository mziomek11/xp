import React from "react";
import { shallow } from "enzyme";

import Rectangle from "./Rectangle";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Rectangle />);

describe("Paint Rectangle Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
