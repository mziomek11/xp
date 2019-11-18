import React from "react";
import { shallow } from "enzyme";

import Game from "./Game";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Game />);

describe("Minesweeper Menu Game Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "game").length).toBe(1);
    });
  });
});
