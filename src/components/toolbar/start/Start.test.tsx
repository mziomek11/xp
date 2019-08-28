import React from "react";
import { shallow } from "enzyme";

import Start from "./Start";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Start />);

describe("Start Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "start").length).toBe(1);
    });
  });
});
