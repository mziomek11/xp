import React from "react";
import { shallow } from "enzyme";

import { AeroOptions } from "./Aero";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { AeroSize } from "../../models";

import aeroSmall from "../../../../../assets/paint/aero-small.png";
import aeroMedium from "../../../../../assets/paint/aero-medium.png";
import aeroBig from "../../../../../assets/paint/aero-big.png";

const mockSetOptionsFn = jest.fn();
const paint: any = {
  setOptions: mockSetOptionsFn,
  options: { aeroSize: AeroSize.Small }
};

const wrapper = shallow<AeroOptions>(<AeroOptions paint={paint} />);
const instance = wrapper.instance();

describe("Paint ToolAeroOptions component", () => {
  describe("render", () => {
    it("should render two options", () => {
      expect(findByTestAtrr(wrapper, "option").length).toBe(3);
    });
  });

  describe("getOptionProps", () => {
    describe("focused", () => {
      it("should be true", () => {
        expect(instance.getOptionProps(AeroSize.Small).focused).toBe(true);
      });

      it("should be false", () => {
        expect(instance.getOptionProps(AeroSize.Medium).focused).toBe(false);
        expect(instance.getOptionProps(AeroSize.Big).focused).toBe(false);
      });
    });

    describe("modifies", () => {
      it("should be empty array", () => {
        let modifiers = instance.getOptionProps(AeroSize.Small).modifiers;
        expect(modifiers).toEqual([]);

        modifiers = instance.getOptionProps(AeroSize.Medium).modifiers;
        expect(modifiers).toEqual([]);
      });

      it("should be array with span", () => {
        const { modifiers } = instance.getOptionProps(AeroSize.Big);
        expect(modifiers).toEqual(["span"]);
      });
    });
  });

  describe("getImageSrc", () => {
    it("should return smallImage", () => {
      expect(instance.getImageSrc(AeroSize.Small)).toBe(aeroSmall);
    });

    it("should return mediumImage", () => {
      expect(instance.getImageSrc(AeroSize.Medium)).toBe(aeroMedium);
    });

    it("should return bigImage", () => {
      expect(instance.getImageSrc(AeroSize.Big)).toBe(aeroBig);
    });
  });

  describe("handleClick", () => {
    it("should call setOptions", () => {
      instance.handleClick(AeroSize.Medium);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { aeroSize: AeroSize.Medium }
      ]);
    });
  });
});
