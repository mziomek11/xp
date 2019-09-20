import React from "react";
import { shallow } from "enzyme";

import DiskHeader from "./DiskHeader";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<DiskHeader />);

describe("Filesystem DiskHeader Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });
  });
});
