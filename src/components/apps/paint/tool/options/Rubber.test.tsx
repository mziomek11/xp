import React from "react";
import { shallow } from "enzyme";

import { RubberOptions } from "./Rubber";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { RubberSize } from "../../models";

const mockSetOptionsFn = jest.fn();
const paint: any = {
  setOptions: mockSetOptionsFn,
  options: { rubberSize: RubberSize.Small }
};

const wrapper = shallow<RubberOptions>(<RubberOptions paint={paint} />);
const instance = wrapper.instance();

describe("Paint ToolRubberOptions component", () => {
  describe("render", () => {
    it("should render five options", () => {
      expect(findByTestAtrr(wrapper, "option").length).toBe(4);
    });
  });

  describe("getProps", () => {
    describe("focused", () => {
      it("should be true", () => {
        expect(instance.getProps(RubberSize.Small).focused).toBe(true);
      });

      it("should be false", () => {
        expect(instance.getProps(RubberSize.Medium).focused).toBe(false);
        expect(instance.getProps(RubberSize.Big).focused).toBe(false);
        expect(instance.getProps(RubberSize.ExtraBig).focused).toBe(false);
      });
    });
  });

  describe("getiInlineStyles", () => {
    it("should return height and width equal rubberSize", () => {
      expect(instance.getInlineStyles(RubberSize.ExtraBig)).toEqual({
        height: RubberSize.ExtraBig,
        width: RubberSize.ExtraBig
      });

      expect(instance.getInlineStyles(RubberSize.Small)).toEqual({
        height: RubberSize.Small,
        width: RubberSize.Small
      });
    });
  });

  describe("handleClick", () => {
    it("should call setOptions", () => {
      const size = RubberSize.Medium;
      instance.handleClick(size);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([{ rubberSize: size }]);
    });
  });
});
