import React from "react";
import { shallow } from "enzyme";

import StartDivider from "./Divider";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<StartDivider />);

describe("StartDivider Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "divider").length).toBe(1);
    });
  });
});
