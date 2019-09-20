import React from "react";
import { shallow } from "enzyme";

import GoButton from "./GoButton";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockOnClickFn = jest.fn();
const wrapper = shallow(<GoButton onClick={mockOnClickFn} />);

describe("Filesystem Adress GoButton Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render icon", () => {
      expect(findByTestAtrr(wrapper, "icon").length).toBe(1);
    });

    it("should render text", () => {
      expect(findByTestAtrr(wrapper, "text").length).toBe(1);
    });
  });

  describe("onClick", () => {
    it("should be called once on container click", () => {
      findByTestAtrr(wrapper, "container").simulate("click");
      expect(mockOnClickFn.mock.calls.length).toBe(1);
    });
  });
});
