import React from "react";
import { shallow } from "enzyme";

import { AllProgramsDropdown } from "./Dropdown";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<AllProgramsDropdown openWindow={jest.fn()} />);

describe("StartAllProgramsDropdown Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(1);
    });
  });
});
