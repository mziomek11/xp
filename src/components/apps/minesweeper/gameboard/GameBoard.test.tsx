import React from "react";
import { shallow } from "enzyme";

import GameBoard from "./GameBoard";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<GameBoard />);

describe("Minesweeper Gameboard Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "gameboard").length).toBe(1);
    });
  });
});
