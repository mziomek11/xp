import React from "react";
import { shallow } from "enzyme";

import { ErrorPopUp } from "./Error";
import { findByTestAtrr } from "../../../../../testingUtils";

let mockSetPaintContextFn: jest.Mock;
let mockSetWindowContextFn: jest.Mock;

const createWrapper = () => {
  mockSetPaintContextFn = jest.fn();
  mockSetWindowContextFn = jest.fn();

  const props = {
    paint: { setContext: mockSetPaintContextFn } as any,
    window: { setContext: mockSetWindowContextFn } as any
  };

  return shallow<ErrorPopUp>(<ErrorPopUp {...props} />);
};

const wrapper = createWrapper();

describe("Paint ErrorPopUp componennt", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "error").length).toBe(1);
    });
  });

  describe("handleClose", () => {
    beforeEach(() => {
      createWrapper()
        .instance()
        .handleClose();
    });

    it("should call paint.setContext with proper args", () => {
      expect(mockSetPaintContextFn.mock.calls.length).toBe(1);
      expect(mockSetPaintContextFn.mock.calls[0]).toEqual([
        { showError: false }
      ]);
    });

    it("should call window.setContext with proper args", () => {
      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls[0]).toEqual([
        { disabled: false }
      ]);
    });
  });
});
