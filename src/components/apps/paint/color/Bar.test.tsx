import React from "react";
import { shallow } from "enzyme";

import Bar from "./Bar";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Bar />);

describe("Paint ColorBar component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });

    it("should render CurrentColors component", () => {
      expect(findByTestAtrr(wrapper, "curr").length).toBe(1);
    });

    it("should render ColorList component", () => {
      expect(findByTestAtrr(wrapper, "list").length).toBe(1);
    });
  });
});
