import React from "react";
import { shallow } from "enzyme";

import Paint from "./Paint";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Paint />);

describe("Paint component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "paint").length).toBe(1);
    });

    it("should render Menu component", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render Toolbar component", () => {
      expect(findByTestAtrr(wrapper, "toolbar").length).toBe(1);
    });

    it("should render Canvas component", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });

    it("should render ColorBar component", () => {
      expect(findByTestAtrr(wrapper, "colorbar").length).toBe(1);
    });
  });
});
