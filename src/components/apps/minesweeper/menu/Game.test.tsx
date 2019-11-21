import React from "react";
import { shallow } from "enzyme";

import { Game } from "./Game";
import { findByTestAtrr } from "../../../../../testingUtils";

type OptionalProps = {
  difficulty: string;
};

let mockStartNewGameFn: jest.Mock;
let mockSetWindowContextFn: jest.Mock;

const createWrapper = (optProps: Partial<OptionalProps> = {}) => {
  const optionalProps: OptionalProps = {
    difficulty: "easy",
    ...optProps
  };

  mockStartNewGameFn = jest.fn();
  mockSetWindowContextFn = jest.fn();

  const props = {
    minesweeper: {
      startNewGame: mockStartNewGameFn,
      difficulty: optionalProps.difficulty
    } as any,
    window: { setContext: mockSetWindowContextFn } as any,
    onNewGameClick: jest.fn()
  };

  return shallow<Game>(<Game {...props} />);
};

const wrapper = createWrapper();

describe("Minesweeper Menu Game Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "game").length).toBe(1);
    });
  });

  describe("Level clicks", () => {
    let instance: Game;
    let mockHandleLevelClickFn: jest.Mock;

    beforeEach(() => {
      instance = createWrapper().instance();
      mockHandleLevelClickFn = jest.fn();
      instance.handleLevelClick = mockHandleLevelClickFn;
    });

    describe("handleBeginnerClick", () => {
      it("should call handleLeveClick with easy", () => {
        instance.handleBeginnerClick();

        expect(mockHandleLevelClickFn.mock.calls.length).toBe(1);
        expect(mockHandleLevelClickFn.mock.calls[0]).toEqual(["easy"]);
      });
    });

    describe("handleIntermediateClick", () => {
      it("should call handleLeveClick with medium", () => {
        instance.handleIntermediateClick();

        expect(mockHandleLevelClickFn.mock.calls.length).toBe(1);
        expect(mockHandleLevelClickFn.mock.calls[0]).toEqual(["medium"]);
      });
    });

    describe("handleExpertClick", () => {
      it("should call handleLeveClick with hard", () => {
        instance.handleExpertClick();

        expect(mockHandleLevelClickFn.mock.calls.length).toBe(1);
        expect(mockHandleLevelClickFn.mock.calls[0]).toEqual(["hard"]);
      });
    });
  });

  describe("handleLevelClick", () => {
    let instance: Game;
    let mockUpdateWindowSizeFn: jest.Mock;

    beforeEach(() => {
      instance = createWrapper({ difficulty: "easy" }).instance();
      mockUpdateWindowSizeFn = jest.fn();
      instance.updateWindowSize = mockUpdateWindowSizeFn;
    });

    it("should call only startNewGame with difference", () => {
      instance.handleLevelClick("easy");

      expect(mockUpdateWindowSizeFn.mock.calls.length).toBe(0);
      expect(mockStartNewGameFn.mock.calls.length).toBe(1);
      expect(mockStartNewGameFn.mock.calls[0]).toEqual(["easy"]);
    });

    it("should call updateWindowSize", () => {
      instance.handleLevelClick("hard");

      expect(mockUpdateWindowSizeFn.mock.calls.length).toBe(1);
      expect(mockUpdateWindowSizeFn.mock.calls[0]).toEqual(["hard"]);
    });
  });

  describe("updateWindowSize", () => {
    it("should call setWindowContext with getWindowProps result", () => {
      const getWindowPropsResult = { a: 123, b: 321, c: -123 };
      const mockGetWindowPropsFn = jest.fn(() => getWindowPropsResult);
      const instance = createWrapper().instance();

      instance.getWindowProps = mockGetWindowPropsFn as any;
      instance.updateWindowSize("hard");

      expect(mockGetWindowPropsFn.mock.calls.length).toBe(1);
      expect(mockGetWindowPropsFn.mock.calls[0]).toEqual(["hard"]);

      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls[0]).toEqual([
        getWindowPropsResult
      ]);
    });
  });
});
