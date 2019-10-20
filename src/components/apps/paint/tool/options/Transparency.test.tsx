import React from "react";
import { shallow } from "enzyme";

import { TransparencyOptions } from "./Transparency";
import { findByTestAtrr } from "../../../../../../testingUtils";

import defaultImage from "../../../../../assets/paint/select.png";
import transparentImage from "../../../../../assets/paint/select-transparent.png";

const mockSetOptionsFn = jest.fn();
const paint: any = {
  setOptions: mockSetOptionsFn,
  options: { isSelectTransparent: false }
};

const wrapper = shallow<TransparencyOptions>(
  <TransparencyOptions paint={paint} />
);
const instance = wrapper.instance();

describe("Paint ToolTransparencyOptions component", () => {
  describe("render", () => {
    it("should render two options", () => {
      expect(findByTestAtrr(wrapper, "option").length).toBe(2);
    });
  });

  describe("getOptionProps", () => {
    describe("focused", () => {
      it("should be true", () => {
        expect(instance.getOptionProps(false).focused).toBe(true);
      });

      it("should be false", () => {
        expect(instance.getOptionProps(true).focused).toBe(false);
      });
    });
  });

  describe("getImageProps", () => {
    it("should return proper src and alt when is transparent", () => {
      const result = instance.getImageProps(true);

      expect(result.src).toBe(transparentImage);
      expect(result.alt).toBe("transparency");
    });

    it("should return proper src and alt when is NOT transparent", () => {
      const result = instance.getImageProps(false);

      expect(result.src).toBe(defaultImage);
      expect(result.alt).toBe("no transparency");
    });
  });

  describe("handleClick", () => {
    it("should call setOptions", () => {
      instance.handleClick(true);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { isSelectTransparent: true }
      ]);
    });
  });
});
