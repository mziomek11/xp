import React from "react";
import { shallow } from "enzyme";

import SubWindow from "./SubWindow";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(
  <SubWindow {...({} as any)}>
    <p data-test="child" />
    <p data-test="child" />
  </SubWindow>
);

describe("SubWindow Component", () => {
  describe("render", () => {
    it("should render context", () => {
      expect(findByTestAtrr(wrapper, "ctx").length).toBe(1);
    });

    it("should render window", () => {
      expect(findByTestAtrr(wrapper, "window").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(2);
    });
  });
});
