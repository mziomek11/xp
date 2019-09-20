import React from "react";
import { shallow } from "enzyme";

import Navigation from "./Navigation";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Navigation />);

describe("Filesystem Action Navigation Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "actions").length).toBe(1);
    });

    it("should render Arrow left Component", () => {
      const arrow = findByTestAtrr(wrapper, "arrow-left");

      expect(arrow.length).toBe(1);
      expect(arrow.prop("isLeft")).toBe(true);
    });

    it("should render Arrow right Component", () => {
      const arrow = findByTestAtrr(wrapper, "arrow-right");

      expect(arrow.length).toBe(1);
      expect(arrow.prop("isLeft")).toBe(false);
    });

    it("should render FolderUp Component", () => {
      expect(findByTestAtrr(wrapper, "folder-up").length).toBe(1);
    });
  });
});
