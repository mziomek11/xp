import React from "react";
import { shallow } from "enzyme";

import ResizerRect from "./ResizerRect";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<ResizerRect width={10} height={10} />);

describe("Paint CanvasResizerRect component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "rect").length).toBe(1);
    });
  });
});
