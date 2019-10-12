import React from "react";
import { shallow } from "enzyme";

import { Bar } from "./Bar";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = (showAdressBar: boolean) => {
  const context = { options: { showAdressBar } } as any;
  return shallow(<Bar filesystem={context} />);
};

const wrapper = createWrapper(true);

describe("Filesystem Adress Bar Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render text", () => {
      expect(findByTestAtrr(wrapper, "text").length).toBe(1);
    });

    it("should render Location component", () => {
      expect(findByTestAtrr(wrapper, "location").length).toBe(1);
    });

    it("should NOT render", () => {
      const wrapper = createWrapper(false);
      expect(findByTestAtrr(wrapper, "container").length).toBe(0);
    });
  });
});
