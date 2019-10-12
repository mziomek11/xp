import React from "react";
import { shallow } from "enzyme";

import Navigation from "./Navigation";
import { findByTestAtrr } from "../../../../../../testingUtils";

const wrapper = shallow(<Navigation />);

describe("Picker Navigation Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "navigation").length).toBe(1);
    });

    it("should render Location component", () => {
      expect(findByTestAtrr(wrapper, "location").length).toBe(1);
    });

    it("should render Arrow component", () => {
      expect(findByTestAtrr(wrapper, "arrow").length).toBe(1);
    });

    it("should render FolderUp component", () => {
      expect(findByTestAtrr(wrapper, "folder-up").length).toBe(1);
    });
  });
});
