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

    it("should render BombsDigital component", () => {
      expect(findByTestAtrr(wrapper, "bombs-digital").length).toBe(1);
    });

    it("should render TimeDigital component", () => {
      expect(findByTestAtrr(wrapper, "time-digital").length).toBe(1);
    });

    it("should render ResetButton component", () => {
      expect(findByTestAtrr(wrapper, "btn").length).toBe(1);
    });
  });
});
