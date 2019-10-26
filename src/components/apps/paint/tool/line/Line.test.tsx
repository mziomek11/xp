import React from "react";
import { shallow } from "enzyme";

import { Line } from "./Line";
import { findByTestAtrr } from "../../../../../../testingUtils";

describe("Paint Line Tool component", () => {
  describe("render", () => {
    it("should render StraightLine component", () => {
      const wrapper = shallow(<Line paint={{} as any} type="straight" />);

      expect(findByTestAtrr(wrapper, "straight").length).toBe(1);
    });

    it("should render CurveLine component", () => {
      const wrapper = shallow(<Line paint={{} as any} type="curve" />);

      expect(findByTestAtrr(wrapper, "curve").length).toBe(1);
    });
  });
});
