import React from "react";
import { shallow } from "enzyme";

import { HiddenField } from "./HiddenField";
import { findByTestAtrr } from "../../../../../testingUtils";

type OptionalProps = {
  isBomb: boolean;
  checked: boolean;
  isGameOver: boolean;
  flagged: boolean;
};

const index = 0;

let mockOnGameOverFn: jest.Mock;
let mockCheckFieldfn: jest.Mock;
let mockToggleFlagFn: jest.Mock;

const createWrapper = (optProps: Partial<OptionalProps> = {}) => {
  mockOnGameOverFn = jest.fn();
  mockCheckFieldfn = jest.fn();
  mockToggleFlagFn = jest.fn();

  const optionalProps: OptionalProps = {
    isBomb: false,
    checked: false,
    isGameOver: false,
    flagged: false,
    ...optProps
  };

  const { isGameOver, ...fieldProps } = optionalProps;

  const props = {
    minesweeper: {
      fields: [{ ...fieldProps }],
      onGameOver: mockOnGameOverFn,
      checkField: mockCheckFieldfn,
      toggleFlag: mockToggleFlagFn,
      isGameOver: isGameOver
    } as any,
    index: index,
    style: {},
    baseClassName: ""
  };

  return shallow<HiddenField>(<HiddenField {...props} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Minesweeper Gameboard HiddenField Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "hidden").length).toBe(1);
    });
  });

  describe("handleMouseUp", () => {
    const requiredProps = { isGameOver: false, flagged: false };
    const correctEvent = { button: 1 } as any;

    describe("should NOT call anything", () => {
      afterEach(() => {
        expect(mockOnGameOverFn.mock.calls.length).toBe(0);
        expect(mockCheckFieldfn.mock.calls.length).toBe(0);
      });

      it("isGameOver", () => {
        const instance = createWrapper({ isGameOver: true }).instance();
        instance.handleMouseUp({ button: 1 } as any);
      });

      it("is right mouse button", () => {
        const instance = createWrapper({ isGameOver: false }).instance();
        instance.handleMouseUp({ button: 2 } as any);
      });

      it("is flagged", () => {
        const props = { flagged: true, isGameOver: false };
        const instance = createWrapper(props).instance();
        instance.handleMouseUp({ button: 1 } as any);
      });
    });

    it("should call checkHiddenField", () => {
      const instance = createWrapper(requiredProps).instance();
      instance.handleMouseUp(correctEvent);

      expect(mockCheckFieldfn.mock.calls.length).toBe(1);
      expect(mockCheckFieldfn.mock.calls[0]).toEqual([index]);
    });

    it("should call onGameOver", () => {
      const optProps = { ...requiredProps, isBomb: true };
      const instance = createWrapper(optProps).instance();
      instance.handleMouseUp(correctEvent);

      expect(mockOnGameOverFn.mock.calls.length).toBe(1);
      expect(mockOnGameOverFn.mock.calls[0]).toEqual([index]);
    });

    it("should call NOT onGameOver", () => {
      const optProps = { ...requiredProps, isBomb: false };
      const instance = createWrapper(optProps).instance();
      instance.handleMouseUp(correctEvent);

      expect(mockOnGameOverFn.mock.calls.length).toBe(0);
    });
  });

  describe("handleContextMenu", () => {
    const mockPreventDefaultFn = jest.fn();
    const event = { preventDefault: mockPreventDefaultFn };

    it("should call prevent default", () => {
      instance.handleContextMenu(event);

      expect(mockPreventDefaultFn.mock.calls.length).toBe(1);
    });

    it("should call toggleFlag", () => {
      const instance = createWrapper().instance();
      instance.handleContextMenu(event);

      expect(mockToggleFlagFn.mock.calls.length).toBe(1);
      expect(mockToggleFlagFn.mock.calls[0]).toEqual([0]);
    });
  });
});
