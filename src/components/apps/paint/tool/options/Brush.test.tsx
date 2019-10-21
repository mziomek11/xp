import React from "react";
import { shallow } from "enzyme";

import { BrushOptions } from "./Brush";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { BrushSize } from "../../models";

const mockSetOptionsFn = jest.fn();
const paint: any = {
  setOptions: mockSetOptionsFn,
  options: { brush: { size: BrushSize.Small, type: "circle" } }
};

const wrapper = shallow<BrushOptions>(<BrushOptions paint={paint} />);
const instance = wrapper.instance();

describe("Paint ToolBrushOptions component", () => {
  describe("render", () => {
    it("should render twelve options", () => {
      expect(findByTestAtrr(wrapper, "option").length).toBe(12);
    });
  });

  describe("getProps", () => {
    describe("focused", () => {
      it("should be true when size and type is the same", () => {
        expect(instance.getProps("circle", BrushSize.Small).focused).toBe(true);
      });

      it("should be false when size is different", () => {
        expect(instance.getProps("circle", BrushSize.Big).focused).toBe(false);
      });

      it("should be false when type is different", () => {
        expect(instance.getProps("rect", BrushSize.Small).focused).toBe(false);
      });
    });
  });

  describe("getiInlineStyles", () => {
    const size = BrushSize.Medium;

    it("should return rectInlineStyles", () => {
      const rectStyles = instance.getRectInlineStyles(size);

      expect(instance.getiInlineStyles("rect", size)).toEqual(rectStyles);
    });

    it("should return circleInlineStyles", () => {
      const circleStyles = instance.getCircleInlineStyles(size);

      expect(instance.getiInlineStyles("circle", size)).toEqual(circleStyles);
    });

    it("should return slashInlineStyles", () => {
      const slashStyles = instance.getSlashInlineStyles(size);

      expect(instance.getiInlineStyles("slash", size)).toEqual(slashStyles);
      expect(instance.getiInlineStyles("backSlash", size)).toEqual(slashStyles);
    });

    it("should throw an eror", () => {
      expect(() => {
        instance.getiInlineStyles("x" as any, size);
      }).toThrowError();
    });
  });

  describe("getRectInlineStyles", () => {
    it("should return proper style object", () => {
      const size = BrushSize.Medium;

      expect(instance.getRectInlineStyles(size)).toEqual({
        width: size,
        height: size
      });
    });
  });

  describe("getCircleInlineStyles", () => {
    it("should return proper style when is small", () => {
      const size = BrushSize.Small;

      expect(instance.getCircleInlineStyles(size)).toEqual({
        height: 1,
        width: 1
      });
    });

    it("should return proper style when is medium", () => {
      const size = BrushSize.Medium;

      expect(instance.getCircleInlineStyles(size)).toEqual({
        height: 4,
        width: 2
      });
    });

    it("should return proper style when is big", () => {
      const size = BrushSize.Big;

      expect(instance.getCircleInlineStyles(size)).toEqual({
        height: 7,
        width: 3
      });
    });
  });

  describe("getSlashInlineStyles", () => {
    it("should return proper style object", () => {
      const size = BrushSize.Big;

      expect(instance.getSlashInlineStyles(size)).toEqual({
        width: BrushSize.Big + 1,
        height: 2
      });
    });
  });

  describe("handleClick", () => {
    it("should call setOptions", () => {
      const type = "backSlash";
      const size = BrushSize.Big;
      instance.handleClick(type, size);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { brush: { type, size } }
      ]);
    });
  });
});
