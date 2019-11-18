import React from "react";
import { shallow } from "enzyme";

import Field from "./Field";
import minesweeperConfig from "../config";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Field />);
const field = findByTestAtrr(wrapper, "field");

describe("Minesweeper Gameboard Field Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(field.length).toBe(1);
    });

    it("should have inline styles width and height as tileSize", () => {
      const { tileSize } = minesweeperConfig;

      expect(field.prop("style")).toEqual({
        width: tileSize,
        height: tileSize
      });
    });
  });
});
