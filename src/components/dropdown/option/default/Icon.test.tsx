import React from "react";
import { shallow } from "enzyme";

import Icon from "./Icon";
import { findByTestAtrr } from "../../../../../testingUtils";

const iconPath = "iconPath";
const wrapper = shallow(<Icon icon={iconPath} />);

describe("DropdownIcon Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render icon", () => {
      const icon = findByTestAtrr(wrapper, "icon");

      expect(icon.length).toBe(1);
      expect(icon.prop("src")).toBe(iconPath);
    });
  });
});
