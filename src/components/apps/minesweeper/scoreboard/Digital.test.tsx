import React from "react";
import { shallow } from "enzyme";

import Digital from "./Digital";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Digital number={123} />);

describe("Minesweeper Scoreboard Digital Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "digital").length).toBe(1);
    });

    it("should render three digits", () => {
      expect(findByTestAtrr(wrapper, "digit").length).toBe(3);
    });
  });
});
