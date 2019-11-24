import React from "react";
import { shallow } from "enzyme";

import CalculatorView from "./CalculatorView";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<CalculatorView {...({} as any)} />);

describe("CalculatorView Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "calculator").length).toBe(1);
    });
  });
});
