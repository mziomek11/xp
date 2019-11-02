import React from "react";
import { shallow } from "enzyme";

import PopUp from "./PopUp";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<PopUp {...({} as any)} />);

describe("PopUp Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render Content component", () => {
      expect(findByTestAtrr(wrapper, "content").length).toBe(1);
    });
  });
});
