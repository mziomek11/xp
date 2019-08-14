import React from "react";
import { shallow } from "enzyme";

import Screen from "./Screen";
import { findByTestAtrr } from "../../../testingUtils";

const wrapper = shallow(<Screen />);

describe("Screen Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "screen").length).toBe(1);
    });

    it("should render Desktop Componenet", () => {
      expect(findByTestAtrr(wrapper, "desktop").length).toBe(1);
    });

    it("should render Toolbar Componenet", () => {
      expect(findByTestAtrr(wrapper, "toolbar").length).toBe(1);
    });
  });
});
