import React from "react";
import { shallow } from "enzyme";

import Menu from "./Menu";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Menu />);

describe("Minesweeper Menu Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render Game component", () => {
      expect(findByTestAtrr(wrapper, "game").length).toBe(1);
    });
  });
});
