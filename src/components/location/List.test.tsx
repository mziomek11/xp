import React from "react";
import { shallow } from "enzyme";

import LocationList from "./List";
import { findByTestAtrr } from "../../../testingUtils";

const wrapper = shallow(<LocationList path={[]} setPath={jest.fn()} />);

describe("LocationList Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "list").length).toBe(1);
    });

    it("should render tree", () => {
      expect(findByTestAtrr(wrapper, "tree").length).toBe(1);
    });
  });
});
