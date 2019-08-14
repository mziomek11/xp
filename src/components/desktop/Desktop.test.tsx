import React from "react";
import { shallow } from "enzyme";
import Desktop from "./Desktop";
import { findByTestAtrr } from "../../../testingUtils";

const wrapper = shallow(<Desktop />);

describe("Desktop Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "desktop").length).toBe(1);
    });

    it("should render FileList Component", () => {
      expect(findByTestAtrr(wrapper, "file-list").length).toBe(1);
    });

    it("should render  WindowList Component", () => {
      expect(findByTestAtrr(wrapper, "window-list").length).toBe(1);
    });
  });
});
