import React from "react";
import { shallow } from "enzyme";

import StartContentLeft from "./Left";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<StartContentLeft />);

describe("StartContentLeft Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "left").length).toBe(1);
    });
  });
});
