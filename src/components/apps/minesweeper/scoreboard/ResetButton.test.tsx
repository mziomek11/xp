import React from "react";
import { shallow } from "enzyme";

import { ResetButton } from "./ResetButton";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockStartNewGameFn = jest.fn();
const difficulty = "hard" as any;
const minesweeper = { startNewGame: mockStartNewGameFn, difficulty } as any;

const wrapper = shallow<ResetButton>(<ResetButton minesweeper={minesweeper} />);
const instance = wrapper.instance();

describe("Minesweeper ResetButton Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "btn").length).toBe(1);
    });
  });

  describe("handleClick", () => {
    it("should call startNewGame", () => {
      instance.handleClick();

      expect(mockStartNewGameFn.mock.calls.length).toBe(1);
      expect(mockStartNewGameFn.mock.calls[0]).toEqual([difficulty]);
    });
  });
});
