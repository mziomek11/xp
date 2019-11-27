import React from "react";
import { shallow } from "enzyme";

import StartContentBottom from "./Bottom";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<StartContentBottom />);

describe("StartContentBottom Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "bottom").length).toBe(1);
    });
  });
});
