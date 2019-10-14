import React from "react";
import { shallow } from "enzyme";

import Polygon from "./Polygon";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Polygon />);

describe("Paint Polygon Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
