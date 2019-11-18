import React from "react";
import { shallow } from "enzyme";

import Digit from "./Digit";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Digit digit="6" />);

describe("Minesweeper Scoreboard Digit Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "digit").length).toBe(1);
    });
  });
});
