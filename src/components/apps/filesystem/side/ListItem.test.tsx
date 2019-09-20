import React from "react";
import { shallow } from "enzyme";

import ListItem from "./ListItem";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockOnClickFn = jest.fn();
const icon = "this is icon src";
const comp = (
  <ListItem onClick={mockOnClickFn} icon={icon}>
    <p data-test="child" />
  </ListItem>
);
const wrapper = shallow(comp);

describe("Filesystem Side ListItem component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render icon", () => {
      const iconElement = findByTestAtrr(wrapper, "icon");

      expect(iconElement.length).toBe(1);
      expect(iconElement.prop("src")).toBe(icon);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });

  describe("onClick", () => {
    it("should call mock", () => {
      findByTestAtrr(wrapper, "clickable").simulate("click");
      expect(mockOnClickFn.mock.calls.length).toBe(1);
    });
  });
});
