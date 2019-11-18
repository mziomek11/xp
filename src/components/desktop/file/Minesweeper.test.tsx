import React from "react";
import { shallow } from "enzyme";

import Minesweeper from "./Minesweeper";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Minesweeper />);

describe("File Minesweeper Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });
  });
});
