import React from "react";
import { shallow } from "enzyme";

import Desktop from "./Desktop";
import { toolbarConfig } from "../../config";
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

  describe("styles", () => {
    it("should have height style", () => {
      const result = findByTestAtrr(wrapper, "desktop").prop("style");
      const expectedStyles = {
        height: window.innerHeight - toolbarConfig.HEIGHT
      };

      expect(result).toEqual(expectedStyles);
    });
  });
});
