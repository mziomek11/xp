import React from "react";
import { shallow } from "enzyme";

import { ComputerNode } from "./ComputerNode";
import { findByTestAtrr } from "../../../../../testingUtils";

const props = {
  selectedPath: [],
  withToggler: true,
  onClick: jest.fn(),
  fileTree: {}
};
const wrapper = shallow(<ComputerNode {...props} />);

describe("Filesystem ComputerNode Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "node").length).toBe(1);
    });
  });
});
