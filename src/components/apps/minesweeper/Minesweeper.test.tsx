import React from "react";
import { shallow } from "enzyme";

import Minesweeper from "./Minesweeper";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Minesweeper />);

describe("Minesweeper Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "minesweeper").length).toBe(1);
    });

    it("should render Menu component", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render ScoreBoard component", () => {
      expect(findByTestAtrr(wrapper, "scoreboard").length).toBe(1);
    });

    it("should render GameBoard comonent", () => {
      expect(findByTestAtrr(wrapper, "gameboard").length).toBe(1);
    });
  });
});
