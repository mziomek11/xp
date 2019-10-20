import React from "react";
import { shallow } from "enzyme";

import { LineOptions } from "./Line";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { LineWidth } from "../../models";

const mockSetOptionsFn = jest.fn();
const paint: any = {
  setOptions: mockSetOptionsFn,
  options: { lineWidth: LineWidth.ExtraSmall }
};

const wrapper = shallow<LineOptions>(<LineOptions paint={paint} />);
const instance = wrapper.instance();

describe("Paint ToolLineOptions component", () => {
  describe("render", () => {
    it("should render five options", () => {
      expect(findByTestAtrr(wrapper, "option").length).toBe(5);
    });
  });

  describe("getProps", () => {
    describe("focused", () => {
      it("should be true", () => {
        expect(instance.getProps(LineWidth.ExtraSmall).focused).toBe(true);
      });

      it("should be false", () => {
        expect(instance.getProps(LineWidth.Small).focused).toBe(false);
        expect(instance.getProps(LineWidth.Medium).focused).toBe(false);
        expect(instance.getProps(LineWidth.Big).focused).toBe(false);
        expect(instance.getProps(LineWidth.ExtraBig).focused).toBe(false);
      });
    });
  });

  describe("getiInlineStyles", () => {
    it("should return height equal lineWidth", () => {
      expect(instance.getInlineStyles(LineWidth.ExtraBig)).toEqual({
        height: LineWidth.ExtraBig
      });
      expect(instance.getInlineStyles(LineWidth.Small)).toEqual({
        height: LineWidth.Small
      });
    });
  });
  describe("handleClick", () => {
    it("should call setOptions", () => {
      const size = LineWidth.ExtraSmall;
      instance.handleClick(size);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([{ lineWidth: size }]);
    });
  });
});
