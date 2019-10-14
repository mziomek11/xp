import React from "react";
import { shallow } from "enzyme";

import { Rect } from "./Rect";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockSetContextFn = jest.fn();
const props = {
  paint: { setContext: mockSetContextFn } as any,
  hex: "#abcabc"
};
const wrapper = shallow<Rect>(<Rect {...props} />);

describe("Paint RectColors component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "rect").length).toBe(1);
    });
  });

  describe("handleLeftClick", () => {
    it("should call setContext with hex", () => {
      wrapper.instance().handleLeftClick();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { primaryColor: props.hex }
      ]);
    });
  });

  describe("handleRightClick", () => {
    it("should call setContext with hex, and preventDefault", () => {
      const mockPreventDefaultFn = jest.fn();
      const ev = { preventDefault: mockPreventDefaultFn } as any;
      wrapper.instance().handleRightClick(ev);

      expect(mockPreventDefaultFn.mock.calls.length).toEqual(1);
      expect(mockSetContextFn.mock.calls.length).toBe(2);
      expect(mockSetContextFn.mock.calls[1]).toEqual([
        { secondaryColor: props.hex }
      ]);
    });
  });
});
