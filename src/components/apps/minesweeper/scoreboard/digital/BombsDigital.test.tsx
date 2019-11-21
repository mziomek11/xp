import React from "react";
import { shallow } from "enzyme";

import { BombsDigital } from "./BombsDigital";
import { findByTestAtrr } from "../../../../../../testingUtils";

const bombsLeft = 15;
const props = { minesweeper: { bombsLeft } as any };
const wrapper = shallow(<BombsDigital {...props} />);

describe("Minesweeper Scoreboard BombsDigital Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      const digital = findByTestAtrr(wrapper, "digital");

      expect(digital.length).toBe(1);
      expect(digital.prop("number")).toBe(bombsLeft);
    });
  });
});
