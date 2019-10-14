import React from "react";
import { shallow } from "enzyme";

import AnySelect from "./Any";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<AnySelect />);

describe("Paint AnySelect Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
