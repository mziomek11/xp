import React from "react";
import { shallow } from "enzyme";

import { Icon } from "./Icon";
import { findByTestAtrr } from "../../../../testingUtils";

const icon = "img src";
const wrapper = shallow(<Icon window={{ icon } as any} />);

describe("Window Bar Icon Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render icon", () => {
      const iconElement = findByTestAtrr(wrapper, "icon");

      expect(iconElement.length).toBe(1);
      expect(iconElement.prop("src")).toBe(icon);
    });
  });
});
