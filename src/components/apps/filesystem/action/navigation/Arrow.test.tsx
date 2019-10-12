import React from "react";
import { shallow } from "enzyme";

import { Arrow } from "./Arrow";
import { FilesystemContextType } from "ContextType";
import { findByTestAtrr } from "../../../../../../testingUtils";

let mockGoBack: jest.Mock;
let mockGoForward: jest.Mock;
let mockGetLocationOptionsFn: jest.Mock;

const createWrapper = (
  isLeft: boolean,
  isBackDisabled: boolean = false,
  isForwardDisabled: boolean = false,
  contextOverride: Partial<FilesystemContextType> = {}
) => {
  mockGoBack = jest.fn();
  mockGoForward = jest.fn();
  mockGetLocationOptionsFn = jest.fn(() => [{ name: "", onClick: jest.fn() }]);

  const defaultContext: Partial<FilesystemContextType> = {
    shortcuts: {
      back: {
        disabled: isBackDisabled,
        emit: mockGoBack
      },
      forward: {
        disabled: isForwardDisabled,
        emit: mockGoForward
      }
    },
    getLocationOptions: mockGetLocationOptionsFn,
    history: [],
    historyPosition: 0
  } as any;

  const newContext = {
    ...defaultContext,
    ...contextOverride
  } as any;

  return shallow<Arrow>(<Arrow isLeft={isLeft} filesystem={newContext} />);
};

const el = document.createElement("p");
const el2 = document.createElement("div");

describe("Filesystem Action Arrow Component", () => {
  describe("render", () => {
    it("should render ArrowLeft", () => {
      const wrapper = createWrapper(true);

      expect(findByTestAtrr(wrapper, "arrow-left").length).toBe(1);
    });

    it("should render ArrowRight", () => {
      const wrapper = createWrapper(false);

      expect(findByTestAtrr(wrapper, "arrow-right").length).toBe(1);
    });
  });

  describe("handleClick", () => {
    it("should NOT call anything", () => {
      const instance = createWrapper(true).instance();
      instance.handleClick({ target: el } as any, el2, el2, el2);

      expect(mockGoBack.mock.calls.length).toBe(0);
      expect(mockGoForward.mock.calls.length).toBe(0);
    });

    it("should call goUp", () => {
      const instance = createWrapper(true, false, false, {
        historyPosition: 1
      }).instance();
      instance.handleClick({ target: el } as any, el, el2, el2);

      expect(mockGoBack.mock.calls.length).toBe(1);
      expect(mockGoForward.mock.calls.length).toBe(0);
    });

    it("should call goForward", () => {
      const instance = createWrapper(false, false, false, {
        historyPosition: 0,
        history: [[], []]
      }).instance();
      instance.handleClick({ target: el } as any, el, el2, el2);

      expect(mockGoBack.mock.calls.length).toBe(0);
      expect(mockGoForward.mock.calls.length).toBe(1);
    });
  });

  describe("getOptionsData", () => {
    describe("isLeft", () => {
      it("should have proper args", () => {
        const historyPosition = 2;
        const start = historyPosition - 1;
        const end = 0;

        const instance = createWrapper(true, false, false, {
          historyPosition
        }).instance();
        instance.getOptionsData();

        const result = mockGetLocationOptionsFn.mock.calls[0];
        expect(result).toEqual([start, end, false]);
      });
    });

    describe("isRight", () => {
      it("should have proper args", () => {
        const historyPosition = 2;
        const history = [[], [], [], []];
        const start = historyPosition + 1;
        const end = history.length;

        const overrideContext = { historyPosition, history };
        const instance = createWrapper(
          false,
          false,
          false,
          overrideContext
        ).instance();
        instance.getOptionsData();

        const result = mockGetLocationOptionsFn.mock.calls[0];
        expect(result).toEqual([start, end, true]);
      });
    });
  });

  describe("shouldChangeHistory", () => {
    const instance = createWrapper(true, false, false, {
      historyPosition: 2
    }).instance();

    describe("should return true", () => {
      it("target is equal container", () => {
        const result = instance.shouldChangeHistory(el, el, el2, el2);
        expect(result).toBe(true);
      });

      it("target is equal arrow", () => {
        const result = instance.shouldChangeHistory(el, el2, el, el2);
        expect(result).toBe(true);
      });

      it("target is equal text", () => {
        const result = instance.shouldChangeHistory(el, el2, el2, el);
        expect(result).toBe(true);
      });
    });

    describe("should return false", () => {
      it("isDisabled", () => {
        const disabledWrapper = createWrapper(true, true, true, {
          historyPosition: 0
        });
        const result = disabledWrapper
          .instance()
          .shouldChangeHistory(el, el, el, el);

        expect(result).toBe(false);
      });

      it("target is NOT equal any of elements", () => {
        const result = instance.shouldChangeHistory(el, el2, el2, el2);
        expect(result).toBe(false);
      });
    });
  });

  describe("isDisabled", () => {
    describe("isLeft", () => {
      it("should return true", () => {
        const instance = createWrapper(true, true, false, {
          historyPosition: 0
        }).instance();

        expect(instance.isDisabled()).toBe(true);
      });

      it("should return false", () => {
        const instance = createWrapper(true, false, false, {
          historyPosition: 1
        }).instance();

        expect(instance.isDisabled()).toBe(false);
      });
    });

    describe("isRight", () => {
      it("should return true", () => {
        const context = { historyPosition: 1, history: [[], []] };
        const instance = createWrapper(false, false, true, context).instance();

        expect(instance.isDisabled()).toBe(true);
      });

      it("should return false", () => {
        const context = { historyPosition: 0, history: [[], []] };
        const instance = createWrapper(false, false, false, context).instance();

        expect(instance.isDisabled()).toBe(false);
      });
    });
  });
});
