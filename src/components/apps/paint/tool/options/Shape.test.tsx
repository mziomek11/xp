import React from "react";
import { shallow } from "enzyme";

import { ShapeOptions } from "./Shape";
import { findByTestAtrr } from "../../../../../../testingUtils";

const mockSetOptionsFn = jest.fn();
const shapeDrawMode = {
  circle: "fill",
  rect: "both",
  rounded: "both",
  poly: "both"
};
const paint: any = {
  setOptions: mockSetOptionsFn,
  selectedTool: "circle",
  options: { shapeDrawMode }
};

const wrapper = shallow<ShapeOptions>(<ShapeOptions paint={paint} />);
const instance = wrapper.instance();

describe("Paint ToolShapeOptions component", () => {
  describe("render", () => {
    it("should render three options", () => {
      expect(findByTestAtrr(wrapper, "option").length).toBe(3);
    });
  });

  describe("getProps", () => {
    describe("focused", () => {
      it("should be true", () => {
        expect(instance.getProps("fill").focused).toBe(true);
      });

      it("should be false", () => {
        expect(instance.getProps("both").focused).toBe(false);
        expect(instance.getProps("stroke").focused).toBe(false);
      });
    });
  });

  describe("handleClick", () => {
    it("should call setOptions", () => {
      const drawMode = "stroke";
      instance.handleClick(drawMode);

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { shapeDrawMode: { ...shapeDrawMode, circle: "stroke" } }
      ]);
    });
  });
});
