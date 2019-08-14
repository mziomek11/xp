import React from "react";
import { shallow } from "enzyme";

import Time from "./Time";
import { findByTestAtrr } from "../../../testingUtils";

const wrapper = shallow(<Time />);

describe("Time Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "time").length).toBe(1);
    });
  });
});
