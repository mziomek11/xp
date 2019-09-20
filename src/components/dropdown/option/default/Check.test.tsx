import React from "react";
import { shallow } from "enzyme";

import Check from "./Check";
import { findByTestAtrr } from "../../../../../testingUtils";

const checkType = "circle";
const wrapper = shallow(<Check renderCheck={true} type={checkType} />);

describe("DropdownCheck Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render check", () => {
      const check = findByTestAtrr(wrapper, "check");
      const expectedClass = "dropdown__" + checkType;

      expect(check.length).toBe(1);
      expect(check.prop("className")).toBe(expectedClass);
    });

    it("should NOT render check", () => {
      const wrapper = shallow(<Check renderCheck={false} type={checkType} />);

      expect(findByTestAtrr(wrapper, "check").length).toBe(0);
    });
  });
});
