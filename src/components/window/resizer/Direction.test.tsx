import React from "react";
import { shallow } from "enzyme";

import { createResizer } from "./Direction";
import { findByTestAtrr } from "../../../../testingUtils";

describe("WindowResizerDirection Component", () => {
  describe("createResizer", () => {
    it("should NOT pass resizing data", () => {
      const Resizer = createResizer({});
      const wrapper = shallow(<Resizer />);
      const root = findByTestAtrr(wrapper, "resizer");

      expect(root.length).toBe(1);
      expect(root.prop("resizesWidth")).toBe(undefined);
      expect(root.prop("resizesHeight")).toBe(undefined);
      expect(root.prop("isLeft")).toBe(undefined);
      expect(root.prop("isTop")).toBe(undefined);
    });

    it("should pass resizing data", () => {
      const Resizer = createResizer({
        resizesHeight: true,
        resizesWidth: true,
        isLeft: true,
        isTop: true
      });
      const wrapper = shallow(<Resizer />);
      const root = findByTestAtrr(wrapper, "resizer");

      expect(root.length).toBe(1);
      expect(root.prop("resizesWidth")).toBe(true);
      expect(root.prop("resizesHeight")).toBe(true);
      expect(root.prop("isLeft")).toBe(true);
      expect(root.prop("isTop")).toBe(true);
    });
  });
});
