import React from "react";
import { shallow } from "enzyme";

import { Application } from "./Application";
import { findByTestAtrr } from "../../../../testingUtils";

const mockToggleMinimalizeFn = jest.fn();
const props = {
  id: "WindowId",
  toggleMinimalize: mockToggleMinimalizeFn,
  width: 200,
  name: "WindowName"
};
const wrapper = shallow(<Application {...props} />);

describe("ToolbarApplication Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "application").length).toBe(1);
    });

    it("should render application text", () => {
      expect(findByTestAtrr(wrapper, "text").length).toBe(1);
      expect(findByTestAtrr(wrapper, "text").text()).toBe(props.name);
    });
  });

  describe("props", () => {
    it("should apply width", () => {
      const wrapperStyle = findByTestAtrr(wrapper, "application").prop("style");
      const expectedStyle = {
        width: props.width
      };
      expect(wrapperStyle).toEqual(expectedStyle);
    });
  });

  describe("handleClick", () => {
    it("should call toggleMinimalize", () => {
      findByTestAtrr(wrapper, "application").simulate("click");

      expect(mockToggleMinimalizeFn.mock.calls.length).toBe(1);
    });
  });
});
