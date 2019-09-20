import React from "react";
import { shallow } from "enzyme";

import { Bar } from "./Bar";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = (showActionBar: boolean = false) => {
  const context = { options: { showActionBar } } as any;
  return shallow(<Bar context={context} />);
};

const wrapper = createWrapper(true);

describe("Filesystem Action Bar Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });

    it("should render Navigation", () => {
      expect(findByTestAtrr(wrapper, "navigation").length).toBe(1);
    });

    it("should render Folders", () => {
      expect(findByTestAtrr(wrapper, "folders").length).toBe(1);
    });

    it("should render Views", () => {
      expect(findByTestAtrr(wrapper, "views").length).toBe(1);
    });

    it("should NOT render", () => {
      const wrapper = createWrapper(false);

      expect(findByTestAtrr(wrapper, "bar").length).toBe(0);
    });
  });
});
