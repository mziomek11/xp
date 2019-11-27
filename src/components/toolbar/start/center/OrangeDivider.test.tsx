import React from "react";
import { shallow } from "enzyme";

import StartOrangeDivider from "./OrangeDivider";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<StartOrangeDivider />);

describe("StartOrangeDivider Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "divider").length).toBe(1);
    });
  });
});
