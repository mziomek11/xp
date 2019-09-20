import React from "react";
import { shallow } from "enzyme";

import Divider from "./Divider";
import { findByTestAtrr } from "../../../testingUtils";

const wrapper = shallow(<Divider />);

describe("DropdownDivider Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "divider").length).toBe(1);
    });
  });
});
