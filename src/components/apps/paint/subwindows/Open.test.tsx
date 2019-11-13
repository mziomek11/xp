import React from "react";
import { shallow } from "enzyme";

import { PaintOpen } from "./Open";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockSetWindowContextFn = jest.fn();
const mockSetPaintContextFn = jest.fn();
const props = {
  window: {
    setContext: mockSetWindowContextFn
  } as any,
  paint: { setContext: mockSetPaintContextFn } as any
};

const wrapper = shallow<PaintOpen>(<PaintOpen {...props} />);

describe("Paint Open Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "picker").length).toBe(1);
    });
  });

  describe("closeOpening", () => {
    it("should call setContext with proper args", () => {
      wrapper.instance().closeOpening();

      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls[0]).toEqual([
        { disabled: false }
      ]);

      expect(mockSetPaintContextFn.mock.calls.length).toBe(1);
      expect(mockSetPaintContextFn.mock.calls[0]).toEqual([
        { isOpening: false }
      ]);
    });
  });
});
