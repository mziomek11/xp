import React from "react";
import { shallow } from "enzyme";

import Options from "./Options";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Options />);

describe("Paint ToolOptions component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "options").length).toBe(1);
    });
  });
});
