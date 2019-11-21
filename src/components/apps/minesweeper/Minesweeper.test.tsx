import React from "react";
import { shallow } from "enzyme";

import { Minesweeper } from "./Minesweeper";
import { findByTestAtrr } from "../../../../testingUtils";

const minesweeper = { isGameOver: false } as any;
const wrapper = shallow<Minesweeper>(<Minesweeper minesweeper={minesweeper} />);
const instance = wrapper.instance();

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

  describe("handleMouseDown", () => {
    beforeEach(() => instance.setState({ isPressing: false }));

    it("should update state", () => {
      const ev = { button: 1 } as any;
      instance.handleMouseDown(ev);

      expect(instance.state.isPressing).toBe(true);
    });

    it("should NOT update state", () => {
      const ev = { button: 2 } as any;
      instance.handleMouseDown(ev);

      expect(instance.state.isPressing).toBe(false);
    });
  });

  describe("handleMouseUp", () => {
    it("should update state", () => {
      instance.setState({ isPressing: true });
      instance.handleMouseUp();

      expect(instance.state.isPressing).toBe(false);
    });
  });

  describe("handleContextMenu", () => {
    it("should preventDefault", () => {
      const mockPreventDefaultFn = jest.fn();
      const ev = { preventDefault: mockPreventDefaultFn };
      instance.handleContextMenu(ev);

      expect(mockPreventDefaultFn.mock.calls.length).toBe(1);
    });
  });
});
