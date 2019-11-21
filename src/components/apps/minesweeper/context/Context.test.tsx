import React from "react";
import { shallow } from "enzyme";

import Vector from "../../../../classes/Vector";
import msConfig from "../config";
import { ContextProvider } from "./Context";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = () => {
  return shallow<ContextProvider>(
    <ContextProvider>
      <p data-test="child" />
    </ContextProvider>
  );
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Minesweeper Context Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "context").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });

  describe("onGameOver", () => {
    it("should update state", () => {
      const index = 123;
      instance.setState({ isGameOver: false, destroyedBombIndex: 0 });
      instance.onGameOver(index);

      expect(instance.state.isGameOver).toBe(true);
      expect(instance.state.destroyedBombIndex).toBe(index);
    });
  });

  describe("startNewGame", () => {
    it("should update state", () => {
      const instance = createWrapper().instance();
      instance.setState({
        isGameOver: true,
        gameStarted: true,
        boardSize: new Vector(-2, -2),
        bombsLeft: -123,
        fields: []
      });
      instance.startNewGame("easy");

      const {
        isGameOver,
        boardSize,
        bombsLeft,
        fields,
        gameStarted
      } = instance.state;
      expect(isGameOver).toBe(false);
      expect(gameStarted).toBe(false);
      expect(boardSize).toEqual(msConfig.gameBoardOptions.easy.size);
      expect(bombsLeft).toEqual(msConfig.gameBoardOptions.easy.bombCount);
      expect(fields).not.toEqual([]);
    });
  });

  describe("checkField", () => {
    it("should update state", () => {
      const instance = createWrapper().instance();
      instance.setState({ gameStarted: false });
      instance.checkField(0);

      expect(instance.state.fields[0].checked).toBe(true);
      expect(instance.state.gameStarted).toBe(true);
    });
  });

  describe("toggleFlag", () => {
    const startBombleft = 4;
    let instance: ContextProvider;

    describe("was unflagged", () => {
      const initState = {
        fields: [{ flagged: false } as any],
        bombsLeft: startBombleft
      };

      beforeEach(() => {
        instance = createWrapper().instance();
        instance.setState(initState);
      });

      it("should make field unflagged", () => {
        instance.toggleFlag(0);
        expect(instance.state.fields[0].flagged).toBe(true);
      });

      it("should decrement bombsLeft", () => {
        instance.toggleFlag(0);
        expect(instance.state.bombsLeft).toBe(startBombleft - 1);
      });

      it("should NOT update state", () => {
        instance.setState({ bombsLeft: 0 });
        instance.toggleFlag(0);

        expect(instance.state.fields).toEqual(initState.fields);
        expect(instance.state.bombsLeft).toBe(0);
      });
    });

    describe("was flagged", () => {
      beforeAll(() => {
        instance = createWrapper().instance();
        instance.setState({
          fields: [{ flagged: true } as any],
          bombsLeft: startBombleft
        });
        instance.toggleFlag(0);
      });
      it("should make field flagged", () => {
        expect(instance.state.fields[0].flagged).toBe(false);
      });

      it("should increment bombsLeft", () => {
        expect(instance.state.bombsLeft).toBe(startBombleft + 1);
      });
    });
  });
});
