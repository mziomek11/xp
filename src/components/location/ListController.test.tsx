import React from "react";
import { shallow } from "enzyme";

import LocationListController from "./ListController";
import { findByTestAtrr } from "../../../testingUtils";

const createWrapper = (isOpen: boolean) => {
  const props = { path: [], setPath: jest.fn(), isOpen };
  return shallow(<LocationListController {...props} />);
};

const wrapper = createWrapper(true);

describe("LocationListController Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render LocationList component", () => {
      const wrapper = createWrapper(true);
      expect(findByTestAtrr(wrapper, "location-list").length).toBe(1);
    });

    it("should NOT render LocationList component", () => {
      const wrapper = createWrapper(false);
      expect(findByTestAtrr(wrapper, "location-list").length).toBe(0);
    });
  });
});
