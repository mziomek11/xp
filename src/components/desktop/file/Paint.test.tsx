import React from "react";
import { shallow } from "enzyme";

import Paint from "./Paint";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Paint />);

describe("File Paint Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });
  });
});
