import React from "react";

import ResizerList from "./";
import { shallow } from "enzyme";
import { findByTestAtrr } from "../../../../utils/testing";

const id = "window-id";
const comp = <ResizerList id={id} />;
const wrapper = shallow(comp);

describe("WindowResizerList Componenet", () => {
  describe("render", () => {
    it("should render right resizer", () => {
      const leftResizer = findByTestAtrr(wrapper, "E");

      expect(leftResizer.length).toBe(1);
      expect(leftResizer.prop("id")).toBe(id);
      expect(leftResizer.prop("resizesWidth")).toBe(true);
      expect(leftResizer.prop("isLeft")).toBe(false);
      expect(leftResizer.prop("isBottom")).toBe(false);
    });

    it("should render bottom resizer", () => {
      const bottomResizer = findByTestAtrr(wrapper, "S");

      expect(bottomResizer.length).toBe(1);
      expect(bottomResizer.prop("id")).toBe(id);
      expect(bottomResizer.prop("resizesWidth")).toBe(false);
      expect(bottomResizer.prop("isBottom")).toBe(true);
    });

    it("should render left resizer", () => {
      const leftResizer = findByTestAtrr(wrapper, "W");

      expect(leftResizer.length).toBe(1);
      expect(leftResizer.prop("id")).toBe(id);
      expect(leftResizer.prop("resizesWidth")).toBe(true);
      expect(leftResizer.prop("isLeft")).toBe(true);
      expect(leftResizer.prop("isBottom")).toBe(false);
    });

    it("should render bottom left resizer", () => {
      const leftResizer = findByTestAtrr(wrapper, "SW");

      expect(leftResizer.length).toBe(1);
      expect(leftResizer.prop("id")).toBe(id);
      expect(leftResizer.prop("resizesWidth")).toBe(true);
      expect(leftResizer.prop("isLeft")).toBe(true);
      expect(leftResizer.prop("isBottom")).toBe(true);
    });

    it("should render bottom right resizer", () => {
      const leftResizer = findByTestAtrr(wrapper, "SE");

      expect(leftResizer.length).toBe(1);
      expect(leftResizer.prop("id")).toBe(id);
      expect(leftResizer.prop("resizesWidth")).toBe(true);
      expect(leftResizer.prop("isLeft")).toBe(false);
      expect(leftResizer.prop("isBottom")).toBe(true);
    });
  });
});
