import React from "react";
import { shallow } from "enzyme";

import Text from "./Text";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Text />);

describe("Paint Text Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });
});
