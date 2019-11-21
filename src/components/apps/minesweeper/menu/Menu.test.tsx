import React from "react";
import { shallow } from "enzyme";

import { MinesweeperMenu } from "./Menu";
import { findByTestAtrr } from "../../../../../testingUtils";

const difficulty = "easy";
const mockStartNewGameFn = jest.fn();
const minesweeper = { startNewGame: mockStartNewGameFn, difficulty } as any;
const props = { minesweeper, window: {} as any };

const wrapper = shallow<MinesweeperMenu>(<MinesweeperMenu {...props} />);
const instance = wrapper.instance();

describe("Minesweeper Menu Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render Game component", () => {
      expect(findByTestAtrr(wrapper, "game").length).toBe(1);
    });
  });

  describe("handleNewGameClick", () => {
    it("should call startNewGame with current difficulty", () => {
      instance.handleNewGameClick();

      expect(mockStartNewGameFn.mock.calls.length).toBe(1);
      expect(mockStartNewGameFn.mock.calls[0]).toEqual([difficulty]);
    });
  });
});
