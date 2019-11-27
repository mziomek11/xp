import React from "react";
import { shallow } from "enzyme";

import StartContent from "./StartContent";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<StartContent />);

describe("StartContent Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "content").length).toBe(1);
    });
  });
});
