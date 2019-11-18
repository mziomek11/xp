import React from "react";
import { shallow } from "enzyme";

import ResetButton from "./ResetButton";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<ResetButton />);

describe("Minesweeper ResetButton Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "btn").length).toBe(1);
    });
  });
});
