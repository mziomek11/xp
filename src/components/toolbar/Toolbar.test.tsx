import React from "react";
import { shallow } from "enzyme";

import Toolbar from "./Toolbar";
import { toolbarConfig } from "../../config";
import { findByTestAtrr } from "../../../testingUtils";

const wrapper = shallow(<Toolbar />);

describe("Toolbar Component", () => {
  describe("render", () => {
    it("should render without throwing an errorm", () => {
      expect(findByTestAtrr(wrapper, "toolbar").length).toBe(1);
    });

    it("should render start", () => {
      expect(findByTestAtrr(wrapper, "start").length).toBe(1);
    });

    it("should render applications", () => {
      expect(findByTestAtrr(wrapper, "applications").length).toBe(1);
    });

    it("should render time", () => {
      expect(findByTestAtrr(wrapper, "time").length).toBe(1);
    });
  });

  describe("styles", () => {
    it("should have toolbar height from config", () => {
      const result = findByTestAtrr(wrapper, "toolbar").prop("style");
      const expectedStyle = {
        height: toolbarConfig.HEIGHT
      };

      expect(result).toEqual(expectedStyle);
    });
  });
});
