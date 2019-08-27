import React from "react";
import { shallow } from "enzyme";

import { withWindowContext } from "./";
import { findByTestAtrr } from "../../testingUtils";

const Component = () => <h1>Welcome</h1>;
const EnchancedComponent = withWindowContext(Component);

const wrapper = shallow(<EnchancedComponent />);
const instance = wrapper.instance();

describe("Higher Order Component withWindowContext", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "consumer").length).toBe(1);
    });
  });
});
