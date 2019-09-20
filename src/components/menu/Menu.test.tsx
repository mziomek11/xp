import React from "react";
import { shallow } from "enzyme";

import Menu from "./Menu";
import { findByTestAtrr } from "../../../testingUtils";

const wrapper = shallow(
  <Menu>
    <h1 data-test="child">child</h1>
    <h1 data-test="child">child</h1>
  </Menu>
);

describe("Menu Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "provider").length).toBe(1);
    });

    it("should render menu", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(2);
    });
  });
});
