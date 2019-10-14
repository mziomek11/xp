import React from "react";
import { shallow } from "enzyme";

import Computer from "./Computer";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Computer />);

describe("File Computer Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });
  });
});
