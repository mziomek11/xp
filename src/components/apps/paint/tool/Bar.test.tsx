import React from "react";
import { shallow } from "enzyme";

import Bar from "./Bar";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Bar />);

describe("Paint ToolBar component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });

    it("should render 16 tools", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(16);
    });

    it("should render Options Component", () => {
      expect(findByTestAtrr(wrapper, "options").length).toBe(1);
    });
  });
});
