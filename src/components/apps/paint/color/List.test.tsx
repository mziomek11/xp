import React from "react";
import { shallow } from "enzyme";

import List from "./List";
import colors from "../colors";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<List />);

describe("Paint ColorList component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "list").length).toBe(1);
    });

    it("should render ColorRect componenet for all colors", () => {
      expect(findByTestAtrr(wrapper, "rect").length).toBe(colors.length);
    });
  });
});
