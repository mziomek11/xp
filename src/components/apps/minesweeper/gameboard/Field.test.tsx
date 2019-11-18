import React from "react";
import { shallow } from "enzyme";

import minesweeperConfig from "../config";
import { Field } from "./Field";
import { findByTestAtrr } from "../../../../../testingUtils";

type OptionalProps = {
  bombsNear: number;
  isBomb: boolean;
  checked: boolean;
  isGameOver: boolean;
};

let mockOnGameOverFn: jest.Mock;
let mockCheckFieldFn: jest.Mock;

const createWrapper = (optProps: Partial<OptionalProps> = {}) => {
  const optionalProps: OptionalProps = {
    bombsNear: 0,
    isBomb: false,
    checked: false,
    isGameOver: false,
    ...optProps
  };

  mockOnGameOverFn = jest.fn();
  mockCheckFieldFn = jest.fn();

  const props = {
    minesweeper: {
      fields: [
        {
          bombsNear: optionalProps.bombsNear,
          isBomb: optionalProps.isBomb,
          checked: optionalProps.checked
        }
      ],
      onGameOver: mockOnGameOverFn,
      checkField: mockCheckFieldFn,
      isGameOver: optionalProps.isGameOver
    } as any,
    index: 0
  };

  return shallow<Field>(<Field {...props} />);
};

const wrapper = createWrapper();

describe("Minesweeper Gameboard Field Component", () => {
  describe("render", () => {
    describe("NOT checked", () => {
      const wrapper = createWrapper({ checked: false });
      const btn = findByTestAtrr(wrapper, "field-btn");
      const div = findByTestAtrr(wrapper, "field-div");

      describe("field button", () => {
        it("should be rendered", () => {
          expect(btn.length).toBe(1);
        });

        it("should contain width and height from options tileSize", () => {
          expect(btn.prop("style")).toEqual({
            width: minesweeperConfig.tileSize,
            height: minesweeperConfig.tileSize
          });
        });
      });

      describe("field div", () => {
        it("should NOT be rendered", () => {
          expect(div.length).toBe(0);
        });
      });
    });

    describe("checked", () => {
      const wrapper = createWrapper({ checked: true });
      const btn = findByTestAtrr(wrapper, "field-btn");
      const div = findByTestAtrr(wrapper, "field-div");

      describe("field button", () => {
        it("should NOT be rendered", () => {
          expect(btn.length).toBe(0);
        });
      });

      describe("field div", () => {
        it("should be rendered", () => {
          expect(div.length).toBe(1);
        });

        it("should contain width and height from options tileSize", () => {
          expect(div.prop("style")).toEqual({
            width: minesweeperConfig.tileSize,
            height: minesweeperConfig.tileSize
          });
        });
      });
    });
  });

  describe("handleClick", () => {
    it("should NOT call anything", () => {
      const instance = createWrapper({ isGameOver: true }).instance();
      instance.handleClick();

      expect(mockOnGameOverFn.mock.calls.length).toBe(0);
      expect(mockCheckFieldFn.mock.calls.length).toBe(0);
    });

    it("should call checkField", () => {
      const instance = createWrapper({ isGameOver: false }).instance();
      instance.handleClick();

      expect(mockCheckFieldFn.mock.calls.length).toBe(1);
    });

    it("should call onGameOver", () => {
      const optProps = { isGameOver: false, isBomb: true };
      const instance = createWrapper(optProps).instance();
      instance.handleClick();

      expect(mockOnGameOverFn.mock.calls.length).toBe(1);
    });

    it("should call NOT onGameOver", () => {
      const optProps = { isGameOver: false, isBomb: false };
      const instance = createWrapper(optProps).instance();
      instance.handleClick();

      expect(mockOnGameOverFn.mock.calls.length).toBe(0);
    });
  });
});
