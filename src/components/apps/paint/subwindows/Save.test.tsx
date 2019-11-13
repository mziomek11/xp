import React from "react";
import { shallow } from "enzyme";

import { PaintSave } from "./Save";
import { findByTestAtrr } from "../../../../../testingUtils";

const getImageResult = "this is image";
const mockSetWindowContextFn = jest.fn();
const mockSetPaintContextFn = jest.fn();

const props = {
  window: {
    setContext: mockSetWindowContextFn
  } as any,
  paint: {
    setContext: mockSetPaintContextFn,
    getImageData: () => getImageResult
  } as any
};

const wrapper = shallow<PaintSave>(<PaintSave {...props} />);
const picker = findByTestAtrr(wrapper, "picker");

describe("Paint Save Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(picker.length).toBe(1);
    });

    it("content should be image", () => {
      expect(picker.prop("content")).toBe(getImageResult);
    });
  });

  describe("closeOpening", () => {
    it("should call setContext with proper args", () => {
      wrapper.instance().closeSaveAs();

      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls[0]).toEqual([
        { disabled: false }
      ]);

      expect(mockSetPaintContextFn.mock.calls.length).toBe(1);
      expect(mockSetPaintContextFn.mock.calls[0]).toEqual([
        { isSaving: false }
      ]);
    });
  });

  describe("setPath", () => {
    it("should be called with proper args", () => {
      const path = ["a", "b", "c"];
      wrapper.instance().setPath(path);

      expect(mockSetPaintContextFn.mock.calls.length).toBe(2);
      expect(mockSetPaintContextFn.mock.calls[1]).toEqual([{ path }]);
    });
  });
});
