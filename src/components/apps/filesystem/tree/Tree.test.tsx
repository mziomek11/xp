import React from "react";
import { shallow } from "enzyme";

import Tree from "./Tree";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = (showOverflowX: boolean) => {
  const props = {
    selectedPath: [],
    onClick: jest.fn(),
    withToggler: true,
    showOverflowX
  };
  return shallow(<Tree {...props} />);
};

describe("Filesystem Tree Component", () => {
  describe("render", () => {
    it("should have overflow auto", () => {
      const wrapper = createWrapper(true);
      const container = findByTestAtrr(wrapper, "container");

      expect(container.prop("style")).toEqual({ overflowX: "auto" });
    });

    it("should have overflow hidden", () => {
      const wrapper = createWrapper(false);
      const container = findByTestAtrr(wrapper, "container");

      expect(container.prop("style")).toEqual({ overflowX: "hidden" });
    });
  });
});
