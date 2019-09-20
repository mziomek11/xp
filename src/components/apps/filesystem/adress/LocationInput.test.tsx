import React from "react";
import { shallow } from "enzyme";

import LocationInput from "./LocationInput";
import { findByTestAtrr } from "../../../../../testingUtils";

const text = "Example text";
let mockOnChangeFn = jest.fn();
let mockOnPressEnterFn = jest.fn();

const createWrapper = () => {
  mockOnChangeFn = jest.fn();
  mockOnPressEnterFn = jest.fn();

  const props = {
    onChange: mockOnChangeFn,
    onEnterPress: mockOnPressEnterFn,
    text
  };

  return shallow(<LocationInput {...props} />);
};

let wrapper = createWrapper();
let input = findByTestAtrr(wrapper, "input");

describe("Filesystem Adress LocationInput Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(input.length).toBe(1);
      expect(input.prop("value")).toBe(text);
    });
  });

  describe("onChange", () => {
    it("should call mock once", () => {
      input.simulate("change");
      expect(mockOnChangeFn.mock.calls.length).toBe(1);
    });
  });

  describe("onKeyDown", () => {
    beforeEach(() => {
      wrapper = createWrapper();
      input = findByTestAtrr(wrapper, "input");
    });

    it("should NOT call mock", () => {
      const ev = { key: "NOT ENTER" };
      input.simulate("keydown", ev);

      expect(mockOnPressEnterFn.mock.calls.length).toBe(0);
    });

    it("should call mock", () => {
      const ev = { key: "Enter" };
      input.simulate("keydown", ev);

      expect(mockOnPressEnterFn.mock.calls.length).toBe(1);
    });
  });
});
