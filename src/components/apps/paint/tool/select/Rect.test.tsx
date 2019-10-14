import React from "react";
import { shallow } from "enzyme";

import RectSelect from "./Rect";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<RectSelect />);

describe("Paint RectSelect Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
