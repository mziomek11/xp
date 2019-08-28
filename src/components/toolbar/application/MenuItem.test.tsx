import React from "react";
import { shallow } from "enzyme";

import { MenuItem } from "./MenuItem";
import { findByTestAtrr } from "../../../../testingUtils";

const mockChangePriority = jest.fn();
const props = { changePriority: mockChangePriority, name: "example", id: "1" };
const wrapper = shallow(<MenuItem {...props} />);

const parentDiv = findByTestAtrr(wrapper, "menu-item");

describe("ToolbarApplcationMenuItem Component", () => {
  describe("render", () => {
    it("should render without throwing an eror", () => {
      expect(parentDiv.length).toBe(1);
    });

    it("should render text", () => {
      expect(parentDiv.text()).toBe(props.name);
    });
  });

  describe("onClick", () => {
    it("should call changePriority once", () => {
      parentDiv.simulate("click");

      expect(mockChangePriority.mock.calls.length).toBe(1);
    });
  });
});
