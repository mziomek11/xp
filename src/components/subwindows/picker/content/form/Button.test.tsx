import React from "react";
import { shallow } from "enzyme";

import Button from "./Button";
import { findByTestAtrr } from "../../../../../../testingUtils";

const mockOnClickFn = jest.fn();
const wrapper = shallow(
  <Button onClick={mockOnClickFn} type="button">
    <p data-test="child" />
  </Button>
);

const button = findByTestAtrr(wrapper, "btn");

describe("Picker Button Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(button.length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });

  describe("onClick", () => {
    button.simulate("click");
    expect(mockOnClickFn.mock.calls.length).toBe(1);
  });
});
