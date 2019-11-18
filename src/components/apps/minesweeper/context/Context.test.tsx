import React from "react";
import { shallow } from "enzyme";

import { ContextProvider } from "./Context";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow<ContextProvider>(
  <ContextProvider>
    <p data-test="child" />
  </ContextProvider>
);
const instance = wrapper.instance();

describe("Minesweeper Context Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "context").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });

  describe("onGameOver", () => {
    it("should update state", () => {
      instance.setState({ isGameOver: false });
      instance.onGameOver();

      expect(instance.state.isGameOver).toBe(true);
    });
  });

  describe("checkField", () => {
    it("should update state", () => {
      instance.checkField(0);

      expect(instance.state.fields[0].checked).toBe(true);
    });
  });
});
