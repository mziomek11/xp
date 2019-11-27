import React from "react";
import { shallow } from "enzyme";

import StartContentRight from "./Right";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<StartContentRight />);

describe("StartContentRight Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "right").length).toBe(1);
    });
  });
});
