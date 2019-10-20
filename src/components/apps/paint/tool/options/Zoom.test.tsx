import React from "react";
import { shallow } from "enzyme";

import { ZoomOptions } from "./Zoom";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { ZoomSize } from "../../models";

const mockSetOptionsFn = jest.fn();
const paint: any = {
  setOptions: mockSetOptionsFn,
  options: { zoom: ZoomSize.Default }
};

const wrapper = shallow<ZoomOptions>(<ZoomOptions paint={paint} />);
const instance = wrapper.instance();

describe("Paint ToolZoomOptions component", () => {
  describe("render", () => {
    it("should render four options", () => {
      expect(findByTestAtrr(wrapper, "option").length).toBe(4);
    });
  });

  describe("getOptionProps", () => {
    describe("focused", () => {
      it("should be true", () => {
        expect(instance.getOptionProps(ZoomSize.Default).focused).toBe(true);
      });

      it("should be false", () => {
        expect(instance.getOptionProps(ZoomSize.Small).focused).toBe(false);
        expect(instance.getOptionProps(ZoomSize.Medium).focused).toBe(false);
        expect(instance.getOptionProps(ZoomSize.Big).focused).toBe(false);
      });
    });
  });

  describe("getInlineStyles", () => {
    it("should return width and height equal to zoomSize", () => {
      expect(instance.getInlineStyles(ZoomSize.Default)).toEqual({
        height: ZoomSize.Default,
        width: ZoomSize.Default
      });

      expect(instance.getInlineStyles(ZoomSize.Medium)).toEqual({
        height: ZoomSize.Medium,
        width: ZoomSize.Medium
      });
    });
  });

  describe("handleClick", () => {
    it("should call setOptions", () => {
      const zoomSize = ZoomSize.Big;
      instance.handleClick(zoomSize);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([{ zoom: zoomSize }]);
    });
  });
});
