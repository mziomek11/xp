import React from "react";
import { shallow } from "enzyme";

import { Desktop } from "./Desktop";
import { toolbarConfig } from "../../config";
import { findByTestAtrr } from "../../../testingUtils";

const screenHeight: number = 1000;
const wrapper = shallow(<Desktop screenHeight={screenHeight} />);

describe("Desktop Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "desktop").length).toBe(1);
    });
  });

  describe("styles", () => {
    it("should have height style", () => {
      const result = findByTestAtrr(wrapper, "desktop").prop("style");
      const expectedStyles = {
        height: screenHeight - toolbarConfig.HEIGHT
      };

      expect(result).toEqual(expectedStyles);
    });
  });
});
