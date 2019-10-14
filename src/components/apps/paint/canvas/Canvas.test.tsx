import React from "react";
import { shallow } from "enzyme";

import Canvas from "./Canvas";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Canvas />);

describe("Paint Canvas component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });
  });
});
