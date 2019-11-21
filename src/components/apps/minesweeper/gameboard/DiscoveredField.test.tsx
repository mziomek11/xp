import React from "react";
import { shallow } from "enzyme";

import { DiscoveredField } from "./DiscoveredField";
import { findByTestAtrr } from "../../../../../testingUtils";

const props = {
  minesweeper: { fields: [{}] } as any,
  index: 0,
  baseClassName: "classname",
  style: {}
};
const wrapper = shallow(<DiscoveredField {...props} />);

describe("Minesweeper Gameboard DiscoveredField Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "field").length).toBe(1);
    });
  });
});
