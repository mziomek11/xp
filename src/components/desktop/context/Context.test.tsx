import React from "react";
import { shallow } from "enzyme";

import { ContextProvider } from "./Context";
import { findByTestAtrr } from "../../../../testingUtils";

const createWrapper = () => {
  return shallow<ContextProvider>(
    <ContextProvider>
      <p data-test="child" />
    </ContextProvider>
  );
};

const wrapper = createWrapper();

describe("Desktop Context Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "context").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });
});
