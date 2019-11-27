import React from "react";
import { shallow } from "enzyme";

import StartAllPrograms from "./AllPrograms";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<StartAllPrograms />);
const container = findByTestAtrr(wrapper, "allprograms");

describe("StartAllPrograms Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(container.length).toBe(1);
    });

    it("should render dropdown", () => {
      container.simulate("mouseenter");

      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(1);
    });

    it("should NOT render dropdown", () => {
      container.simulate("mouseleave");

      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(0);
    });
  });
});
