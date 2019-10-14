import React from "react";
import { shallow } from "enzyme";

import Pencil from "./Pencil";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Pencil />);

describe("Paint Pencil Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
