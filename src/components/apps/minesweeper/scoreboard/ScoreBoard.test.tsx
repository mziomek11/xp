import React from "react";
import { shallow } from "enzyme";

import ScoreBoard from "./ScoreBoard";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<ScoreBoard />);

describe("Minesweeper ScoreBoard Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "scoreboard").length).toBe(1);
    });

    it("should render two Digital components", () => {
      expect(findByTestAtrr(wrapper, "digital").length).toBe(2);
    });

    it("should render ResetButton component", () => {
      expect(findByTestAtrr(wrapper, "btn").length).toBe(1);
    });
  });
});
