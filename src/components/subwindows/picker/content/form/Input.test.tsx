import React from "react";
import { shallow } from "enzyme";

import Input from "./Input";
import { findByTestAtrr } from "../../../../../../testingUtils";

const mockSetTextFn = jest.fn();

const props = {
  setText: mockSetTextFn,
  text: "this is text"
};

const wrapper = shallow(<Input {...props} />);

const input = findByTestAtrr(wrapper, "input");

describe("Picker Input Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(input.length).toBe(1);
      expect(input.prop("value")).toBe(props.text);
    });
  });

  describe("handleChange", () => {
    it("should call mockSetTextFn", () => {
      const e = { target: { value: "newText" } };
      input.simulate("change", e);

      expect(mockSetTextFn.mock.calls.length).toBe(1);
      expect(mockSetTextFn.mock.calls[0]).toEqual(["newText"]);
    });
  });
});
