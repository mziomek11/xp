import React from "react";
import { shallow } from "enzyme";

import Error from "./Error";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Error {...({} as any)} />);

describe("Popup Error Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "error").length).toBe(1);
    });
  });
});
