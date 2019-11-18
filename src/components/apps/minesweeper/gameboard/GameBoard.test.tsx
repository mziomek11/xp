import React from "react";
import { shallow } from "enzyme";

import { GameBoard } from "./GameBoard";
import { findByTestAtrr } from "../../../../../testingUtils";

const fields = [1, 2, 3, 4, , 5, 6, 7, 7, 8];
const props = { minesweeper: { fields } as any };

const wrapper = shallow(<GameBoard {...props} />);

describe("Minesweeper Gameboard Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "gameboard").length).toBe(1);
    });

    it("should render Field component for every field in context", () => {
      expect(findByTestAtrr(wrapper, "field").length).toBe(fields.length);
    });
  });
});
